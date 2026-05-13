"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { products } from "../../data/products";

const SEAT_FILTERS = ["1-3 People", "4+ People"];
const SIZE_FILTERS = ["3-4 Feet Long", "4-5 Feet Long", "5 Feet Long", "5 Feet To Large Size"];
const TYPE_FILTERS = ["Plug and Play to Visit", "Soaking Spas", "Corner Spas", "Portable Spas", "Swim Spas"];
const PRICE_FILTERS = [
  { label: "Under $1,000", min: 0, max: 1000 },
  { label: "$1,000 to $1,500", min: 1000, max: 1500 },
  { label: "$1,500 to $2,000", min: 1500, max: 2000 },
  { label: "$2,000 to $2,500", min: 2000, max: 2500 },
  { label: "$2,500+", min: 2500, max: Infinity },
];

export default function ProductsPage() {
  const [seatFilter, setSeatFilter] = useState<string[]>([]);
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [sort, setSort] = useState("default");

  const toggle = (arr: string[], val: string, set: (a: string[]) => void) => {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  let filtered = products.filter((p) => {
    if (seatFilter.length && !seatFilter.includes(p.seats)) return false;
    if (sizeFilter.length && !sizeFilter.includes(p.size)) return false;
    if (typeFilter.length && !typeFilter.includes(p.type)) return false;
    if (priceFilter.length) {
      const match = PRICE_FILTERS.filter((f) => priceFilter.includes(f.label));
      if (!match.some((f) => p.price >= f.min && p.price < f.max)) return false;
    }
    return true;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "name-asc") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
        <div className="breadcrumb">
          <Link href="/">Home</Link><span>›</span><span>Products</span>
        </div>
        <h1 className="page-header">Top Product Listing</h1>

        <div style={{ display: "grid", gridTemplateColumns: "230px 1fr", gap: "24px", alignItems: "start" }}>
          {/* Sidebar Filters */}
          <aside className="sidebar">
            <div className="sidebar-section" style={{ background: "#1a1a2e", padding: "12px 15px" }}>
              <h3 style={{ color: "white", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
                🔍 Shopping Options
              </h3>
            </div>

            <div className="sidebar-section">
              <h4>Seating Capacity</h4>
              {SEAT_FILTERS.map((f) => (
                <label key={f} className="filter-item">
                  <input type="checkbox" checked={seatFilter.includes(f)} onChange={() => toggle(seatFilter, f, setSeatFilter)} />
                  {f}
                </label>
              ))}
            </div>

            <div className="sidebar-section">
              <h4>Choose Sizes</h4>
              {SIZE_FILTERS.map((f) => (
                <label key={f} className="filter-item">
                  <input type="checkbox" checked={sizeFilter.includes(f)} onChange={() => toggle(sizeFilter, f, setSizeFilter)} />
                  {f}
                </label>
              ))}
            </div>

            <div className="sidebar-section">
              <h4>Spas By Type</h4>
              {TYPE_FILTERS.map((f) => (
                <label key={f} className="filter-item">
                  <input type="checkbox" checked={typeFilter.includes(f)} onChange={() => toggle(typeFilter, f, setTypeFilter)} />
                  {f}
                </label>
              ))}
            </div>

            <div className="sidebar-section">
              <h4>Price Range From</h4>
              {PRICE_FILTERS.map((f) => (
                <label key={f.label} className="filter-item">
                  <input type="checkbox" checked={priceFilter.includes(f.label)} onChange={() => toggle(priceFilter, f.label, setPriceFilter)} />
                  {f.label}
                </label>
              ))}
            </div>

            {(seatFilter.length || sizeFilter.length || typeFilter.length || priceFilter.length) ? (
              <div className="sidebar-section">
                <button className="btn-red" style={{ width: "100%", fontSize: "12px" }}
                  onClick={() => { setSeatFilter([]); setSizeFilter([]); setTypeFilter([]); setPriceFilter([]); }}>
                  ✕ Clear All Filters
                </button>
              </div>
            ) : null}
          </aside>

          {/* Products Grid */}
          <div>
            {/* Sort bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", background: "#f9f9f9", padding: "10px 16px", borderRadius: "4px", border: "1px solid #e0e0e0" }}>
              <span style={{ fontSize: "13px", color: "#555" }}>
                <strong>{filtered.length}</strong> item{filtered.length !== 1 ? "s" : ""} found
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <label style={{ fontSize: "13px", color: "#555" }}>Sort by:</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)}
                  style={{ border: "1px solid #ccc", padding: "6px 10px", fontSize: "13px", borderRadius: "3px", outline: "none" }}>
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name A-Z</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#999" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                <p style={{ fontSize: "16px" }}>No products match your filters.</p>
                <button className="btn-red" style={{ marginTop: "16px" }}
                  onClick={() => { setSeatFilter([]); setSizeFilter([]); setTypeFilter([]); setPriceFilter([]); }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                {filtered.map((p) => (
                  <div key={p.id} className="product-card">
                    <div style={{
                      height: "150px", background: "linear-gradient(135deg, #1a1a2e, #2d4a7a)",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <span style={{ fontSize: "60px" }}>🛁</span>
                    </div>
                    <div className="product-card-body">
                      <h3>{p.name}</h3>
                      <div className="product-price">${p.price.toFixed(2)}</div>
                      <p className="product-desc">{p.description.slice(0, 80)}...</p>
                      <div className="product-actions">
                        <Link href={`/products/${p.id}`}>
                          <button className="btn-red" style={{ fontSize: "11px", padding: "5px 10px" }}>🛒 ADD TO CART</button>
                        </Link>
                      </div>
                      <div className="product-links">
                        <Link href="/wishlist">ADD TO WISH LIST</Link>
                        <Link href={`/products/${p.id}`}>MORE DETAILS</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Customers Also Viewed */}
            <div style={{ marginTop: "48px", borderTop: "2px solid #e0e0e0", paddingTop: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a2e", marginBottom: "20px" }}>
                Customers Who Viewed This Item Also
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "16px" }}>
                {products.slice(0, 4).map((p) => (
                  <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
                    <div style={{ border: "1px solid #e0e0e0", borderRadius: "4px", padding: "12px", textAlign: "center", transition: "box-shadow 0.2s" }}>
                      <div style={{ fontSize: "36px", marginBottom: "8px" }}>🛁</div>
                      <p style={{ fontSize: "11px", color: "#333", fontWeight: "600", marginBottom: "4px" }}>{p.name}</p>
                      <p style={{ fontSize: "13px", color: "#cc0000", fontWeight: "700" }}>${p.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
