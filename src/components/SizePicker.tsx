"use client";

import { useEffect, useMemo } from "react";
import { useVariantStore } from "@/store/variants";
import type { FullProduct } from "@/lib/actions/products";
import type { SwatchColor } from "./ColorSwatches";

type Variant = FullProduct["variants"][number];

type Props = {
  productId: string;
  colors: SwatchColor[];
  variants: Variant[];
  initialIndex?: number;
};

const SizePicker = ({ productId, colors, variants, initialIndex = 0 }: Props) => {
  const colorIndex = useVariantStore((s) => s.getSelected(productId, initialIndex));
  const selectedSizeId = useVariantStore((s) => s.getSelectedSize(productId));
  const setSelectedSize = useVariantStore((s) => s.setSelectedSize);

  const selectedColor = colors[colorIndex] ?? colors[0];

  const sizes = useMemo(() => {
    if (!selectedColor) return [];

    const map = new Map<string, { id: string; name: string; sortOrder: number; inStock: number }>();

    for (const v of variants) {
      if (v.colorId !== selectedColor.id || !v.size) continue;
      const current = map.get(v.size.id);
      const inStock = v.inStock ?? 0;
      if (!current) {
        map.set(v.size.id, {
          id: v.size.id,
          name: v.size.name,
          sortOrder: v.size.sortOrder,
          inStock,
        });
      }
    }

    return Array.from(map.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }, [variants, selectedColor]);

  useEffect(() => {
    if (!sizes.length) return;
    const stillValid = sizes.some((s) => s.id === selectedSizeId && s.inStock > 0);
    if (!stillValid) {
      const firstInStock = sizes.find((s) => s.inStock > 0);
      if (firstInStock) setSelectedSize(productId, firstInStock.id);
    }
  }, [productId, sizes, selectedSizeId, setSelectedSize]);

  if (!sizes.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-body-medium text-dark-900">Select Size</p>
      <div className="grid grid-cols-5 gap-2">
        {sizes.map((size) => {
          const isSelected = size.id === selectedSizeId;
          const disabled = size.inStock <= 0;
          return (
            <button
              key={size.id}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              onClick={() => setSelectedSize(productId, size.id)}
              className={`rounded-lg border px-2 py-1 text-body ${
                isSelected ? "border-dark-900 bg-dark-900 text-light-100" : "border-light-300"
              } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
            >
              {size.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizePicker;