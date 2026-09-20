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