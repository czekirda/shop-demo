import { supabase } from '../../lib/supabaseClient' 

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, price, image_url, short_description')
    .order('created_at', { ascending: false })

  if (error) return <div className="p-6">Error: {error.message}</div>
  if (!products?.length) return <div className="p-6">No products yet.</div>

  return (
    <main className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(p => (
        <a key={p.id} href={`/products/${p.id}`} className="border rounded-2xl p-4 hover:shadow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image_url ?? '/placeholder.png'} alt={p.name} className="w-full h-48 object-cover rounded-xl"/>
          <div className="mt-3 font-medium">{p.name}</div>
          <div className="text-sm text-gray-500">{p.short_description}</div>
          <div className="mt-2 font-semibold">€{(p.price/100).toFixed(2)}</div>
        </a>
      ))}
    </main>
  )
}