"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return (
      <>
        <Navbar />
        <main style={{ maxWidth: "900px", margin: "0 auto", padding: "30px 20px" }}>
          <h1 className="page-header">My Account</h1>
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "24px" }}>
            <aside className="sidebar">
              <div style={{ background: "#1a1a2e", padding: "16px", color: "white" }}>
                <div style={{ fontSize: "36px", textAlign: "center", marginBottom: "8px" }}>👤</div>
                <div style={{ fontSize: "13px", fontWeight: "700", textAlign: "center" }}>Welcome Back!</div>
                <div style={{ fontSize: "11px", color: "#aaa", textAlign: "center" }}>john@example.com</div>
              </div>
              {[
                { href: "/account", label: "📋 Dashboard" },
                { href: "/account/orders", label: "📦 My Orders" },
                { href: "/account/wishlist", label: "❤️ Wish List" },
                { href: "/account/billing", label: "💳 Edit Billing" },
                { href: "/account/shipping", label: "🚚 Edit Shipping" },
              ].map((item) => (
                <Link key={item.href} href={item.href}
                  style={{ display: "block", padding: "12px 16px", fontSize: "13px", color: "#333", textDecoration: "none", borderBottom: "1px solid #f0f0f0" }}>
                  {item.label}
                </Link>
              ))}
              <div style={{ padding: "12px 16px" }}>
                <button className="btn-red" style={{ width: "100%", fontSize: "12px" }} onClick={() => setLoggedIn(false)}>
                  🚪 Logout
                </button>
              </div>
            </aside>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                {[
                  { icon: "📦", num: "3", label: "Orders" },
                  { icon: "❤️", num: "5", label: "Wishlist" },
                  { icon: "💬", num: "2", label: "Reviews" },
                  { icon: "💳", num: "1", label: "Addresses" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "white", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "20px", textAlign: "center", borderTop: "4px solid #cc0000" }}>
                    <div style={{ fontSize: "32px" }}>{s.icon}</div>
                    <div style={{ fontSize: "24px", fontWeight: "800", color: "#cc0000" }}>{s.num}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#f9f9f9", borderRadius: "8px", padding: "20px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a2e", marginBottom: "12px" }}>Recent Orders</h3>
                <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
                      {["Order #", "Date", "Status", "Total"].map((h) => (
                        <th key={h} style={{ textAlign: "left", padding: "8px", color: "#555" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { num: "HS-12345", date: "May 10, 2026", status: "Delivered", total: "$500.00" },
                      { num: "HS-12344", date: "Apr 28, 2026", status: "Processing", total: "$1,200.00" },
                    ].map((o) => (
                      <tr key={o.num} style={{ borderBottom: "1px solid #e0e0e0" }}>
                        <td style={{ padding: "10px 8px", color: "#cc0000", fontWeight: "600" }}>{o.num}</td>
                        <td style={{ padding: "10px 8px" }}>{o.date}</td>
                        <td style={{ padding: "10px 8px" }}>
                          <span style={{ background: o.status === "Delivered" ? "#d4edda" : "#fff3cd", color: o.status === "Delivered" ? "#155724" : "#856404", padding: "3px 8px", borderRadius: "3px", fontSize: "11px", fontWeight: "600" }}>
                            {o.status}
                          </span>
                        </td>
                        <td style={{ padding: "10px 8px", fontWeight: "700" }}>{o.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "500px", margin: "40px auto", padding: "0 20px" }}>
        <div className="form-container">
          <h1 className="form-title">{isLogin ? "Login to Your Account" : "Create Account"}</h1>
          <p className="form-subtitle">{isLogin ? "Welcome back! Please log in." : "Join HotSpring today — it's free!"}</p>
          <form onSubmit={(e) => { e.preventDefault(); setLoggedIn(true); }}>
            {!isLogin && (
              <div className="form-row">
                <label className="form-label">Full Name *</label>
                <input className="form-input" type="text" placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
            )}
            <div className="form-row">
              <label className="form-label">Email *</label>
              <input className="form-input" type="email" placeholder="email@example.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-row">
              <label className="form-label">Password *</label>
              <input className="form-input" type="password" placeholder="••••••••" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <div style={{ paddingLeft: "170px" }}>
              <button className="btn-red" type="submit" style={{ width: "100%", padding: "10px" }}>
                {isLogin ? "🔑 LOGIN" : "✅ CREATE ACCOUNT"}
              </button>
            </div>
          </form>
          <p style={{ textAlign: "center", fontSize: "13px", color: "#666", marginTop: "20px" }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} style={{ background: "none", border: "none", color: "#cc0000", cursor: "pointer", fontWeight: "700", fontSize: "13px" }}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
