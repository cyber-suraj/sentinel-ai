import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../api/client';
import RiskScoreGauge from '../components/RiskScoreGauge';
import FlagCard from '../components/FlagCard';

export default function ScanDetail() {
  const { id } = useParams();
  const [scan, setScan] = useState(null);

  useEffect(() => {
    client.getScan(id).then(setScan);
  }, [id]);

  if (!scan) return <div className="p-8 text-center skeleton w-full h-64"></div>;

  return (
    <div className="animate-fadeIn space-y-8">
      <Link to="/dashboard" className="text-indigo-600 hover:underline">← Back to Dashboard</Link>
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-card flex items-center gap-8">
        <RiskScoreGauge score={scan.risk_score} />
        <div>
          <h2 className="text-3xl font-bold mb-2">Scan Details</h2>
          <p className="text-sm text-slate-500 mb-2">{new Date(scan.created_at).toLocaleString()}</p>
          <div className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-full">{scan.action_taken || 'No action'}</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-card">
          <h3 className="text-xl font-bold mb-4">Detected Risks</h3>
          {scan.flags?.map((f, i) => <FlagCard key={i} flag={f} />)}
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-card">
          <h3 className="text-xl font-bold mb-4">Redacted Output</h3>
          <pre className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">{scan.redacted_text}</pre>
        </div>
      </div>
    </div>
  );
}
