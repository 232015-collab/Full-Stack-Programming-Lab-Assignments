import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Brand Logos Bar */}
      <div className="brand-bar">
        <div className="brand-logo">
          <span style={{ fontSize: "20px" }}>💰</span>
          <div>
            <div style={{ color: "#cc0000", fontSize: "13px", fontWeight: "900" }}>SAVE $1,000&apos;S</div>
            <div style={{ fontSize: "10px", color: "#666" }}>ON ALL SPA BRANDS</div>
          </div>
        </div>
        <div style={{ width: "1px", height: "40px", background: "#ccc" }} />
        <div className="brand-logo" style={{ color: "#0077aa" }}>
          <span style={{ fontSize: "22px" }}>🌊</span> OrganicSpa
        </div>
        <div className="brand-logo" style={{ color: "#cc6600" }}>
          <span style={{ fontSize: "22px" }}>🌿</span> CalderaSpa
        </div>
        <div className="brand-logo" style={{ color: "#006633" }}>
          <span style={{ fontSize: "22px" }}>🏝️</span> IslandSpas
        </div>
      </div>

      {/* Main Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h4>Contact Us</h4>
            <p style={{ fontSize: "13px", marginBottom: "8px" }}>
              info@hotspring.com<br />
              CALL 24/7: 555-321-8090
            </p>
            <Link href="/contact">Contact Form</Link>
            <Link href="/about">Our Locations</Link>
            <Link href="/about">Our Team</Link>
          </div>
          <div>
            <h4>Information</h4>
            <Link href="/about">About Us</Link>
            <Link href="/about">Customer Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/sitemap">Site Map</Link>
          </div>
          <div>
            <h4>My Account</h4>
            <Link href="/account">Login</Link>
            <Link href="/account/orders">My Orders</Link>
            <Link href="/account/wishlist">Wish List</Link>
            <Link href="/account/billing">Edit Billing</Link>
            <Link href="/account/shipping">Edit Shipping</Link>
          </div>
          <div>
            <h4>Sign Up For Newsletter</h4>
            <p style={{ fontSize: "12px", marginBottom: "8px" }}>Get exclusive deals and spa tips delivered to your inbox.</p>
            <div className="newsletter-input">
              <input type="email" placeholder="Your Email Address" />
              <button>GO</button>
            </div>
            <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
              <a href="#" style={{ color: "#4267B2", textDecoration: "none", fontSize: "20px" }}>f</a>
              <a href="#" style={{ color: "#1DA1F2", textDecoration: "none", fontSize: "20px" }}>t</a>
              <a href="#" style={{ color: "#E1306C", textDecoration: "none", fontSize: "20px" }}>📷</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} HotSpring Spas. All Rights Reserved. | Designed for Full Stack Programming Assignment No. 02</p>
        </div>
      </footer>
    </>
  );
}
