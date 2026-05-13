import { useState } from "react";
import { trackPdpEvent } from "./pdpTracking";

type DownloadItem = {
  title: string;
  type: "datasheet" | "catalog" | "installationGuide" | "compliancePack";
  pages: number;
  fileLabel: string;
  gateRequired: boolean;
};

type Props = {
  productModel: string;
  downloads: DownloadItem[];
};

export default function PdpDownloadsGateIsland({ productModel, downloads }: Props) {
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [downloaded, setDownloaded] = useState("");

  function unlock() {
    if (!email.includes("@")) return;
    setUnlocked(true);
    const history = JSON.parse(window.localStorage.getItem("titanlaserDownloadLeads") || "[]");
    window.localStorage.setItem("titanlaserDownloadLeads", JSON.stringify([{ email, productModel, at: new Date().toISOString() }, ...history].slice(0, 50)));
  }

  function download(item: DownloadItem) {
    setDownloaded(item.title);
    trackPdpEvent("datasheet_download", { productModel, title: item.title, type: item.type });
  }

  return (
    <section className="pdp-downloads" aria-label={`${productModel} downloads`}>
      <div className="pdp-download-gate">
        <div>
          <p className="eyebrow">Download center</p>
          <h2>Get technical files for internal approval</h2>
          <p>Enter a work email once to unlock datasheets, catalog, installation guide, and compliance pack for this demo session.</p>
        </div>
        <div className="control-stack">
          <label>
            Work email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="buyer@company.com" />
          </label>
          <button className="button-lite primary" type="button" onClick={unlock}>
            Unlock files
          </button>
        </div>
      </div>
      <div className="grid">
        {downloads.map((item) => (
          <article className="interactive-card" key={`${item.type}-${item.title}`}>
            <h3>{item.title}</h3>
            <p>{item.pages} pages · {item.fileLabel}</p>
            <button className="button-lite primary" type="button" disabled={item.gateRequired && !unlocked} onClick={() => download(item)}>
              {item.gateRequired && !unlocked ? "Unlock to download" : "Download →"}
            </button>
          </article>
        ))}
      </div>
      {downloaded && <p className="notice">Demo download recorded: {downloaded}</p>}
    </section>
  );
}
