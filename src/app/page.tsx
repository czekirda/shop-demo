import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default async function ProductsPage() {
  // 👇 Query the shop schema instead of public
  const { data: products, error } = await supabase
    .from('shop.products')
    .select('id, name, price, image_url, short_description')
    .order('created_at', { ascending: false })

  if (error) return <div className="p-6">Error: {error.message}</div>
  if (!products?.length) return <div className="p-6">No products yet.</div>

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="bg-white border rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image_url ?? '/placeholder.png'}
              alt={p.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="font-medium text-lg">{p.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{p.short_description}</p>
              <p className="mt-2 font-semibold text-gray-800">
                €{(p.price / 100).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
