const TEAM_CODES: Record<string, string> = {
  Netherlands: "NED",
  Morocco: "MAR",
  USA: "USA",
  "Bosnia & Herzegovina": "BIH",
  "Ivory Coast": "CIV",
  Norway: "NOR",
  Argentina: "ARG",
  "Cape Verde": "CPV",
  France: "FRA",
  Sweden: "SWE",
  Australia: "AUS",
  Egypt: "EGY",
  Colombia: "COL",
  Ghana: "GHA",
  Belgium: "BEL",
  Senegal: "SEN",
  Spain: "ESP",
  Austria: "AUT",
  Switzerland: "SUI",
  Algeria: "ALG",
  Mexico: "MEX",
  Ecuador: "ECU",
  Portugal: "POR",
  Croatia: "CRO",
  England: "ENG",
  "Congo DR": "COD",
  Brazil: "BRA",
  Germany: "GER",
  Japan: "JPN",
  Vietnam: "VIE",
  Myanmar: "MYA",
};

export function teamCode(name: string): string {
  if (TEAM_CODES[name]) return TEAM_CODES[name];
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return words
      .slice(0, 3)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }
  return name.slice(0, 3).toUpperCase();
}