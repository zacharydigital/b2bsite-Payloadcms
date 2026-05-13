export function canonical(siteUrl: string, pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value, (_key, val) => (val === undefined ? undefined : val)).replace(/</g, "\\u003c");
}
