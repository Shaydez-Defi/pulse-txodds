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
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pulse — The pulse of the game. Live.",
  description: "Premium editorial football intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${bebasNeue.variable} ${sora.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full overflow-x-hidden bg-base-offwhite text-text-light dark:bg-base-black dark:text-text-dark">
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}