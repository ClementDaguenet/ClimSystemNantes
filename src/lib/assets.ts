export const OFFICIAL_LOGO_PATH = "/logo.png";
export const OFFICIAL_LOGO_SRC = OFFICIAL_LOGO_PATH;

export const OFFICIAL_LOGO_WIDTH = 1024;
export const OFFICIAL_LOGO_HEIGHT = 237;
export const OFFICIAL_LOGO_ASPECT =
  OFFICIAL_LOGO_WIDTH / OFFICIAL_LOGO_HEIGHT;

export const LOGO_WHITE_PATH = "/logo_white.png";
export const LOGO_WHITE_SRC = LOGO_WHITE_PATH;

export function officialLogoAbsoluteUrl(siteUrl: string): string {
  const base = `${siteUrl.replace(/\/+$/, "")}/`;
  return new URL(OFFICIAL_LOGO_PATH.replace(/^\//, ""), base).href;
}
