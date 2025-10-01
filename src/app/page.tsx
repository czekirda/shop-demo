export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">Shop Demo</h1>
      <p className="text-lg text-gray-600 mb-8">
        A modern storefront powered by Next.js + Supabase
      </p>
      <a
        href="/products"
        className="px-6 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-800 transition"
      >
        Browse Products
      </a>
    </main>
  )
}