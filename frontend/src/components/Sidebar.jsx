import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail') || 'user@example.com'; 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'New Scan', path: '/analyze', icon: '🔍' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 flex-col">
      <div className="p-6">
        <Link to="/" className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span>🛡️</span>
            <span className="bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-400 dark:to-indigo-400 bg-clip-text text-transparent">Sentinel</span>
          </div>
          <span className="text-xs text-slate-500 font-medium tracking-wide">AI Security Layer</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                isActive 
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-l-2 border-indigo-600'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex flex-col overflow-hidden">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{email}</span>
          <button 
            onClick={handleLogout}
            className="text-xs text-red-600 dark:text-red-400 font-medium hover:underline text-left mt-1"
          >
            Log out
          </button>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
