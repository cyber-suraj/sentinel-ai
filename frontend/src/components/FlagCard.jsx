export default function FlagCard({ flag }) {
  const { span, category, reason } = flag;
  const isCritical = ['pii', 'credential', 'financial'].includes(category);
  const isMedium = ['urgency', 'impersonation', 'suspicious-link'].includes(category);
  
  const borderColor = isCritical ? 'border-red-500' : isMedium ? 'border-amber-500' : 'border-slate-400';
  const icon = isCritical ? '🔴' : isMedium ? '🟠' : '⚪';

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-xl p-5 border-l-4 ${borderColor} shadow-sm mb-3`}>
      <div className="flex items-center gap-2 mb-2">
        <span>{icon}</span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 uppercase">{category}</span>
      </div>
      <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-mono text-sm text-slate-800 dark:text-slate-300 block mb-2">{span}</code>
      <p className="text-sm text-slate-600 dark:text-slate-400">{reason}</p>
    </div>
  );
}
