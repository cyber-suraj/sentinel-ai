import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 transition-colors">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span>🛡️</span>
          <span className="bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-400 dark:to-indigo-400 bg-clip-text text-transparent">Sentinel</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="text-slate-600 dark:text-slate-300 font-medium hover:text-brand-600 px-4 py-2">Log in</Link>
          <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm">Sign up</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <section className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="flex-1 text-center lg:text-left space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 font-medium text-sm border border-brand-200 dark:border-brand-800">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              🔒 Trusted by security teams
            </div>
            
            <h1 className="text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Know Before <br/>You <span className="text-brand-600 dark:text-brand-400">Send.</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0">
              Sentinel intercepts your text and uses AI to detect PII, credentials, and social-engineering signals before you expose sensitive data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white text-lg px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-500/25 hover:-translate-y-0.5">
                Get Started &rarr;
              </Link>
              <Link to="/login" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-lg px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-0.5">
                See How It Works
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full relative animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs font-mono text-slate-400">sentinel-scan-result</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="text-4xl font-bold text-red-500">24 <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">/ 100</span></div>
                  <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold text-xs rounded-full border border-red-200 dark:border-red-800/50">CRITICAL RISK</div>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100 dark:border-red-900/50 flex gap-3 items-start">
                  <span>🔴</span>
                  <div>
                    <span className="text-xs font-bold bg-white dark:bg-slate-800 px-1 rounded shadow-sm text-slate-800 dark:text-slate-200">credential</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Contains a plaintext password.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/20 rounded-xl flex items-center justify-center text-2xl mb-6">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Detects PII & Credentials</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Finds hidden phone numbers, passwords, SSH keys, and API tokens before they leak.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/20 rounded-xl flex items-center justify-center text-2xl mb-6">🎣</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Catches Phishing</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Identifies urgency, impersonation, and malicious links designed to trick you.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/20 rounded-xl flex items-center justify-center text-2xl mb-6">✂️</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Auto-Redacts Sensitive Data</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Provides a safe, redacted version of your text that you can copy and share with confidence.</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-12 text-center text-white border border-slate-800 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-400 mb-2">0</div>
              <div className="text-sm text-slate-400">Data stored on our servers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-400 mb-2">Backend</div>
              <div className="text-sm text-slate-400">Only AI calls</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-400 mb-2">JWT</div>
              <div className="text-sm text-slate-400">Secured sessions</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-400 mb-2">Privacy</div>
              <div className="text-sm text-slate-400">By design</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm">
        <p>Sentinel — Built for the AI Security, Privacy & Trust Hackathon</p>
      </footer>
    </div>
  );
}
