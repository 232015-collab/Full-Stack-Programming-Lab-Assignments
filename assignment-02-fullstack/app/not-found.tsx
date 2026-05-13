import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ textAlign: "center", padding: "100px 20px" }}>
        <div style={{ fontSize: "80px", marginBottom: "20px" }}>🛁</div>
        <h1 style={{ fontSize: "72px", fontWeight: "900", color: "#cc0000", marginBottom: "8px" }}>404</h1>
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a2e", marginBottom: "12px" }}>Page Not Found</h2>
        <p style={{ fontSize: "15px", color: "#666", marginBottom: "32px" }}>
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/"><button className="btn-red" style={{ padding: "12px 32px" }}>🏠 Go Home</button></Link>
          <Link href="/products"><button className="btn-dark" style={{ padding: "12px 32px" }}>Browse Products</button></Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
