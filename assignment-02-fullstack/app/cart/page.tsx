"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { products } from "../../data/products";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { ...products[0], qty: 1 },
    { ...products[2], qty: 1 },
  ]);

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return;
    setCartItems(cartItems.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const removeItem = (id: number) => setCartItems(cartItems.filter((i) => i.id !== id));

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
        <div className="breadcrumb">
          <Link href="/">Home</Link><span>›</span><span>Shopping Cart</span>
        </div>
        <h1 className="page-header">🛒 Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🛒</div>
            <h2 style={{ fontSize: "20px", color: "#1a1a2e", marginBottom: "8px" }}>Your cart is empty</h2>
            <p style={{ color: "#666", marginBottom: "24px" }}>Start adding some products!</p>
            <Link href="/products"><button className="btn-red">Browse Products</button></Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "30px", alignItems: "start" }}>
            {/* Cart Items */}
            <div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#1a1a2e", color: "white" }}>
                    {["Product", "Price", "Quantity", "Total", ""].map((h) => (
                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: "600" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, idx) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #e0e0e0", background: idx % 2 === 0 ? "white" : "#fafafa" }}>
                      <td style={{ padding: "14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span style={{ fontSize: "32px" }}>🛁</span>
                          <div>
                            <div style={{ fontWeight: "700", color: "#1a1a2e", marginBottom: "2px" }}>{item.name}</div>
                            <div style={{ fontSize: "11px", color: "#888" }}>{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "14px", color: "#cc0000", fontWeight: "700" }}>${item.price.toFixed(2)}</td>
                      <td style={{ padding: "14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button onClick={() => updateQty(item.id, item.qty - 1)}
                            style={{ width: "28px", height: "28px", border: "1px solid #ccc", background: "#f0f0f0", cursor: "pointer", borderRadius: "3px" }}>−</button>
                          <span style={{ minWidth: "24px", textAlign: "center", fontWeight: "700" }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)}
                            style={{ width: "28px", height: "28px", border: "1px solid #ccc", background: "#f0f0f0", cursor: "pointer", borderRadius: "3px" }}>+</button>
                        </div>
                      </td>
                      <td style={{ padding: "14px", fontWeight: "700" }}>${(item.price * item.qty).toFixed(2)}</td>
                      <td style={{ padding: "14px" }}>
                        <button onClick={() => removeItem(item.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#cc0000", fontSize: "16px" }}>✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                <Link href="/products"><button className="btn-dark">← Continue Shopping</button></Link>
                <button className="btn-red">🔄 Update Cart</button>
              </div>
            </div>

            {/* Order Summary */}
            <div style={{ background: "#f9f9f9", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a2e", marginBottom: "20px", paddingBottom: "10px", borderBottom: "2px solid #cc0000" }}>
                Order Summary
              </h2>
              {[
                { label: "Subtotal", val: `$${subtotal.toFixed(2)}` },
                { label: "Shipping", val: shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}` },
                { label: "Tax (8%)", val: `$${(subtotal * 0.08).toFixed(2)}` },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "10px", color: "#555" }}>
                  <span>{row.label}</span><span style={{ fontWeight: "600" }}>{row.val}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "17px", fontWeight: "800", color: "#1a1a2e", borderTop: "2px solid #e0e0e0", paddingTop: "12px", marginTop: "8px" }}>
                <span>Total</span><span style={{ color: "#cc0000" }}>${(total * 1.08).toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <button className="btn-red" style={{ width: "100%", marginTop: "20px", padding: "14px", fontSize: "15px" }}>
                  🔒 PROCEED TO CHECKOUT
                </button>
              </Link>
              <div style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", color: "#888" }}>
                🔒 Secure SSL Checkout
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
