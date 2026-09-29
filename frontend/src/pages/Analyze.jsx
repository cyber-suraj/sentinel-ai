import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import toast from 'react-hot-toast';
import RiskScoreGauge from '../components/RiskScoreGauge';
import FlagCard from '../components/FlagCard';

export default function Analyze() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const data = await client.analyze(text);
      setResult(data);
    } catch (err) {
      toast.error('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action) => {
    try {
      await client.updateScanAction(result.scan_id, action);
      toast.success('Action recorded');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed');
    }
  };

  return (
    <div className="animate-fadeIn pb-32">
      {!result ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-card">
          <h2 className="text-2xl font-bold mb-6">Paste content to analyze</h2>
          <div className="flex gap-2 mb-4">
            <button onClick={() => setText("Hi, my email is john@example.com, phone 9876543210, password is MyPass123. Please send the money fast.")} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-semibold">🔴 Try PII</button>
            <button onClick={() => setText("URGENT: Your account is suspended. Click here to verify: http://bit.ly/scam")} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-semibold">🟠 Try Phishing</button>
            <button onClick={() => setText("Hi team, the meeting is at 3 PM tomorrow. See you there.")} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-semibold">🟢 Try Safe</button>
          </div>
          <textarea
            value={text} onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[400px] p-5 rounded-xl font-mono text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Paste text here..."
          />
          <div className="text-right text-xs text-slate-400 mt-2">{text.length} chars</div>
          <button onClick={handleAnalyze} disabled={loading || !text.trim()} className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold py-4 rounded-xl">
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-card flex items-center gap-8">
            <RiskScoreGauge score={result.risk_score} />
            <div>
              <h2 className="text-3xl font-bold mb-2">Analysis Complete</h2>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${result.risk_score <= 30 ? 'bg-risk-critical/10 text-risk-critical border-risk-critical/20' : result.risk_score <= 60 ? 'bg-risk-medium/10 text-risk-medium border-risk-medium/20' : 'bg-risk-safe/10 text-risk-safe border-risk-safe/20'}`}>
                {result.risk_score <= 30 ? 'CRITICAL RISK' : result.risk_score <= 60 ? 'MEDIUM RISK' : 'SAFE'}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-card">
              <h3 className="text-xl font-bold mb-4">Detected Risks</h3>
              {result.flags.map((f, i) => <FlagCard key={i} flag={f} />)}
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-card">
              <h3 className="text-xl font-bold mb-4">Redacted Version</h3>
              <pre className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">{result.redacted_text}</pre>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur border-t border-slate-200 dark:border-slate-700 p-4 z-50 flex justify-center gap-4">
            <button onClick={() => handleAction('discarded')} className="border-2 border-red-500 text-red-500 px-6 py-3 rounded-xl font-bold">🗑️ Discard</button>
            <button onClick={() => handleAction('sent_anyway')} className="border-2 border-amber-500 text-amber-500 px-6 py-3 rounded-xl font-bold">⚠️ Send Anyway</button>
            <button onClick={() => handleAction('used_redacted')} className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold">✅ Use Redacted</button>
          </div>
        </div>
      )}
    </div>
  );
}
