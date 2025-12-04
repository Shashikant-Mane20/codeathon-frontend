import { useEffect, useState } from "react";
import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";

const getPath = () => window.location.pathname;

function App() {
  const [path, setPath] = useState(getPath());

  useEffect(() => {
    const handler = () => setPath(getPath());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* TOP NAV */}
      <nav className="
        sticky top-0 z-40 
        flex items-center justify-between 
        px-4 md:px-10 py-3 
        border-b border-slate-800/70 
        bg-slate-950/80 backdrop-blur-xl
        shadow-lg shadow-black/10
      ">
        
        {/* Left Branding */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer select-none text-sm md:text-lg font-bold tracking-tight text-slate-100 flex items-center gap-1 hover:text-sky-300 transition"
        >
          <span>NKT Tech Fest</span>
          <span className="hidden md:inline">•</span>
          <span className="text-sky-400 md:ml-1">Code A Thon</span>
        </div>

        {/* Right Button */}
        <button
          onClick={() => navigate(path === "/admin" ? "/" : "/admin")}
          className="
            rounded-full 
            border border-sky-500/40 
            bg-sky-500/10 
            px-3 md:px-4 py-1.5 
            text-xs md:text-sm font-medium 
            text-sky-300
            hover:bg-sky-500 hover:text-slate-950 hover:border-sky-500 
            transition-colors
          "
        >
          {path === "/admin" ? "View Problems" : "Admin"}
        </button>
      </nav>

      {/* ROUTES */}
      {path === "/admin" ? <AdminPage /> : <HomePage />}
    </div>
  );
}

export default App;
