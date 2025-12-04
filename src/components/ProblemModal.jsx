function TableRow({ label, value }) {
  return (
    <tr className="border-b border-slate-800/60">
      <td className="bg-slate-900/80 px-3 py-2 font-medium text-slate-200 w-40 md:w-52">
        {label}
      </td>
      <td className="px-3 py-2 text-slate-300">{value || "-"}</td>
    </tr>
  );
}

function Section({ title, text, isCode }) {
  if (!text) return null;
  return (
    <div className="space-y-1">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
        {title}
      </h3>
      <div
        className={`rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 ${
          isCode ? "font-mono text-[11px] md:text-xs whitespace-pre-wrap" : "text-sm"
        } text-slate-200`}
      >
        {text}
      </div>
    </div>
  );
}

export const ProblemModal = ({ problem, onClose }) => {
  if (!problem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-300 hover:bg-slate-800"
        >
          ✕
        </button>

        <div className="px-5 py-5 md:px-7 md:py-6 space-y-4 text-sm">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-sky-300">
              {problem.code} • {problem.track}
            </p>
            <h2 className="mt-1 text-xl md:text-2xl font-semibold text-white">
              {problem.title}
            </h2>
            <p className="mt-2 text-slate-300">{problem.shortDescription}</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="min-w-full text-xs md:text-sm">
              <tbody>
                <TableRow label="Track" value={problem.track} />
                <TableRow label="Difficulty Level" value={problem.level} />
                <TableRow
                  label="Max Team Size"
                  value={problem.maxTeamSize?.toString() || "-"}
                />
                <TableRow
                  label="Evaluation Criteria"
                  value={
                    problem.evaluationCriteria || "Will be announced during briefing."
                  }
                />
              </tbody>
            </table>
          </div>

          <Section title="Problem Statement" text={problem.problemStatement} />
          <Section title="Input Format" text={problem.inputFormat} />
          <Section title="Output Format" text={problem.outputFormat} />
          <Section title="Constraints" text={problem.constraints} />
          <Section title="Sample Input" text={problem.sampleInput} isCode />
          <Section title="Sample Output" text={problem.sampleOutput} isCode />
          <Section title="Resources / Notes" text={problem.resources} />

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="rounded-full bg-sky-500 px-4 py-1.5 text-xs md:text-sm font-medium text-slate-950 hover:bg-sky-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
