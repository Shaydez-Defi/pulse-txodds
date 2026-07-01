import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Sora, Space_Grotesk } from "next/font/google";
import { AppProviders } from "@/providers/app-providers";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pulse — Football Intelligence",
  description: "The pulse of the game. Live.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${bebasNeue.variable} ${sora.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg-base)] text-[var(--text-primary)]">
        <div className="pulse-ambient pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
          <div className="pulse-orb pulse-orb-violet" />
          <div className="pulse-orb pulse-orb-coral" />
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