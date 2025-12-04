import { useState, useEffect } from "react";

const emptyProblem = {
  title: "",
  code: "",
  track: "",
  level: "Beginner",
  maxTeamSize: 4,
  shortDescription: "",
  problemStatement: "",
  inputFormat: "",
  outputFormat: "",
  constraints: "",
  sampleInput: "",
  sampleOutput: "",
  evaluationCriteria: "",
  resources: ""
};

export const AdminProblemForm = ({ onSubmit, editingProblem, onCancel }) => {
  const [form, setForm] = useState(emptyProblem);

  useEffect(() => {
    if (editingProblem) {
      setForm(editingProblem);
    } else {
      setForm(emptyProblem);
    }
  }, [editingProblem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "maxTeamSize" ? (value === "" ? "" : Number(value)) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:p-6 shadow-xl shadow-slate-900/40 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-sm md:text-base font-semibold text-slate-50">
            {editingProblem ? "Edit Problem" : "Add New Problem"}
          </h3>
          <p className="text-[11px] md:text-xs text-slate-400 mt-1">
            Fill in the details for a Code A Thon problem statement. All fields
            can be edited later (except the unique code).
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[10px] font-medium text-sky-300">
          Problem Config Panel
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 md:gap-4 md:grid-cols-2"
      >
        {/* Basic info */}
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1.5">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs md:text-sm text-slate-50 
                       outline-none placeholder:text-slate-500
                       focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 transition"
            placeholder="Smart Campus Energy Monitor"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1.5">
            Code (e.g. PS001 – unique) <span className="text-red-400">*</span>
          </label>
          <input
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs md:text-sm text-slate-50 font-mono
                       outline-none placeholder:text-slate-500
                       focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 transition
                       disabled:opacity-60 disabled:cursor-not-allowed"
            placeholder="PS002"
            required
            disabled={!!editingProblem}
          />
          {editingProblem && (
            <p className="mt-1 text-[10px] text-slate-500">
              Code cannot be changed once created.
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1.5">
            Track <span className="text-red-400">*</span>
          </label>
          <input
            name="track"
            value={form.track}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs md:text-sm text-slate-50 
                       outline-none placeholder:text-slate-500
                       focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 transition"
            placeholder="Web / App / AI / IoT"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1.5">
            Level
          </label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs md:text-sm text-slate-50
                       outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 transition"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1.5">
            Max Team Size
          </label>
          <input
            name="maxTeamSize"
            type="number"
            min="1"
            value={form.maxTeamSize}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs md:text-sm text-slate-50 
                       outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 transition"
          />
          <p className="mt-1 text-[10px] text-slate-500">
            Example: 2–4 members per team recommended.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-200 mb-1.5">
            Short Description <span className="text-red-400">*</span>
          </label>
          <textarea
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs md:text-sm text-slate-50 
                       outline-none placeholder:text-slate-500
                       focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 transition resize-y"
            rows={2}
            placeholder="One–two line summary that organisers and participants can quickly read."
            required
          />
        </div>

        {/* big fields */}
        {[
          "problemStatement",
        //   "inputFormat",
        //   "outputFormat",
        //   "constraints",
        //   "sampleInput",
        //   "sampleOutput",
        //   "evaluationCriteria",
        //   "resources"
        ].map((field) => (
          <div key={field} className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-200 mb-1.5 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <textarea
              name={field}
              value={form[field] || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs md:text-sm text-slate-50 
                         outline-none placeholder:text-slate-500
                         focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 transition resize-y"
              rows={field === "problemStatement" ? 4 : 3}
              placeholder={
                field === "problemStatement"
                  ? "Describe the real-world context, what needs to be built, and what is expected from participants..."
                  : field === "sampleInput"
                  ? 'Example: [{"lab_id": "Lab-101", "timestamp": "...", "energy_kwh": 4.5}]'
                  : field === "sampleOutput"
                  ? "Describe expected dashboard behaviour or example console / API output..."
                  : ""
              }
            />
          </div>
        ))}

        <div className="md:col-span-2 flex flex-col md:flex-row justify-end gap-2 mt-3">
          {editingProblem && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center rounded-lg border border-slate-700/80 px-4 py-1.5 text-xs md:text-sm text-slate-100
                         hover:bg-slate-800/80 transition"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-5 py-1.5 text-xs md:text-sm font-semibold text-slate-950
                       hover:bg-sky-400 active:bg-sky-500/90 transition transform hover:-translate-y-[1px]"
          >
            {editingProblem ? "Save Changes" : "Add Problem"}
          </button>
        </div>
      </form>
    </div>
  );
};
