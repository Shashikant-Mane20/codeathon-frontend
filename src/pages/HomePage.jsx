
import { ProblemList } from "../components/ProblemList";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8 md:px-10">
      {/* HEADER */}
      <header className="mb-10 text-center space-y-3">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-sky-400">
          NKT TECH FEST 2025
        </p>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-50 drop-shadow-sm">
          Code A Thon – Problem Statements
        </h1>

        <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-300 leading-relaxed">
          Explore the official <span className="text-sky-300 font-medium">Code A Thon</span> challenges.
          Click{" "}
          <span className="font-semibold text-sky-300">View Details</span> to read full descriptions,
          formats, constraints, and evaluation criteria.
        </p>

        <div className="flex justify-center pt-2">
          <div className="inline-flex items-center rounded-full bg-sky-500/10 border border-sky-400/30 px-3 py-1 text-[10px] md:text-xs text-sky-300">
            Updated Live • Powered by NKT Developers Club
          </div>
        </div>
      </header>

      {/* PROBLEM LIST TABLE */}
      <ProblemList />

      {/* FOOTER */}
      <footer className="mt-10 text-center text-[11px] md:text-xs text-slate-500">
        © 2025 NKT Tech Fest • Code A Thon • All Rights Reserved
      </footer>
    </div>
  );
};
