
import { getAllProducts } from '@/lib/actions/products'
import { parseFilterParams } from '@/lib/utils/query'

const ProductsPage = async ({searchParams}: {searchParams: Promise<Record<string, string | string[] | undefined>>}) => {
    const sp = await searchParams

    const parsed = await parseFilterParams(sp)

    const {products} = await getAllProducts(parsed)
    console.log(products)
  return (
    <div>

    </div>
  )
}

export default ProductsPage