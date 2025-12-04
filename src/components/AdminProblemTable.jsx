export const AdminProblemTable = ({ problems, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-sm shadow-xl shadow-slate-900/40">
      <table className="min-w-full text-xs md:text-sm">
        <thead className="bg-slate-900/95 border-b border-slate-800">
          <tr>
            <th className="px-3 md:px-4 py-2.5 text-left font-semibold text-slate-300 whitespace-nowrap">
              Code
            </th>
            <th className="px-3 md:px-4 py-2.5 text-left font-semibold text-slate-300">
              Title & Description
            </th>
            <th className="px-3 md:px-4 py-2.5 text-left font-semibold text-slate-300 whitespace-nowrap">
              Track
            </th>
            <th className="px-3 md:px-4 py-2.5 text-left font-semibold text-slate-300 whitespace-nowrap">
              Level
            </th>
            <th className="px-3 md:px-4 py-2.5 text-right font-semibold text-slate-300 whitespace-nowrap">
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
              <td className="px-3 md:px-4 py-2.5 font-mono text-[11px] md:text-xs text-sky-300 whitespace-nowrap">
                {p.code}
              </td>

              <td className="px-3 md:px-4 py-2.5 align-top">
                <div className="font-medium text-slate-50 line-clamp-1 md:line-clamp-none">
                  {p.title}
                </div>
                <div className="mt-0.5 text-[11px] text-slate-400 line-clamp-1 md:line-clamp-2">
                  {p.shortDescription}
                </div>
              </td>

              <td className="px-3 md:px-4 py-2.5 text-slate-200 whitespace-nowrap">
                <span className="inline-flex items-center rounded-full bg-slate-800/80 px-2 py-1 text-[10px] md:text-[11px]">
                  {p.track || "—"}
                </span>
              </td>

              <td className="px-3 md:px-4 py-2.5 whitespace-nowrap">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] md:text-[11px] font-medium ${
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

              <td className="px-3 md:px-4 py-2.5 text-right">
                <div className="flex justify-end gap-1.5 md:gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="inline-flex items-center justify-center rounded-full border border-sky-400/70 px-2.5 py-1 text-[10px] md:text-[11px] text-sky-100
                               hover:bg-sky-500 hover:text-slate-950 hover:border-sky-500
                               transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p._id)}
                    className="inline-flex items-center justify-center rounded-full border border-red-500/70 px-2.5 py-1 text-[10px] md:text-[11px] text-red-200
                               hover:bg-red-500 hover:text-slate-950 hover:border-red-500
                               transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {problems.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="px-4 py-6 text-center text-slate-400 text-xs md:text-sm"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg md:text-xl">📄</span>
                  <p>No problems added yet.</p>
                  <p className="text-[11px] md:text-xs text-slate-500">
                    Use the form above to create your first Code A Thon problem
                    statement.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
