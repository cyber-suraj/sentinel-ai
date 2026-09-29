import { useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ toggleSidebar }) {
  const location = useLocation();
  
  const getPageTitle = () => {
    if (location.pathname.startsWith('/dashboard')) return 'Dashboard';
    if (location.pathname.startsWith('/analyze')) return 'New Scan';
    if (location.pathname.startsWith('/scan/')) return 'Scan Details';
    if (location.pathname.startsWith('/settings')) return 'Settings';
    return 'Sentinel';
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-4 sm:px-8 transition-colors">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>

        {/* Breadcrumb / Title */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Pages / {getPageTitle()}</span>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white capitalize">{getPageTitle()}</h1>
        </div>
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
