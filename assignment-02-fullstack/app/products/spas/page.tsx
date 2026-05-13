import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { products } from "../../data/products";

export const metadata = {
  title: "Hot Tub Spas - HotSpring",
  description: "Browse all hot tub spa models at HotSpring.",
};

export default function SpasPage() {
  const spas = products.filter((p) => p.category.toLowerCase().includes("spa") || p.type.toLowerCase().includes("spa"));

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
        <div className="breadcrumb">
          <Link href="/">Home</Link><span>›</span>
          <Link href="/products">Products</Link><span>›</span>
          <span>Spas</span>
        </div>
        <h1 className="page-header">All Spas</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <div style={{ height: "160px", background: "linear-gradient(135deg, #1a1a2e, #2d4a7a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "64px" }}>🛁</span>
              </div>
              <div className="product-card-body">
                <h3>{p.name}</h3>
                <div className="product-price">${p.price.toFixed(2)}</div>
                <p className="product-desc">{p.description.slice(0, 80)}...</p>
                <div className="product-actions">
                  <Link href={`/products/${p.id}`}>
                    <button className="btn-red" style={{ fontSize: "11px", padding: "5px 10px" }}>🛒 ADD TO CART</button>
                  </Link>
                  <Link href={`/products/${p.id}`}>
                    <button className="btn-dark" style={{ fontSize: "11px", padding: "5px 10px" }}>Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
