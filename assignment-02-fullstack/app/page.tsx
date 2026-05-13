import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { products } from "./data/products";

export const metadata = {
  title: "HotSpring Spas - World's Best Selling Hot Tubs",
  description: "Shop premium hot tubs and portable spas at HotSpring. Save thousands on top spa brands.",
};

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <>
      <Navbar />

      {/* Savings Banner */}
      <div className="savings-banner">
        🔥 YEAR-END SALE — SAVE UP TO $1,000 ON SELECT SPAS! Limited Time Offer.
      </div>

      {/* Hero Section */}
      <section className="hero">
        <h1>Experience True Relaxation</h1>
        <p>World&apos;s best-selling hot tubs — crafted for comfort, built to last.</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <Link href="/products">
            <button className="btn-red" style={{ padding: "14px 32px", fontSize: "15px" }}>
              🛁 Shop All Spas
            </button>
          </Link>
          <Link href="/about">
            <button className="btn-dark" style={{ padding: "14px 32px", fontSize: "15px" }}>
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: "#f9f9f9", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "28px", fontWeight: "800", color: "#1a1a2e", marginBottom: "10px" }}>
            Why Choose HotSpring?
          </h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "40px", fontSize: "15px" }}>
            Over 40 years of excellence in the hot tub industry
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {[
              { icon: "🏆", title: "Award Winning", desc: "Recognized as the world's #1 hot tub brand for 20+ consecutive years." },
              { icon: "⚡", title: "Energy Efficient", desc: "Our spas use up to 40% less energy than competing brands." },
              { icon: "🔧", title: "Expert Service", desc: "24/7 customer support and certified technicians nationwide." },
              { icon: "💎", title: "Premium Quality", desc: "Built with the finest materials for lasting durability and comfort." },
            ].map((f) => (
              <div key={f.title} style={{
                background: "white", borderRadius: "8px", padding: "28px 20px",
                textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                borderTop: "4px solid #cc0000", transition: "transform 0.2s"
              }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>{f.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#1a1a2e", marginBottom: "8px" }}>
          Featured Products
        </h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>Our most popular hot tubs and spas</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {featured.map((p) => (
            <div key={p.id} className="product-card">
              <div style={{
                height: "200px", background: "linear-gradient(135deg, #1a1a2e 0%, #2d4a7a 100%)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <span style={{ fontSize: "80px" }}>🛁</span>
              </div>
              <div className="product-card-body">
                <h3>{p.name}</h3>
                <div className="product-price">${p.price.toFixed(2)}</div>
                <p className="product-desc">{p.description}</p>
                <div className="product-actions">
                  <Link href={`/products/${p.id}`}>
                    <button className="btn-red" style={{ fontSize: "12px", padding: "6px 14px" }}>🛒 Add to Cart</button>
                  </Link>
                  <Link href={`/products/${p.id}`}>
                    <button className="btn-dark" style={{ fontSize: "12px", padding: "6px 14px" }}>Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link href="/products">
            <button className="btn-red" style={{ padding: "12px 36px", fontSize: "14px" }}>View All Products →</button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: "#1a1a2e", padding: "60px 20px", color: "white" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>What Our Customers Say</h2>
          <p style={{ textAlign: "center", color: "#aaa", marginBottom: "40px" }}>Trusted by thousands of happy families</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { name: "Robert K.", stars: 5, text: "Our HotSpring spa has been the best investment we ever made. The quality is outstanding!" },
              { name: "Jennifer M.", stars: 5, text: "Amazing customer service and the spa is perfect for our family. Highly recommended!" },
              { name: "David L.", stars: 5, text: "Energy efficient, easy to maintain, and absolutely relaxing. Worth every penny." },
            ].map((t) => (
              <div key={t.name} style={{
                background: "#16213e", borderRadius: "8px", padding: "24px",
                borderLeft: "4px solid #cc0000"
              }}>
                <div style={{ fontSize: "20px", marginBottom: "10px" }}>
                  {"⭐".repeat(t.stars)}
                </div>
                <p style={{ fontSize: "14px", color: "#ccc", lineHeight: "1.7", marginBottom: "12px" }}>
                  &quot;{t.text}&quot;
                </p>
                <p style={{ fontSize: "13px", fontWeight: "700", color: "white" }}>— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
