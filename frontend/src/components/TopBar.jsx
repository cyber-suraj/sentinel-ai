import { useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function TopBar() {
  const location = useLocation();
  
  const getPageTitle = () => {
    if (location.pathname.startsWith('/dashboard')) return 'Dashboard';
    if (location.pathname.startsWith('/analyze')) return 'New Scan';
    if (location.pathname.startsWith('/scan/')) return 'Scan Details';
    if (location.pathname.startsWith('/settings')) return 'Settings';
    return 'Sentinel';
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex justify-between items-center transition-colors">
      <div className="flex flex-col">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Pages / {getPageTitle()}</span>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white capitalize">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
          U
        </div>
      </div>
    </nav>
  );
}
