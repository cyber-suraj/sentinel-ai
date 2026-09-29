const express = require('express');
const requireAuth = require('../middleware/auth');
const { analyzeText } = require('../services/gemini');
const { aiResponseSchema, AnalyzeSchema } = require('../schemas/aiResponse');
const { redactText } = require('../services/redact');
const supabase = require('../services/supabase');

const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  try {
    const parsed = AnalyzeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.errors });
    }
    const { text } = parsed.data;

    // Call Gemini API
    const rawAiResponse = await analyzeText(text);

    // Validate with Zod
    const validationResult = aiResponseSchema.safeParse(rawAiResponse);
    if (!validationResult.success) {
      console.error('Zod validation failed:', validationResult.error);
      return res.status(500).json({ error: 'AI response validation failed' });
    }

    const aiData = validationResult.data;

    // CRITICAL SECURITY CHECK: Verify exact substrings
    // Discard any flag that fails this check to prevent hallucinated flags.
    const verifiedFlags = aiData.flags.filter(flag => {
      return text.includes(flag.span);
    });

    // Generate redacted text
    const redacted_text = redactText(text, verifiedFlags);

    // Save scan to database
    const { data: scan, error } = await supabase
      .from('scans')
      .insert([{
        user_id: req.user.id,
        input_text: text,
        risk_score: aiData.score,
        flags: verifiedFlags,
        redacted_text: redacted_text
      }])
      .select()
      .single();

    if (error) {
      console.error('Error saving scan:', error);
      return res.status(500).json({ error: 'Failed to save scan' });
    }

    res.json({
      risk_score: scan.risk_score,
      flags: scan.flags,
      redacted_text: scan.redacted_text,
      scan_id: scan.id
    });
  } catch (error) {
    console.error('Analyze error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
