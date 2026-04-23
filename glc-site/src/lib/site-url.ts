export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://groundlevelcontracting.com";
  return raw.replace(/\/$/, "");
}

/** Origin only (no trailing slash), for joining paths. */
export function getSiteOrigin(): string {
  return getSiteUrl().replace(/\/$/, "");
}
