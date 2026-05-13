import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Link from "next/link";
import { products } from "../../../data/products";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
        <div className="breadcrumb">
          <Link href="/">Home</Link><span>›</span>
          <Link href="/products">Products</Link><span>›</span>
          <span>{product.name}</span>
        </div>

        {/* Product Detail */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start", marginBottom: "50px" }}>
          {/* Image */}
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e, #2d4a7a)",
            borderRadius: "12px", padding: "60px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
          }}>
            <span style={{ fontSize: "120px" }}>🛁</span>
          </div>

          {/* Info */}
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#1a1a2e", marginBottom: "12px" }}>
              {product.name}
            </h1>
            <div style={{ fontSize: "32px", fontWeight: "900", color: "#cc0000", marginBottom: "16px" }}>
              ${product.price.toFixed(2)}
            </div>

            <div style={{ background: "#f9f9f9", borderRadius: "6px", padding: "16px", marginBottom: "20px" }}>
              {[
                { label: "Category", val: product.category },
                { label: "Seating", val: product.seats },
                { label: "Size", val: product.size },
                { label: "Type", val: product.type },
                { label: "In Stock", val: product.inStock ? "✅ Yes" : "❌ No" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #e0e0e0", fontSize: "13px" }}>
                  <span style={{ color: "#666", fontWeight: "600" }}>{row.label}:</span>
                  <span style={{ color: "#333" }}>{row.val}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.8", marginBottom: "24px" }}>
              {product.description}
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
              <Link href="/cart">
                <button className="btn-red" style={{ padding: "12px 24px", fontSize: "14px" }}>🛒 ADD TO CART</button>
              </Link>
              <button className="btn-dark" style={{ padding: "12px 24px", fontSize: "14px" }}>❤️ WISH LIST</button>
            </div>

            <Link href="/checkout" style={{ display: "block" }}>
              <button style={{
                background: "#28a745", color: "white", border: "none",
                padding: "12px 24px", fontSize: "14px", fontWeight: "700",
                cursor: "pointer", borderRadius: "3px", width: "100%"
              }}>
                ⚡ BUY NOW — SECURE CHECKOUT
              </button>
            </Link>
          </div>
        </div>

        {/* Related Products */}
        <div style={{ borderTop: "2px solid #e0e0e0", paddingTop: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1a1a2e", marginBottom: "20px" }}>
            Related Products
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {related.map((p) => (
              <div key={p.id} className="product-card">
                <div style={{ height: "120px", background: "linear-gradient(135deg, #1a1a2e, #2d4a7a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "48px" }}>🛁</span>
                </div>
                <div className="product-card-body">
                  <h3>{p.name}</h3>
                  <div className="product-price">${p.price.toFixed(2)}</div>
                  <Link href={`/products/${p.id}`}>
                    <button className="btn-red" style={{ fontSize: "11px", padding: "5px 10px", width: "100%" }}>View Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
