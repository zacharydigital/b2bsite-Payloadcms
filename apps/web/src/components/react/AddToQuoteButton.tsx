import { useState } from "react";
import { addQuoteItem } from "./quoteCartStore";

type Props = {
  product: {
    slug: string;
    model: string;
    title: string;
    powerKw: number;
  };
  label?: string;
};

export default function AddToQuoteButton({ product, label = "Add to quote cart" }: Props) {
  const [added, setAdded] = useState(false);

  return (
    <button
      className="button-lite primary"
      type="button"
      onClick={() => {
        addQuoteItem(product);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1800);
      }}
    >
      {added ? "Added to quote cart" : label}
    </button>
  );
}
