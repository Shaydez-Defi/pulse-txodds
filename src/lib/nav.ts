export type NavItem = {
  href: string;
  label: string;
  mobileLabel?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", mobileLabel: "Home" },
  { href: "/matches", label: "Matches", mobileLabel: "Matches" },
  { href: "/predict", label: "Prediction League", mobileLabel: "Predict" },
  { href: "/leaderboard", label: "Leaderboard", mobileLabel: "Board" },
  { href: "/trophy-cabinet", label: "Trophy Cabinet", mobileLabel: "Trophies" },
  { href: "/nft-match-cards", label: "NFT Match Cards", mobileLabel: "NFTs" },
  { href: "/notifications", label: "Notifications", mobileLabel: "Alerts" },
  { href: "/pulse", label: "My Pulse", mobileLabel: "Profile" },
  { href: "/settings", label: "Settings", mobileLabel: "Settings" },
];

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}