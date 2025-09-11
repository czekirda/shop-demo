import { supabase } from '../../../lib/supabaseClient' // or '../../lib/supabaseClient' adjusted for depth

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
    <main className="p-6 max-w-3xl mx-auto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.image_url ?? '/placeholder.png'} alt={product.name} className="w-full h-80 object-cover rounded-2xl"/>
      <h1 className="mt-6 text-2xl font-bold">{product.name}</h1>
      <div className="text-lg mt-1 font-semibold">€{(product.price/100).toFixed(2)}</div>
      <p className="mt-4 text-gray-700 whitespace-pre-line">
        {product.long_description ?? product.short_description}
      </p>
    </main>
  )
}
