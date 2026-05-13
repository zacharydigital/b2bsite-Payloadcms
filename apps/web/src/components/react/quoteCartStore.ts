export type QuoteCartItem = {
  slug: string;
  model: string;
  title: string;
  powerKw: number;
  quantity: number;
  notes?: string;
};

const CART_KEY = "titanlaserQuoteCart";

export function readQuoteCart(): QuoteCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as QuoteCartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeQuoteCart(items: QuoteCartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("titanlaser:quote-cart-updated", { detail: items }));
}

export function addQuoteItem(item: Omit<QuoteCartItem, "quantity"> & { quantity?: number }) {
  const items = readQuoteCart();
  const existing = items.find((entry) => entry.slug === item.slug);
  if (existing) {
    existing.quantity += item.quantity || 1;
  } else {
    items.push({ ...item, quantity: item.quantity || 1 });
  }
  writeQuoteCart(items);
  return items;
}
