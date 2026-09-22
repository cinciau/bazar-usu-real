"use client"

import { ShoppingBag } from "lucide-react"
import { formatIDR } from "@/lib/data"
import { useCart } from "@/components/cart-provider"

export function FloatingCart({ onOpen }: { onOpen: () => void }) {
  const { itemCount, subtotal } = useCart()

  if (itemCount === 0) return null

  return (
    <button
      type="button"
      onClick={onOpen}
      className="fixed bottom-5 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-3 rounded-2xl bg-primary px-4 py-3.5 text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:brightness-105 active:scale-[0.98]"
    >
      <span className="flex items-center gap-2.5">
        <span className="relative flex size-8 items-center justify-center rounded-xl bg-white/20">
          <ShoppingBag className="size-4.5" />
          <span className="absolute -right-1.5 -top-1.5 flex min-w-5 items-center justify-center rounded-full border-2 border-primary bg-white px-1 text-[11px] font-bold text-primary">
            {itemCount}
          </span>
        </span>
        <span className="text-sm font-bold">Lihat Keranjang</span>
      </span>
      <span className="text-sm font-extrabold">{formatIDR(subtotal)}</span>
    </button>
  )
}
