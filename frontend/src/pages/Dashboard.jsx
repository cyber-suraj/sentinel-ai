import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail') || 'User';

  useEffect(() => {
    client.getScans().then(setScans).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center"><div className="skeleton w-32 h-8 mx-auto"></div></div>;

  const totalScans = scans.length;
  const safeScans = scans.filter(s => s.risk_score > 60).length;
  const flaggedScans = scans.filter(s => s.risk_score > 30 && s.risk_score <= 60).length;
  const criticalScans = scans.filter(s => s.risk_score <= 30).length;

  const chartData = [...scans].reverse().map(s => ({
    name: new Date(s.created_at).toLocaleDateString(),
    score: s.risk_score
  }));

  const getBadge = (score) => {
    if (score <= 30) return <span className="px-2 py-1 bg-risk-critical/10 text-risk-critical rounded-full text-xs font-bold border border-risk-critical/20">Critical</span>;
    if (score <= 60) return <span className="px-2 py-1 bg-risk-medium/10 text-risk-medium rounded-full text-xs font-bold border border-risk-medium/20">Flagged</span>;
    return <span className="px-2 py-1 bg-risk-safe/10 text-risk-safe rounded-full text-xs font-bold border border-risk-safe/20">Safe</span>;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Good morning, {email.split('@')[0]}</h1>
          <p className="text-slate-500 mt-1">Here's your security overview.</p>
        </div>
        <Link to="/analyze" className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors">+ New Scan</Link>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: totalScans, color: 'text-slate-900 dark:text-white' },
          { label: 'Safe', value: safeScans, color: 'text-risk-safe' },
          { label: 'Flagged', value: flaggedScans, color: 'text-risk-medium' },
          { label: 'Critical', value: criticalScans, color: 'text-risk-critical' }
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all">
            <div className={`text-4xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-slate-500 mt-1 uppercase tracking-wide font-semibold">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-card">
        <h3 className="text-lg font-bold mb-4">Risk Score Trend</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" strokeOpacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderRadius: '8px', border: 'none', color: '#fff' }} />
              <Area type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {scans.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-card">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {scans.map((scan) => (
                <tr key={scan.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors" onClick={() => navigate(`/scan/${scan.id}`)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{new Date(scan.created_at).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getBadge(scan.risk_score)}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-mono truncate max-w-xs">{scan.input_text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-card">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-slate-500">No scans yet. Click New Scan to begin.</p>
        </div>
      )}
    </div>
  );
}
