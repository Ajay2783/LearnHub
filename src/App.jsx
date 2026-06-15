import { useEffect, useState } from "react";
import { supabase } from "./config/supabase";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [role, setRole] = useState("user");

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (!error && data) {
          setRole(data.role);
        } else {
          setRole("user"); // default to user if no profile yet
        }
      } else {
        setRole("user");
      }
    } catch (err) {
      console.error(err);
      setRole("user");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d0d1a",
        gap: "16px",
        fontFamily: "Inter, sans-serif",
        color: "rgba(255,255,255,0.5)"
      }}>
        <div style={{
          width: 44, height: 44,
          border: "3px solid rgba(255,255,255,0.1)",
          borderTopColor: "#6c47ff",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }} />
        <p style={{ fontSize: "0.9rem" }}>Loading…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!session) return <Login />;
  if (role === "admin") return <AdminDashboard />;
  return <UserDashboard />;
}

export default App;