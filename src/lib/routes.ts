/** Wallet required only when submitting predictions, claiming, or joining leaderboard — not for browsing. */
export const WALLET_ACTION_PATHS = ["/predict", "/leaderboard", "/pulse"] as const;

export function isWalletActionPath(pathname: string): boolean {
  return WALLET_ACTION_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}