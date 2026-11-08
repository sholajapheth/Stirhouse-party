import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextGen Wonderfest 2026 · Harvesters Gbagada",
  description: "Register your Kidzzone and Stirhouse children for the Harvesters NextGen Gbagada Christmas celebration, Wonderfest 2026, on 12 December at HICC Gbagada.",
};
export const viewport: Viewport = { themeColor: "#0a0e2e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
