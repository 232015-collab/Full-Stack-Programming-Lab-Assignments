import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HotSpring Spas - Premium Hot Tubs & Spa Products",
  description: "Discover the world's best-selling hot tubs. HotSpring Spas offers premium quality hot tubs, portable spas, and swim spas for relaxation and wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
