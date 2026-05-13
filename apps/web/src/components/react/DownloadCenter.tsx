import { useMemo, useState } from "react";

type DownloadItem = {
  id: string;
  title: string;
  category: string;
  format: string;
  market: string;
  description: string;
};

type Props = {
  downloads: DownloadItem[];
};

export default function DownloadCenter({ downloads }: Props) {
  const [category, setCategory] = useState("All");
  const [market, setMarket] = useState("All");
  const [query, setQuery] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [downloaded, setDownloaded] = useState("");

  const categories = ["All", ...Array.from(new Set(downloads.map((item) => item.category)))];
  const markets = ["All", ...Array.from(new Set(downloads.map((item) => item.market)))];

  const filtered = useMemo(
    () =>
      downloads.filter((item) => {
        const categoryMatch = category === "All" || item.category === category;
        const marketMatch = market === "All" || item.market === market;
        const q = query.trim().toLowerCase();
        const queryMatch = !q || `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(q);
        return categoryMatch && marketMatch && queryMatch;
      }),
    [downloads, category, market, query]
  );

  function unlock() {
    if (!leadEmail.includes("@")) return;
    setUnlocked(true);
    const history = JSON.parse(window.localStorage.getItem("titanlaserDownloadLeads") || "[]");
    window.localStorage.setItem("titanlaserDownloadLeads", JSON.stringify([{ email: leadEmail, at: new Date().toISOString() }, ...history].slice(0, 20)));
  }

  function simulateDownload(item: DownloadItem) {
    setDownloaded(item.title);
    const history = JSON.parse(window.localStorage.getItem("titanlaserDownloadEvents") || "[]");
    window.localStorage.setItem("titanlaserDownloadEvents", JSON.stringify([{ id: item.id, title: item.title, at: new Date().toISOString() }, ...history].slice(0, 30)));
  }

  return (
    <section className="interactive-grid" aria-label="Download center">
      <aside className="interactive-panel sticky">
        <h2>Find documents</h2>
        <div className="control-stack">
          <label>
            Search
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="CE, CAD, installation, 30 kW..." />
          </label>
          <label>
            Category
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Market
            <select value={market} onChange={(event) => setMarket(event.target.value)}>
              {markets.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          {!unlocked && (
            <>
              <label>
                Work email to unlock files
                <input type="email" value={leadEmail} onChange={(event) => setLeadEmail(event.target.value)} placeholder="buyer@company.com" />
              </label>
              <button className="button-lite primary" type="button" onClick={unlock}>
                Unlock downloads
              </button>
            </>
          )}
          {unlocked && <p className="notice">Downloads unlocked for this demo session.</p>}
        </div>
      </aside>

      <div className="download-results">
        <div className="notice">{filtered.length} document{filtered.length === 1 ? "" : "s"} matched</div>
        {filtered.map((item) => (
          <article className="interactive-card" key={item.id}>
            <p className="eyebrow">{item.category}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul className="pill-row">
              <li>{item.format}</li>
              <li>{item.market}</li>
            </ul>
            <button className="button-lite primary" type="button" disabled={!unlocked} onClick={() => simulateDownload(item)}>
              {unlocked ? "Download demo file" : "Unlock to download"}
            </button>
          </article>
        ))}
        {downloaded && <p className="notice">Demo download recorded: {downloaded}</p>}
      </div>
    </section>
  );
}
