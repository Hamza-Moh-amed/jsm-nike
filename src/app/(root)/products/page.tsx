
import ActiveBadges from '@/components/ActiveBadges'
import Filters from '@/components/Filters'
import ProductCard from '@/components/ProductCard'
import Sort from '@/components/Sort'
import { getAllProducts } from '@/lib/actions/products'
import { parseFilterParams } from '@/lib/utils/query'

const ProductsPage = async ({searchParams}: {searchParams: Promise<Record<string, string | string[] | undefined>>}) => {

    const sp = await searchParams
    const parsed = parseFilterParams(sp)

    const {products, totalCount} = await getAllProducts(parsed)
    console.log(products)
  

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className='flex items-center justify-between py-6'>
        <h1 className='text-heading-3 text-dark-900'>Products: {totalCount}</h1>
        <Sort />
      </header>

      <ActiveBadges sp={sp} />

    <section className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      <Filters />
      <div>
        {products.length  === 0 ? (
          <div className='rounded-lg border border-light-300 p-8 text-center'>
            <p className='text-body text-dark-700'>No Avalible Products</p>
          </div>
            )
          : (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols2 lg:grid-cols-3 pb-6'>
              {products.map((product) => (
                  <ProductCard key={product.id} product={product} className="mt-1" />
                )
              )}
            </div>
        )}
      </div>
    </section>


  </main>
  )
}

export default ProductsPage