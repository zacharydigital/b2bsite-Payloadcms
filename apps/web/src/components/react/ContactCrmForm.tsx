import { useState } from "react";

type Draft = {
  name: string;
  company: string;
  email: string;
  country: string;
  channel: string;
  topic: string;
  message: string;
};

const initialDraft: Draft = {
  name: "",
  company: "",
  email: "",
  country: "",
  channel: "Email",
  topic: "Request a machine quote",
  message: ""
};

export default function ContactCrmForm() {
  const [draft, setDraft] = useState(initialDraft);
  const [crmId, setCrmId] = useState("");

  const canSubmit = Boolean(draft.name.trim() && draft.email.includes("@") && draft.message.trim());

  function submit() {
    if (!canSubmit) return;
    const id = `CRM-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
    const route =
      draft.topic.includes("service") || draft.topic.includes("Service")
        ? "After-sales service queue"
        : draft.topic.includes("Distributor")
          ? "Channel partner queue"
          : "Export sales engineering queue";
    const payload = { id, route, createdAt: new Date().toISOString(), draft };
    const history = JSON.parse(window.localStorage.getItem("titanlaserCrmSubmissions") || "[]");
    window.localStorage.setItem("titanlaserCrmSubmissions", JSON.stringify([payload, ...history].slice(0, 30)));
    setCrmId(`${id} routed to ${route}`);
  }

  return (
    <section className="interactive-grid" aria-label="Contact CRM form">
      <aside className="interactive-panel sticky">
        <h2>Global contact routing</h2>
        <div className="control-stack">
          <p><strong>Export sales:</strong> RFQ, pricing, distributor onboarding, market availability.</p>
          <p><strong>Application engineering:</strong> material, thickness, gas, cut sample, site readiness.</p>
          <p><strong>Service:</strong> installation, training, spare parts, warranty, remote diagnosis.</p>
          <p><strong>Compliance:</strong> privacy, certificates, audit documents, ESG, anti-bribery.</p>
        </div>
      </aside>

      <div className="interactive-panel">
        <h2>Send inquiry to CRM demo</h2>
        <div className="control-stack">
          <label>
            Name
            <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Maria Schneider" />
          </label>
          <label>
            Company
            <input value={draft.company} onChange={(event) => setDraft({ ...draft, company: event.target.value })} placeholder="Steel Fabrication GmbH" />
          </label>
          <label>
            Work email
            <input type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} placeholder="maria@company.com" />
          </label>
          <label>
            Country / market
            <input value={draft.country} onChange={(event) => setDraft({ ...draft, country: event.target.value })} placeholder="Germany" />
          </label>
          <label>
            Preferred channel
            <select value={draft.channel} onChange={(event) => setDraft({ ...draft, channel: event.target.value })}>
              <option>Email</option>
              <option>WhatsApp</option>
              <option>Teams meeting</option>
              <option>Distributor callback</option>
            </select>
          </label>
          <label>
            Topic
            <select value={draft.topic} onChange={(event) => setDraft({ ...draft, topic: event.target.value })}>
              <option>Request a machine quote</option>
              <option>Book application engineering review</option>
              <option>Distributor partnership</option>
              <option>After-sales service request</option>
              <option>Compliance or document request</option>
            </select>
          </label>
          <label>
            Message
            <textarea rows={6} value={draft.message} onChange={(event) => setDraft({ ...draft, message: event.target.value })} placeholder="Material, thickness, monthly output, delivery country, requested documents..." />
          </label>
          <button className="button-lite primary" type="button" disabled={!canSubmit} onClick={submit}>
            Create CRM contact record
          </button>
          {crmId && <div className="crm-id">{crmId}</div>}
        </div>
      </div>
    </section>
  );
}
