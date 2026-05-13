"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const YEARS = Array.from({ length: 10 }, (_, i) => String(2025 + i));

export default function CheckoutPage() {
  const [sameAddress, setSameAddress] = useState(true);
  const [ordered, setOrdered] = useState(false);
  const [billing, setBilling] = useState({ firstName:"", lastName:"", email:"", phone:"", address:"", city:"New York", state:"New York", zip:"", country:"United States" });
  const [card, setCard] = useState({ type:"Mastercard", number:"", month:"01", year:"2025", cvv:"" });

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrdered(true);
  };

  if (ordered) {
    return (
      <>
        <Navbar />
        <div style={{ maxWidth: "600px", margin: "80px auto", textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "72px", marginBottom: "20px" }}>🎉</div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#1a1a2e", marginBottom: "12px" }}>Order Placed Successfully!</h1>
          <p style={{ color: "#555", fontSize: "15px", marginBottom: "8px" }}>Thank you for your purchase. Your order #HS-{Math.floor(Math.random()*90000+10000)} has been confirmed.</p>
          <p style={{ color: "#888", fontSize: "13px", marginBottom: "32px" }}>You will receive a confirmation email shortly.</p>
          <Link href="/products"><button className="btn-red" style={{ padding: "12px 32px" }}>Continue Shopping</button></Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "30px 20px" }}>
        <div className="breadcrumb">
          <Link href="/">Home</Link><span>›</span>
          <Link href="/cart">Cart</Link><span>›</span>
          <span>Checkout</span>
        </div>
        <h1 className="page-header">🔒 Secure Checkouts</h1>

        <form onSubmit={handleOrder}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            {/* Step 1: Billing */}
            <div>
              <div style={{ background: "#1a1a2e", color: "white", padding: "12px 16px", borderRadius: "6px 6px 0 0", marginBottom: "0" }}>
                <span style={{ fontSize: "13px", fontWeight: "700" }}>Step 1. &nbsp;</span>
                <span style={{ color: "#cc0000", fontWeight: "700" }}>Billing Address</span>
              </div>
              <div style={{ border: "1px solid #e0e0e0", borderTop: "none", borderRadius: "0 0 6px 6px", padding: "20px" }}>
                {[
                  { label:"First Name", key:"firstName", type:"text" },
                  { label:"Last Name", key:"lastName", type:"text" },
                  { label:"Email", key:"email", type:"email" },
                  { label:"Phone", key:"phone", type:"tel" },
                  { label:"Address", key:"address", type:"text" },
                  { label:"Zip Code", key:"zip", type:"text" },
                ].map((f) => (
                  <div key={f.key} style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#555", fontWeight: "600", display: "block", marginBottom: "4px" }}>{f.label}</label>
                    <input className="form-input" type={f.type} required
                      value={billing[f.key as keyof typeof billing]}
                      onChange={(e) => setBilling({ ...billing, [f.key]: e.target.value })}
                      style={{ width: "100%" }} />
                  </div>
                ))}
                {["City","State","Country"].map((f) => (
                  <div key={f} style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#555", fontWeight: "600", display: "block", marginBottom: "4px" }}>{f}</label>
                    <select className="form-input" style={{ width: "100%" }}>
                      <option>{billing[f.toLowerCase() as keyof typeof billing]}</option>
                    </select>
                  </div>
                ))}
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#555", cursor: "pointer" }}>
                  <input type="checkbox" checked={sameAddress} onChange={(e) => setSameAddress(e.target.checked)} />
                  Ship to a different address
                </label>
              </div>

              {/* Step 2: Card Details */}
              <div style={{ marginTop: "20px" }}>
                <div style={{ background: "#1a1a2e", color: "white", padding: "12px 16px", borderRadius: "6px 6px 0 0" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700" }}>Step 2. &nbsp;</span>
                  <span style={{ color: "#cc0000", fontWeight: "700" }}>Card Details</span>
                </div>
                <div style={{ border: "1px solid #e0e0e0", borderTop: "none", borderRadius: "0 0 6px 6px", padding: "20px" }}>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#555", fontWeight: "600", display: "block", marginBottom: "4px" }}>Card Type</label>
                    <select className="form-input" style={{ width: "100%" }} value={card.type} onChange={(e) => setCard({ ...card, type: e.target.value })}>
                      {["Mastercard","Visa","American Express","Discover"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#555", fontWeight: "600", display: "block", marginBottom: "4px" }}>Card Number</label>
                    <input className="form-input" placeholder="XXXX XXXX XXXX XXXX" maxLength={19} style={{ width: "100%" }}
                      value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} required />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#555", fontWeight: "600", display: "block", marginBottom: "4px" }}>Month</label>
                      <select className="form-input" style={{ width: "100%" }} value={card.month} onChange={(e) => setCard({ ...card, month: e.target.value })}>
                        {MONTHS.map((m, i) => <option key={m} value={String(i+1).padStart(2,"0")}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#555", fontWeight: "600", display: "block", marginBottom: "4px" }}>Year</label>
                      <select className="form-input" style={{ width: "100%" }} value={card.year} onChange={(e) => setCard({ ...card, year: e.target.value })}>
                        {YEARS.map((y) => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#555", fontWeight: "600", display: "block", marginBottom: "4px" }}>CVV</label>
                      <input className="form-input" placeholder="CVV" maxLength={4} style={{ width: "100%" }}
                        value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} required />
                    </div>
                  </div>
                  <p style={{ fontSize: "11px", color: "#888" }}>🔒 Please ensure the billing address you enter matches your card billing address.</p>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#555", marginTop: "8px", cursor: "pointer" }}>
                    <input type="checkbox" required /> I accept <Link href="/terms" style={{ color: "#cc0000" }}>Terms and Conditions</Link>
                  </label>
                </div>
              </div>
            </div>

            {/* Step 3: Order Review */}
            <div>
              <div style={{ background: "#1a1a2e", color: "white", padding: "12px 16px", borderRadius: "6px 6px 0 0" }}>
                <span style={{ fontSize: "13px", fontWeight: "700" }}>Step 3. &nbsp;</span>
                <span style={{ color: "#cc0000", fontWeight: "700" }}>Review Your Order</span>
              </div>
              <div style={{ border: "1px solid #e0e0e0", borderTop: "none", borderRadius: "0 0 6px 6px", padding: "20px" }}>
                <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
                      {["Item name","Price","Quantity","Total"].map((h) => (
                        <th key={h} style={{ textAlign: "left", padding: "8px 6px", color: "#555", fontWeight: "700" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                      <td style={{ padding: "10px 6px", color: "#1a1a2e" }}>XS SOYBA X SERIES 110</td>
                      <td style={{ padding: "10px 6px" }}>$999</td>
                      <td style={{ padding: "10px 6px" }}>1000</td>
                      <td style={{ padding: "10px 6px", color: "#cc0000", fontWeight: "700" }}>$1000</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ borderTop: "2px solid #e0e0e0", marginTop: "16px", paddingTop: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: "700", color: "#1a1a2e", marginBottom: "20px" }}>
                    <span>Total with shipping:</span>
                    <span style={{ color: "#cc0000" }}>$698.00</span>
                  </div>
                  <button type="submit" style={{
                    background: "linear-gradient(135deg, #28a745, #1e7e34)",
                    color: "white", border: "none", padding: "14px 28px",
                    fontSize: "14px", fontWeight: "700", cursor: "pointer",
                    borderRadius: "4px", display: "flex", alignItems: "center",
                    gap: "8px", width: "100%", justifyContent: "center"
                  }}>
                    🔒 Place Your Order →
                  </button>
                </div>
              </div>

              {/* Shipping Address */}
              {sameAddress && (
                <div style={{ marginTop: "20px" }}>
                  <div style={{ background: "#1a1a2e", color: "white", padding: "12px 16px", borderRadius: "6px 6px 0 0" }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "#cc0000" }}>Shipping Address</span>
                  </div>
                  <div style={{ border: "1px solid #e0e0e0", borderTop: "none", borderRadius: "0 0 6px 6px", padding: "20px" }}>
                    {[
                      { label:"First Name", type:"text" },
                      { label:"Last Name", type:"text" },
                      { label:"Email", type:"email" },
                      { label:"Phone", type:"tel" },
                    ].map((f) => (
                      <div key={f.label} style={{ marginBottom: "12px" }}>
                        <label style={{ fontSize: "12px", color: "#555", fontWeight: "600", display: "block", marginBottom: "4px" }}>{f.label}</label>
                        <input className="form-input" type={f.type} style={{ width: "100%" }} />
                      </div>
                    ))}
                    {["City","State","Zip Code","Country"].map((f) => (
                      <div key={f} style={{ marginBottom: "12px" }}>
                        <label style={{ fontSize: "12px", color: "#555", fontWeight: "600", display: "block", marginBottom: "4px" }}>{f}</label>
                        <select className="form-input" style={{ width: "100%" }}><option>New York</option></select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
