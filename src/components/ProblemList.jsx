import { useState, useEffect } from "react";
import { axiosClient } from "../api/axiosClient";
import { ProblemModal } from "./ProblemModal";

export const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProblems = async () => {
    try {
      const res = await axiosClient.get("/api/problems");
      setProblems(res.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <>
      {loading ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-8 flex flex-col items-center justify-center gap-2">
          <div className="h-8 w-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-300">Loading problem statements…</p>
          <p className="text-[11px] text-slate-500">
            Please wait while we fetch the latest Code A Thon challenges.
          </p>
        </div>
      ) : problems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/60 px-4 py-8 text-center">
          <div className="text-2xl mb-2">📄</div>
          <p className="text-sm text-slate-300 mb-1">
            No problem statements added yet.
          </p>
          <p className="text-[11px] text-slate-500">
            Please check back later or contact the organisers for more details.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-sm shadow-xl shadow-slate-900/40">
          <table className="min-w-full text-xs md:text-sm">
            <thead className="bg-slate-900/95 border-b border-slate-800">
              <tr>
                <th className="px-3 md:px-4 py-3 text-left font-semibold text-slate-300 whitespace-nowrap">
                  Code
                </th>
                <th className="px-3 md:px-4 py-3 text-left font-semibold text-slate-300">
                  Title & Summary
                </th>
                <th className="px-3 md:px-4 py-3 text-left font-semibold text-slate-300 whitespace-nowrap">
                  Track
                </th>
                <th className="px-3 md:px-4 py-3 text-left font-semibold text-slate-300 whitespace-nowrap">
                  Level
                </th>
                <th className="px-3 md:px-4 py-3 text-center font-semibold text-slate-300 whitespace-nowrap">
                  Max Team
                </th>
                <th className="px-3 md:px-4 py-3 text-right font-semibold text-slate-300 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {problems.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-slate-800/70 hover:bg-slate-900/70 transition-colors"
                >
                  <td className="px-3 md:px-4 py-3 font-mono text-[11px] md:text-xs text-sky-300 whitespace-nowrap">
                    {p.code}
                  </td>

                  <td className="px-3 md:px-4 py-3 align-top">
                    <div className="font-medium text-slate-50 line-clamp-1 md:line-clamp-none">
                      {p.title}
                    </div>
                    <div className="mt-0.5 text-[11px] md:text-xs text-slate-400 line-clamp-2">
                      {p.shortDescription}
                    </div>
                  </td>

                  <td className="px-3 md:px-4 py-3 text-slate-200 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-slate-800/80 px-2 py-1 text-[10px] md:text-[11px]">
                      {p.track || "—"}
                    </span>
                  </td>

                  <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] md:text-[11px] font-medium uppercase tracking-wide ${
                        p.level === "Advanced"
                          ? "bg-red-500/10 text-red-300 border border-red-500/40"
                          : p.level === "Intermediate"
                          ? "bg-amber-500/10 text-amber-300 border border-amber-500/40"
                          : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                      }`}
                    >
                      {p.level}
                    </span>
                  </td>

                  <td className="px-3 md:px-4 py-3 text-center text-slate-100 whitespace-nowrap">
                    {p.maxTeamSize}
                  </td>

                  <td className="px-3 md:px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedProblem(p)}
                      className="inline-flex items-center justify-center rounded-full border border-sky-400/70 px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-medium text-sky-100
                                 hover:bg-sky-500 hover:text-slate-950 hover:border-sky-500
                                 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProblem && (
        <ProblemModal
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
        />
      )}
    </>
  );
};
