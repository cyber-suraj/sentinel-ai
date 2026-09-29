const express = require('express');
const requireAuth = require('../middleware/auth');
const supabase = require('../services/supabase');
const { ActionSchema } = require('../schemas/aiResponse');

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const { data: scans, error } = await supabase
      .from('scans')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json(scans);
  } catch (error) {
    console.error('Get scans error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data: scan, error } = await supabase
      .from('scans')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // not found
        return res.status(404).json({ error: 'Scan not found' });
      }
      throw error;
    }

    res.json(scan);
  } catch (error) {
    console.error('Get scan error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id/action', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const parsed = ActionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid action', details: parsed.error.errors });
    }
    const { action_taken } = parsed.data;

    const { data: scan, error } = await supabase
      .from('scans')
      .update({ action_taken })
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    res.json(scan);
  } catch (error) {
    console.error('Update scan action error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
