import { supabase } from '@/lib/supabaseClient'

export default async function DebugPage() {
  const { data, error } = await supabase
    .from('shop.products')
    .select('*')
    .limit(1)

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">Debug Supabase Connection</h1>
      <pre>{JSON.stringify({ data, error }, null, 2)}</pre>
    </main>
  )
}
