"use client";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Link from "next/link";

export default function EditBillingPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    city: "", state: "", zip: "", country: ""
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields = [
    { label: "First Name", key: "firstName", type: "text", placeholder: "Enter first name" },
    { label: "Last Name", key: "lastName", type: "text", placeholder: "Enter last name" },
    { label: "Email", key: "email", type: "email", placeholder: "Enter email address" },
    { label: "Phone", key: "phone", type: "tel", placeholder: "Enter phone number" },
    { label: "City", key: "city", type: "text", placeholder: "Enter city" },
    { label: "State", key: "state", type: "text", placeholder: "Enter state" },
    { label: "Zip Code", key: "zip", type: "text", placeholder: "Enter zip code" },
    { label: "Country", key: "country", type: "text", placeholder: "Enter country" },
  ];

  return (
    <>
      <Navbar />
      <main style={{ padding: "30px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/account">My Account</Link><span>›</span>
            <span>Edit Billing Address</span>
          </div>

          <div className="form-container" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h1 className="form-title">Edit Billing Address</h1>
            <p className="form-subtitle">Please fill the form below to update your Profile details.</p>
            <p className="required-note">* Required Fields</p>

            {saved && (
              <div style={{ background: "#d4edda", color: "#155724", padding: "12px 16px", borderRadius: "4px", marginBottom: "20px", fontSize: "14px" }}>
                ✅ Billing address updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {fields.map((f) => (
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
              <div style={{ paddingLeft: "170px", display: "flex", gap: "12px" }}>
                <button className="btn-red" type="submit" style={{ padding: "10px 24px" }}>
                  UPDATE ADDRESS
                </button>
                <Link href="/account">
                  <button className="btn-dark" type="button" style={{ padding: "10px 24px" }}>Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
