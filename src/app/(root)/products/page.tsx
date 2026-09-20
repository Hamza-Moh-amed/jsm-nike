
// import { getAllProducts } from '@/lib/actions/products'

const ProductsPage = async ({searchParams}: {searchParams: Promise<Record<string, string | string[] | undefined>>}) => {
    const sp = await searchParams
    console.log(sp)

    // const {products} = await getAllProducts()
  return (
    <div>

    </div>
  )
}

export default ProductsPage