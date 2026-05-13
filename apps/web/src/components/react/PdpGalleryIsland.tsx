import { useEffect, useState } from "react";
import { trackPdpEvent } from "./pdpTracking";

type Media = {
  type: "image" | "video" | "360";
  url: string;
  alt: string;
  caption: string;
  priority?: boolean;
};

type Props = {
  productModel: string;
  media: Media[];
};

export default function PdpGalleryIsland({ productModel, media }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const active = media[activeIndex] || media[0];

  useEffect(() => {
    if (media.length) {
      trackPdpEvent("view_pdp", { productModel });
    }
  }, [media.length, productModel]);

  if (!active) return null;

  return (
    <section className="pdp-gallery" aria-label={`${productModel} product gallery`}>
      <button className="pdp-gallery-main" type="button" onClick={() => setLightboxOpen(true)}>
        <img src={active.url} alt={active.alt} loading={active.priority ? "eager" : "lazy"} />
        <span className="pdp-media-badge">{active.type === "360" ? "360 preview" : active.type}</span>
      </button>
      <p>{active.caption}</p>
      <div className="pdp-thumbs" role="list" aria-label="Gallery thumbnails">
        {media.map((item, index) => (
          <button
            type="button"
            className={index === activeIndex ? "active" : ""}
            key={`${item.url}-${index}`}
            onClick={() => {
              setActiveIndex(index);
              trackPdpEvent("gallery_interact", { productModel, mediaType: item.type, caption: item.caption });
            }}
          >
            <img src={item.url} alt={item.alt} loading="lazy" />
            <span>{item.type}</span>
          </button>
        ))}
      </div>
      {lightboxOpen && (
        <div className="pdp-lightbox" role="dialog" aria-modal="true" aria-label="Product media preview">
          <button type="button" className="pdp-lightbox-close" onClick={() => setLightboxOpen(false)}>
            Close
          </button>
          <img src={active.url} alt={active.alt} />
          <p>{active.caption}</p>
        </div>
      )}
    </section>
  );
}
