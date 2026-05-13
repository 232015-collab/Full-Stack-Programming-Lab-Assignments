"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(2);

  return (
    <header>
      {/* Top Bar */}
      <div className="navbar-top">
        <span>📞 Call 24/7: 555-321-8090 &nbsp;|&nbsp; 📧 info@hotspring.com</span>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link href="/account" style={{ color: "#ccc", textDecoration: "none", fontSize: "12px" }}>My Account</Link>
          <Link href="/cart" style={{ color: "#ccc", textDecoration: "none", fontSize: "12px" }}>🛒 Cart ({cartCount})</Link>
          <Link href="/wishlist" style={{ color: "#ccc", textDecoration: "none", fontSize: "12px" }}>❤️ Wish List</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar-main">
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className="logo-text">
            <span className="logo-hot">HOT</span>
            <span className="logo-spring">SPRING</span>
            <div style={{ fontSize: "11px", color: "#666", fontWeight: "400", letterSpacing: "3px", marginTop: "-4px" }}>SPAS</div>
          </div>
        </Link>

        {/* Search */}
        <div className="search-bar" style={{ display: "flex" }}>
          <input type="text" placeholder="Search for spas, accessories..." style={{ width: "280px" }} />
          <button>🔍 Search</button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}
          className="mobile-menu-btn"
        >☰</button>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu" style={{ flexWrap: "wrap" }}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/products/spas">Spas</Link>
        <Link href="/products/kits">Kits</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/cart">🛒 Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}
