import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 32, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", minWidth: 320 }}>
        <h2 style={{ marginBottom: 24, textAlign: "center", fontWeight: 500 }}>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 16, border: "1px solid #ddd", borderRadius: 4 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 16, border: "1px solid #ddd", borderRadius: 4 }}
        />
        {error && <div style={{ color: "#d32f2f", marginBottom: 12, textAlign: "center" }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10, background: "#22223b", color: "#fff", border: "none", borderRadius: 4, fontWeight: 500 }}>Login</button>
      </form>
    </div>
  );
};

export default Login; 