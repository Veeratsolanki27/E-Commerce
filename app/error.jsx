'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
      <h2 className="text-xl font-bold text-gray-800">Something went wrong!</h2>
      <p className="text-sm text-gray-500 max-w-md">{error?.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-orange-600 text-white rounded font-medium hover:bg-orange-700 transition text-sm shadow"
      >
        Try again
      </button>
    </div>
  )
}
