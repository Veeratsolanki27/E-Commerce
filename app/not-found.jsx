import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800">404 - Page Not Found</h2>
      <p className="text-gray-500">Could not find requested resource</p>
      <Link
        href="/"
        className="px-6 py-2 bg-orange-600 text-white rounded font-medium hover:bg-orange-700 transition text-sm shadow"
      >
        Return Home
      </Link>
    </div>
  )
}
