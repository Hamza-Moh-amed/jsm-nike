export type NormalizedProductFilters = {
    search?: string;
    genderSlugs: string[];
    sizeSlugs: string[];
    colorSlugs: string[];
    brandSlugs: string[];
    categorySlugs: string[];
    priceMin?: number;
    priceMax?: number;
    priceRanges: Array<[number | undefined, number | undefined]>;
    sort: "featured" | "newest" | "price_asc" | "price_desc";
    page: number;
    limit: number;
};


export function parseFilterParams(sp: Record<string, string | string[] | undefined>): NormalizedProductFilters {
    const getArr = (k: string) => {
      const v1 = sp[k];
      const v2 = sp[`${k}[]`];
      const arr1 = Array.isArray(v1) ? v1.map(String) : v1 === undefined ? [] : [String(v1)];
      const arr2 = Array.isArray(v2) ? (v2 as string[]).map(String) : v2 === undefined ? [] : [String(v2 as string)];
      return [...arr1, ...arr2];
    };
    const getStr = (k: string) => {
      const v = sp[k] ?? sp[`${k}[]`];
      if (v === undefined) return undefined;
      return Array.isArray(v) ? (v[0] ? String(v[0]) : undefined) : String(v);
    };
  
    const search = getStr("search")?.trim() || undefined;
  
    const genderSlugs = getArr("gender").map((s) => s.toLowerCase());
    const sizeSlugs = getArr("size").map((s) => s.toLowerCase());
    const colorSlugs = getArr("color").map((s) => s.toLowerCase());
    const brandSlugs = getArr("brand").map((s) => s.toLowerCase());
    const categorySlugs = getArr("category").map((s) => s.toLowerCase());
  
    const priceRangesStr = getArr("price");
    const priceRanges: Array<[number | undefined, number | undefined]> = priceRangesStr
      .map((r) => {
        const [minStr, maxStr] = String(r).split("-");
        const min = minStr ? Number(minStr) : undefined;
        const max = maxStr ? Number(maxStr) : undefined;
        return [Number.isNaN(min as number) ? undefined : min, Number.isNaN(max as number) ? undefined : max] as [
          number | undefined,
          number | undefined
        ];
      })
      .filter(() => true);
  
    const priceMin = getStr("priceMin") ? Number(getStr("priceMin")) : undefined;
    const priceMax = getStr("priceMax") ? Number(getStr("priceMax")) : undefined;
  
    const sortParam = getStr("sort");
    const sort: NormalizedProductFilters["sort"] =
      sortParam === "price_asc" || sortParam === "price_desc" || sortParam === "newest" || sortParam === "featured"
        ? sortParam
        : "newest";
  
    const page = Math.max(1, Number(getStr("page") ?? 1) || 1);
    const limitRaw = Number(getStr("limit") ?? 24) || 24;
    const limit = Math.max(1, Math.min(limitRaw, 60));
  
    return {
      search,
      genderSlugs,
      sizeSlugs,
      colorSlugs,
      brandSlugs,
      categorySlugs,
      priceMin: priceMin !== undefined && !Number.isNaN(priceMin) ? priceMin : undefined,
      priceMax: priceMax !== undefined && !Number.isNaN(priceMax) ? priceMax : undefined,
      priceRanges,
      sort,
      page,
      limit,
    };
}