import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Analyze from './pages/Analyze';
import ScanDetail from './pages/ScanDetail';
import Settings from './pages/Settings';

function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen transition-all">
        <TopBar />
        <main className="flex-1 p-8 w-full animate-fadeIn">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard" replace /> : <Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
      <Route path="/analyze" element={<ProtectedRoute><AppLayout><Analyze /></AppLayout></ProtectedRoute>} />
      <Route path="/scan/:id" element={<ProtectedRoute><AppLayout><ScanDetail /></AppLayout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><AppLayout><Settings /></AppLayout></ProtectedRoute>} />
    </Routes>
  );
}
