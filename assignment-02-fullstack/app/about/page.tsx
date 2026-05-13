import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { teamMembers } from "../data/products";

export const metadata = {
  title: "About Us - HotSpring Spas",
  description: "Learn about HotSpring Spas company history, our team, and our commitment to premium quality hot tubs.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>About Us</span>
        </div>

        <h1 className="page-header">About Us</h1>

        {/* Company Info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center", marginBottom: "50px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#cc0000", marginBottom: "16px" }}>
              Welcome to Our Company
            </h2>
            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.8", marginBottom: "12px" }}>
              HotSpring Spas has been the world&apos;s leading manufacturer of premium hot tubs and portable spas for over four decades. Founded with a passion for wellness and relaxation, we have helped millions of families create their perfect backyard retreat.
            </p>
            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.8", marginBottom: "12px" }}>
              Our commitment to innovation, quality, and customer satisfaction has made us the #1 selling hot tub brand year after year. Every spa we manufacture is built with the finest materials and cutting-edge technology to ensure maximum comfort and durability.
            </p>
            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.8", marginBottom: "20px" }}>
              HotSpring is a division of Watkins Wellness, the largest manufacturer of residential hot tubs. Our extensive dealer network spans across North America and international markets, ensuring that quality service is always nearby.
            </p>
            <Link href="/contact">
              <button className="btn-red">Contact Us Today</button>
            </Link>
          </div>
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #2d4a7a 60%, #cc0000 100%)",
            borderRadius: "12px", padding: "60px 30px", textAlign: "center", color: "white"
          }}>
            <div style={{ fontSize: "60px", marginBottom: "16px" }}>🏆</div>
            <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "8px" }}>40+ Years</h3>
            <p style={{ fontSize: "14px", opacity: "0.85" }}>of Excellence in the Hot Tub Industry</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "24px" }}>
              {[
                { num: "1M+", label: "Happy Customers" },
                { num: "#1", label: "Selling Brand" },
                { num: "50+", label: "Countries" },
                { num: "24/7", label: "Support" },
              ].map((s) => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: "8px", padding: "12px" }}>
                  <div style={{ fontSize: "20px", fontWeight: "900" }}>{s.num}</div>
                  <div style={{ fontSize: "11px", opacity: "0.8" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div style={{ background: "#f9f9f9", borderRadius: "8px", padding: "40px", marginBottom: "50px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1a1a2e", marginBottom: "24px", textAlign: "center" }}>
            Our Core Values
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {[
              { icon: "💎", title: "Quality First", desc: "Every component is tested to exceed industry standards." },
              { icon: "🌱", title: "Sustainability", desc: "Energy-efficient designs that respect our environment." },
              { icon: "🤝", title: "Integrity", desc: "Honest pricing and transparent business practices." },
              { icon: "💡", title: "Innovation", desc: "Continuously improving technology for your comfort." },
            ].map((v) => (
              <div key={v.title} style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ fontSize: "36px", marginBottom: "10px" }}>{v.icon}</div>
                <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px" }}>{v.title}</h4>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet Our Team */}
        <div style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px" }}>
            Meet Our Team
          </h2>
          <p style={{ color: "#666", marginBottom: "28px", fontSize: "14px" }}>
            Dedicated professionals committed to your satisfaction
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
            {teamMembers.map((member) => (
              <div key={member.id} style={{
                textAlign: "center", background: "white",
                border: "1px solid #e0e0e0", borderRadius: "8px",
                padding: "24px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}>
                <div style={{
                  width: "80px", height: "80px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #1a1a2e, #cc0000)",
                  margin: "0 auto 14px", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "32px", color: "white"
                }}>
                  👤
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a2e", marginBottom: "6px" }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: "12px", color: "#cc0000", fontWeight: "600" }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
