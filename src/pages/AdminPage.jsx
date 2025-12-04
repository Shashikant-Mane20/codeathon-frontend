
import { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { axiosClient } from "../api/axiosClient";
import { AdminLogin } from "../components/AdminLogin";
import { AdminProblemForm } from "../components/AdminProblemForm";
import { AdminProblemTable } from "../components/AdminProblemTable";

export const AdminPage = () => {
  const { isAdmin, checking, logout } = useAdmin();
  const [problems, setProblems] = useState([]);
  const [editingProblem, setEditingProblem] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProblems = async () => {
    setLoading(true);
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
    if (isAdmin) {
      fetchProblems();
    }
  }, [isAdmin]);

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editingProblem) {
        await axiosClient.put(
          `/api/admin/problems/${editingProblem._id}`,
          data
        );
      } else {
        await axiosClient.post("/api/admin/problems", data);
      }
      setEditingProblem(null);
      fetchProblems();
    } catch (error) {
  console.error("❌ Error saving problem:", error);

  console.error("🔥 SERVER RESPONSE:", error.response?.data);

  alert(
    error.response?.data?.error ||
    error.response?.data?.message ||
    "Error saving problem"
  );
}

  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this problem?")) return;
    try {
      await axiosClient.delete(`/api/admin/problems/${id}`);
      fetchProblems();
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="flex flex-col items-center gap-3 px-4">
          <div className="h-8 w-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-200">Checking admin access…</p>
          <p className="text-[11px] text-slate-500">
            Verifying your Code A Thon organiser credentials.
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-sky-400 mb-1">
              Code A Thon
            </p>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
              Organiser Admin Portal
            </h1>
            <p className="mt-2 text-xs md:text-sm text-slate-400">
              Login with the admin secret provided by the tech / organising team.
            </p>
          </div>
          <AdminLogin />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-6 md:px-10 md:py-8">
      <header className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-slate-50">
              Admin Dashboard
            </h1>
            <span className="inline-flex items-center rounded-full bg-sky-500/10 border border-sky-500/40 px-2.5 py-0.5 text-[10px] font-medium text-sky-300">
              Code A Thon
            </span>
          </div>
          <p className="text-[11px] md:text-xs text-slate-400">
            Manage, edit and review problem statements without touching the codebase.
          </p>
        </div>
        <div className="flex items-center gap-2 justify-end">
          {loading && (
            <span className="hidden md:inline-flex items-center gap-2 text-[11px] text-slate-400">
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
              Refreshing problems…
            </span>
          )}
          <button
            onClick={logout}
            className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 md:px-4 py-1.5 text-[11px] md:text-xs text-slate-200 hover:bg-slate-800 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid gap-4 md:gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* Left: Form */}
        <div className="order-2 md:order-1">
          <AdminProblemForm
            editingProblem={editingProblem}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => setEditingProblem(null)}
          />
        </div>

        {/* Right: Table */}
        <div className="order-1 md:order-2 space-y-3 md:space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h2 className="text-sm md:text-base font-semibold text-slate-50">
                All Problems
              </h2>
              <p className="text-[11px] text-slate-500">
                Overview of all active problem statements in this event.
              </p>
            </div>
            {loading && (
              <span className="inline-flex items-center gap-2 text-[11px] text-slate-400 md:hidden">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                Refreshing…
              </span>
            )}
          </div>

          <AdminProblemTable
            problems={problems}
            onEdit={setEditingProblem}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
