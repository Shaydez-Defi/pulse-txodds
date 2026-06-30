export const PROTECTED_PREFIXES = [
  "/matches",
  "/match",
  "/predict",
  "/leaderboard",
  "/pulse",
];

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}