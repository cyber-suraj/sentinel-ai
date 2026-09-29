export default function Settings() {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Account</h3>
          <p className="text-sm text-slate-500">Email: {localStorage.getItem('userEmail')}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Security</h3>
          <p className="text-sm text-slate-500">Your connection is secured with JWT tokens.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-red-500">Danger Zone</h3>
          <button disabled className="mt-2 bg-red-100 text-red-500 px-4 py-2 rounded-lg font-semibold opacity-50 cursor-not-allowed">Delete Account</button>
        </div>
      </div>
    </div>
  );
}
