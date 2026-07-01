import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { AppProviders } from "@/providers/app-providers";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pulse — Football Intelligence",
  description: "Live match intelligence powered by TxLINE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full" style={{ background: "#08090f" }}>
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div
            style={{
              position: "absolute",
              top: "-100px",
              left: "-100px",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "rgba(34, 197, 94, 0.06)",
              filter: "blur(120px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-100px",
              right: "-100px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "rgba(59, 130, 246, 0.05)",
              filter: "blur(120px)",
            }}
          />
        </div>
        <div className="relative z-10">
          <AppProviders>
            <AppShell>{children}</AppShell>
          </AppProviders>
        </div>
      </body>
    </html>
  );
}