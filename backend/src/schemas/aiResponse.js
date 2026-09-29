const { z } = require('zod');

const flagSchema = z.object({
  span: z.string().min(1),
  category: z.enum([
    'pii', 'credential', 'financial', 'urgency',
    'impersonation', 'suspicious-link', 'other'
  ]),
  reason: z.string().min(1).max(500)
});

const aiResponseSchema = z.object({
  score: z.number().int().min(0).max(100),
  flags: z.array(flagSchema)
});

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const AnalyzeSchema = z.object({
  text: z.string().min(1).max(20000)
});

const ActionSchema = z.object({
  action_taken: z.enum(['sent_anyway', 'used_redacted', 'discarded'])
});

module.exports = {
  aiResponseSchema,
  flagSchema,
  SignupSchema,
  LoginSchema,
  AnalyzeSchema,
  ActionSchema
};
