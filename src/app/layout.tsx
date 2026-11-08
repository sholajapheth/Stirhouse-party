import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextGen Christmas 2026 · Wonderfest & Teens Ball",
  description: "Harvesters NextGen Gbagada Christmas 2026: Wonderfest for Kidzzone children on 12 December at 10am, and the Teens Christmas Ball for Stirhouse.",
};
export const viewport: Viewport = { themeColor: "#0a0e2e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
