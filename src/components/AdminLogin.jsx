import { useState } from "react";
import { useAdmin } from "../context/AdminContext";

export const AdminLogin = () => {
  const { login } = useAdmin();
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(secret);
    } catch {
      setError("Invalid secret or server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-400 mb-2">
            Code A Thon Admin
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            Admin Access Panel
          </h1>
          <p className="mt-2 text-xs md:text-sm text-slate-400">
            Only authorised organisers are allowed to access the admin dashboard.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 md:p-7 shadow-xl shadow-sky-900/20 backdrop-blur">
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-center text-slate-50">
            Admin Login
          </h2>
          <p className="text-xs text-slate-400 mb-5 text-center">
            Enter the secret key shared with you by the Code A Thon organisers.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                Admin Secret
              </label>
              <input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-50 outline-none placeholder:text-slate-500
                           focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40 transition"
                placeholder="Enter secret key"
                required
              />
              <p className="text-[11px] text-slate-500">
                Tip: Do not share this secret with participants or non-organisers.
              </p>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-slate-950
                         hover:bg-sky-400 active:bg-sky-500/90
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition transform hover:-translate-y-[1px]"
            >
              Login to Dashboard
            </button>
          </form>
        </div>

        <p className="mt-4 text-[11px] text-center text-slate-500">
          Having trouble? Contact the tech team to reset or reissue your admin secret.
        </p>
      </div>
    </div>
  );
};
