"use client";

import { create } from "zustand";

type State = {
  selectedByProduct: Record<string, number>;
  selectedSizeByProduct: Record<string, string>;
  setSelected: (productId: string, index: number) => void;
  getSelected: (productId: string, fallback?: number) => number;
  setSelectedSize: (productId: string, sizeId: string) => void;
  getSelectedSize: (productId: string) => string | undefined;
};

export const useVariantStore = create<State>((set, get) => ({
  selectedByProduct: {},
  selectedSizeByProduct: {},
  setSelected: (productId, index) =>
    set((s) => ({
      selectedByProduct: { ...s.selectedByProduct, [productId]: index },
    })),
  getSelected: (productId, fallback = 0) => {
    return get().selectedByProduct[productId] ?? fallback;
  },
  setSelectedSize: (productId, sizeId) =>
    set((s) => ({
      selectedSizeByProduct: { ...s.selectedSizeByProduct, [productId]: sizeId },
    })),
  getSelectedSize: (productId) => get().selectedSizeByProduct[productId],
}));