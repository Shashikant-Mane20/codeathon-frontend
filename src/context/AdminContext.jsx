import { createContext, useContext, useState, useEffect } from "react";
import { axiosClient } from "../api/axiosClient";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  const verifyAdmin = async () => {
    try {
      await axiosClient.get("/api/admin/check");
      setIsAdmin(true);
    } catch {
      setIsAdmin(false);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    const storedSecret = localStorage.getItem("adminSecret");
    if (storedSecret) {
      verifyAdmin();
    } else {
      setChecking(false);
    }
  }, []);

  const login = async (secret) => {
    localStorage.setItem("adminSecret", secret);
    setChecking(true);
    await verifyAdmin();
  };

  const logout = () => {
    localStorage.removeItem("adminSecret");
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, checking, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
