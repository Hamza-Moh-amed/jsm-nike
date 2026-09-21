import Image from 'next/image';
import Link from 'next/link';


type ProductProps = {
    id: string,
    name:  string,
    imageUrl: string | null;
    minPrice: number | null,
    maxPrice:  number | null;
    subtitle?: string | null
}

export interface ProductCardProps {
    product: ProductProps
    description?: string
    className?: string
    meta?: string | string[]
}



const ProductCard = ({className,description,meta,  product: {id, name, imageUrl, minPrice, maxPrice, subtitle }}:  ProductCardProps) => {
    const price = 
        minPrice !== null && maxPrice !== null && maxPrice !== maxPrice
        ? `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`
        : minPrice !== null 
        ? minPrice 
        : undefined

    
    const displayPrice = price === undefined ? undefined : typeof price === "number" ? `$${price.toFixed(2)}` : price
    const content = (
        <article
        className={`group rounded-xl bg-light-100 ring-1 ring-light-300 transition-colors hover:ring-dark-500 ${className}`}
        >
            {imageUrl ? (
                <div className="relative aspect-square overflow-hidden rounded-t-xl bg-light-200">
        <Image
          src={imageUrl}
          alt={name ?? "Product Image"}
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div> 
            )
      : 
      <>
      </>
        }
            
      <div className='p-4'>
        <div className='mb-1 flex items-baseline justify-between gap-3'>
            <h3 className='text-xl font-medium text-dark-900'>{name}</h3>
            {displayPrice && <span className='text-body-medium text-dark-900'>{displayPrice}</span>}
        </div>
        {description && <p className='text-body text-dark-700'>{description}</p>}
        {subtitle && <p className='text-body text-dark-700'>{subtitle}</p>}
        {meta && (
          <p className="mt-1 text-caption text-dark-700">
            {Array.isArray(meta) ? meta.join(" • ") : meta}
          </p>
        )}
      </div>
        </article>
    )

  return (
    <Link
    href={`/products/${id}`}
    aria-label={name}
    className='block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500] '>
        {content}
    </Link>
  )
}

export default ProductCard