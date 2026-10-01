"use client";

import { useEffect } from "react";
import { useVariantStore } from "@/store/variants";

export type SwatchColor = {
  id: string;
  name: string;
  hexCode: string;
};

type Props = {
  productId: string;
  colors: SwatchColor[];
  initialIndex?: number;
};

const ColorSwatches = ({ productId, colors, initialIndex = 0 }: Props) => {
  const selectedIndex = useVariantStore((s) => s.getSelected(productId, initialIndex));
  const setSelected = useVariantStore((s) => s.setSelected);

  useEffect(() => {
    if (useVariantStore.getState().selectedByProduct[productId] === undefined) {
      setSelected(productId, initialIndex);
    }
  }, [productId, initialIndex, setSelected]);

  if (!colors.length) return null;

  const selected = colors[selectedIndex] ?? colors[0];

  return (
    <div className="flex flex-col gap-2">
      <p className="text-body-medium text-dark-900">
        Color: {selected?.name}
      </p>
      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => {
          const isSelected = index === selectedIndex;
          return (
            <button
              key={color.id}
              type="button"
              aria-label={color.name}
              aria-pressed={isSelected}
              onClick={() => setSelected(productId, index)}
              className={`h-6 w-6 rounded-full border ${
                isSelected ? "ring-2 ring-dark-900 ring-offset-2" : "border-light-300"
              }`}
              style={{ backgroundColor: color.hexCode }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorSwatches;