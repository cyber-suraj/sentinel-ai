# Architecture

## Folder Structure

```
sentinel/
├── frontend/          # React + Vite + React Router + Tailwind CSS + Axios + Recharts
├── backend/           # Node.js + Express + JWT + bcrypt + Zod + Google Gemini API
├── supabase/          # Supabase PostgreSQL schema and migrations
└── project-docs/      # Project documentation and context
```

## Data Flow

1. **Paste:** User pastes content into the Frontend UI.
2. **Request:** Frontend sends the content via Axios to the Backend API.
3. **Analysis:** Backend processes the text using the Gemini 2.5 Flash API to detect PII and social-engineering signals. Zod validates the AI response.
4. **Redaction:** Backend generates a redacted, safe-to-send version based on the AI findings.
5. **Save:** Backend stores the analysis results (risk score, flags, redacted text) in the Supabase PostgreSQL database.
6. **Response:** Backend returns the risk score, plain-language flags, and redacted text to the Frontend.
7. **History:** Users can view their past analyses in an audit trail dashboard on the Frontend.
