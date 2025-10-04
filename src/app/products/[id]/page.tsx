import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

type Props = { params: { id: string } }

export default async function ProductDetail({ params }: Props) {
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) return <div className="p-6">Error: {error.message}</div>
  if (!product) return <div className="p-6">Not found.</div>

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image_url ?? '/placeholder.png'}
          alt={product.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold mt-2 text-gray-800">
            €{(product.price / 100).toFixed(2)}
          </p>
          <p className="mt-4 text-gray-700 whitespace-pre-line">
            {product.long_description ?? product.short_description}
          </p>
          <Link
            href="/products"
            className="inline-block mt-6 px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </main>
  )
}
