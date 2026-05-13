"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
        <div className="breadcrumb">
          <Link href="/">Home</Link><span>›</span><span>Contact Us</span>
        </div>
        <h1 className="page-header">Contact Us</h1>

        {/* Support Header */}
        <div style={{ background: "#f9f9f9", borderRadius: "8px", padding: "24px", marginBottom: "30px", borderLeft: "4px solid #cc0000" }}>
          <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#1a1a2e", marginBottom: "6px" }}>Contact Our Customer Support</h2>
          <p style={{ fontSize: "13px", color: "#666" }}>
            To track a new account, access the Customer Information below. Passwords are case sensitive and must be 6–32 characters long.
          </p>
        </div>

        {/* Online Sales */}
        <div style={{ background: "white", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "20px", marginBottom: "30px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a2e", marginBottom: "6px" }}>Online Sales &amp; Customer Support</h3>
          <p style={{ fontSize: "13px", color: "#555" }}>📞 Call Us: <strong>530-700/0441</strong></p>
        </div>

        {/* Store Locations */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "36px" }}>
          {[
            {
              title: "Retail Store Location", icon: "🏪",
              lines: ["HotSpring Spa Ltd.", "100 Main St. Rt. 112", "Mohegan, NY 2016", "555-313-204"]
            },
            {
              title: "Services", icon: "🔧",
              lines: ["HotSpring Spa Ltd.", "100 Main St. Rt. 112", "Mohegan, NY 2016", "555-313-204"]
            }
          ].map((loc) => (
            <div key={loc.title} style={{ background: "#f9f9f9", borderRadius: "8px", padding: "20px", border: "1px solid #e0e0e0" }}>
              <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e", marginBottom: "12px" }}>
                {loc.icon} {loc.title}
              </h4>
              {loc.lines.map((l, i) => (
                <p key={i} style={{ fontSize: "13px", color: "#555", marginBottom: "4px" }}>{l}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="form-container" style={{ maxWidth: "100%", margin: "0" }}>
          <h2 className="form-title">Send Us a Message</h2>
          <p className="form-subtitle">Fill in the form below and we&apos;ll get back to you within 24 hours.</p>

          {submitted && (
            <div style={{ background: "#d4edda", color: "#155724", padding: "12px 16px", borderRadius: "4px", marginBottom: "20px", fontSize: "14px" }}>
              ✅ Your message has been sent! We&apos;ll respond within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { label: "Your Name", key: "name", type: "text", placeholder: "Enter your full name" },
              { label: "Email", key: "email", type: "email", placeholder: "Enter your email address" },
              { label: "Subject", key: "subject", type: "text", placeholder: "Message subject" },
            ].map((f) => (
              <div key={f.key} className="form-row">
                <label className="form-label">{f.label} *</label>
                <input
                  className="form-input"
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  required
                />
              </div>
            ))}
            <div className="form-row">
              <label className="form-label">Your Message *</label>
              <textarea
                className="form-input"
                rows={6}
                placeholder="Enter your message here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                style={{ resize: "vertical" }}
              />
            </div>
            <div style={{ textAlign: "left", paddingLeft: "170px" }}>
              <button className="btn-red" type="submit" style={{ padding: "10px 30px" }}>📨 SEND MESSAGE</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
