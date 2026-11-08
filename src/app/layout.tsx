import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ST★R LIGHT · A NextGen Christmas Experience",
  description: "Register for the Gbagada NextGen Christmas Experience, Saturday 20 December 2025.",
};
export const viewport: Viewport = { themeColor: "#0a0e2e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
