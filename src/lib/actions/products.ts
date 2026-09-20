"use server"

import { eq, ilike, inArray, or, type SQL } from "drizzle-orm";
import { NormalizedProductFilters } from "../utils/query";
import { brands, categories, colors, genders, products, productVariants, sizes } from "../db/schema";
import { db } from "../db";

type ProductListItem = {
    id: string;
    name: string;
    imageUrl: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    createdAt: Date;
    subtitle?: string | null;
};
  
  export type GetAllProductsResult = {
    products: ProductListItem[];
    totalCount: number;
};

//TODO --> update the promise and return 
export async function getAllProducts(filters: NormalizedProductFilters): Promise<1> {

    const condos: SQL[] = [eq(products.isPublished, true)]


    if(filters.search) {
        const pattern = `%${filters.search}%`;
        condos.push(or(ilike(products.name, pattern), ilike(products.description, pattern))!)
    }

    if(filters.genderSlugs.length) {
        condos.push(inArray(genders.slug, filters.genderSlugs))
    }

    if(filters.brandSlugs.length) {
        condos.push(inArray(brands.slug, filters.brandSlugs))
    }

    if(filters.categorySlugs.length) {
        condos.push(inArray(categories.slug, filters.categorySlugs))
    }

    const hasSize = filters.sizeSlugs.length > 0
    const hasColor = filters.colorSlugs.length > 0
    const hasPrice = !!(filters.priceMin !== undefined || filters.priceMax !== undefined || filters.priceRanges.length)

    const variantConds: SQL[] = []

    if(hasSize) {
        variantConds.push(inArray(productVariants.sizeId, db.select({id: sizes.id}).from(sizes).where(inArray(sizes.slug, filters.sizeSlugs))))
    }

    if(hasColor) {
        variantConds.push(inArray(productVariants.colorId, db.select({id: colors.id}).from(colors).where(inArray(colors.slug, filters.colorSlugs))))
    }

    



    return 1
}