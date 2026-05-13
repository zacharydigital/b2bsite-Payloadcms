export type PdpEventName =
  | "view_pdp"
  | "gallery_interact"
  | "specs_expand"
  | "faq_click"
  | "datasheet_download"
  | "whatsapp_click"
  | "form_start"
  | "form_submit"
  | "scroll_50"
  | "scroll_90";

export function trackPdpEvent(name: PdpEventName, payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const entry = {
    name,
    payload,
    at: new Date().toISOString(),
    path: window.location.pathname
  };
  const history = JSON.parse(window.localStorage.getItem("titanlaserPdpEvents") || "[]");
  window.localStorage.setItem("titanlaserPdpEvents", JSON.stringify([entry, ...history].slice(0, 100)));
}
