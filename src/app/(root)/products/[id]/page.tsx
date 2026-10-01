import CollapsibleSection from "@/components/CollapsibleSection"
import ColorSwatches from "@/components/ColorSwatches"
import ProductGallery from "@/components/ProductGallery"
import ProductNotFound from "@/components/ProductNotFound"
import SizePicker from "@/components/SizePicker"
import { getProduct } from "@/lib/actions/products"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export type GalleryVariants = {
  color: string,
  images: string[]
}

function formatPrice(price: number | undefined | null) {
  if(price === null || price === undefined) return undefined
  return `$${price.toFixed(2)}`
}

const ProductDetailsPage = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params
    const data = await getProduct(id)

      if (!data) {
        return (
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="py-4 text-caption text-dark-700">
              <Link href="/" className="hover:underline">Home</Link> / <Link href="/products" className="hover:underline">Products</Link> /{" "}
              <span className="text-dark-900">Not found</span>
            </nav>
            <ProductNotFound />
          </main>
        );
      }

    const {product, variants, images} = data
    console.log(product)
    console.log(variants)
    console.log(images)
    
    const uniqueColors = Array.from(
      new Map(
        variants
          .filter((v) => v.color)
          .map((v) => [v.color!.id, { id: v.color!.id, name: v.color!.name, hexCode: v.color!.hexCode }])
      ).values()
    );
    
    const galleryVariants: GalleryVariants[] = uniqueColors
      .map((color) => {
        const colorVariantIds = new Set(variants.filter((v) => v.colorId === color.id).map((v) => v.id));
        const imgs = images.filter((img) => img.variantId && colorVariantIds.has(img.variantId)).map((img) => img.url);
        const fallback = images
          .filter((img) => img.variantId === null)
          .sort((a, b) => {
            if (a.isPrimary && !b.isPrimary) return -1;
            if (!a.isPrimary && b.isPrimary) return 1;
            return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
          })
          .map((img) => img.url);
        return { color: color.name, images: imgs.length ? imgs : fallback };
      })
      .filter((gv) => gv.images.length > 0);
    
    const defaultVariant = variants.find((v) => v.id === product.defaultVariantId) ?? variants[0];
    const initialColorIndex = Math.max(
      0,
      uniqueColors.findIndex((c) => c.id === defaultVariant?.colorId)
    );

  const subtitle = product.gender?.label ? `${product.gender?.label} Shoes` : undefined

  const basePrice = defaultVariant ? Number(defaultVariant.price) : null
  const salePrice = defaultVariant?.salePrice ? Number(defaultVariant.salePrice) : null

  const displayPrice = salePrice !== null && !Number.isNaN(salePrice) ? salePrice : basePrice
  const comparedAt = salePrice !== null && !Number.isNaN(salePrice) ? basePrice : null

  const discount = comparedAt && displayPrice && comparedAt > displayPrice ? Math.round(((comparedAt - displayPrice) / comparedAt) * 100) : null

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="py-4 text-caption text-dark-700">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/products" className="hover:underline">Products</Link> /{" "}
        <span className="text-dark-900">{product.name}</span>
      </nav>

      <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_480px]">
        {galleryVariants.length > 0 && (
            <ProductGallery
            productId={product.id}
            variants={galleryVariants}
            initialVariantIndex={initialColorIndex}
            className="lg:sticky lg:top-6" 
          />
        )}
        
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <h1 className="text-heading-2 text-dark-900">{product.name}</h1>
              {subtitle && <p className="text-body text-dark-700">{subtitle}</p> }
          </header>

          {/**Price */}
          <div className="flex items-center gap-3">
            <p className="text-lead text-dark-900">
              {formatPrice(displayPrice)}
            </p>
            {comparedAt && (
              <>
              <span className="text-body text-dark-700 line-through">
                {formatPrice(comparedAt)}
              </span>
              {discount !== null && (
                <span className="rounded-full border border-light-300 px-2 py-1 text-caption text-green-500">
                  {discount}% Off
                </span>
              )}
              </>
            )}
          </div>

       
        <ColorSwatches productId={product.id} colors={uniqueColors} initialIndex={initialColorIndex} />
        <SizePicker productId={product.id} colors={uniqueColors} variants={variants} initialIndex={initialColorIndex} />


            {/**Action Buttons */}
            <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 rounded-full bg-dark-900 px-6 py-4 text-body-medium text-light-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-500">
                <ShoppingBag  className="w-5 h-5" />
                Add to Bag
              </button> 
              <button className="flex items-center justify-center gap-2 rounded-full border border-light-300 px-6 py-4 text-body-medium text-dark-900 transition hover:border-dark-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]">
              <Heart className="w-5 h-5" />
                Favorite
              </button>
            </div>


            <CollapsibleSection title="Product Details" defaultOpen>
              <p>{product.description}</p>
            </CollapsibleSection>

            <CollapsibleSection title="Shipping & Returns">
            <p>Free standard shipping and free 30-day returns for Nike Members.</p>
          </CollapsibleSection>


        </div>
      </section>


    </main>
  )
}

export default ProductDetailsPage