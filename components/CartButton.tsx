'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function CartButton() {
  const [itemCount, setItemCount] = useState(3) // Примерное количество товаров

  return (
    <Link href="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  )
}