"use client"

import { useMemo, useRef, useState } from "react"
import Image from "next/image"
import {
  Bell,
  ChevronDown,
  Leaf,
  MapPin,
  Search,
  ShoppingBag,
  User,
} from "lucide-react"
import { foods, formatIDR } from "@/lib/data"
import { useCart } from "@/components/cart-provider"

type Props = {
  query: string
  onQueryChange: (value: string) => void
  onCartOpen: () => void
  onSelectFood: (id: string) => void
}

export function SiteHeader({
  query,
  onQueryChange,
  onCartOpen,
  onSelectFood,
}: Props) {
  const { itemCount } = useCart()
  const [focused, setFocused] = useState(false)
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return foods
      .filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.restaurant.toLowerCase().includes(q) ||
          f.cuisine.toLowerCase().includes(q),
      )
      .slice(0, 5)
  }, [query])

  const showSuggestions = focused && suggestions.length > 0

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Leaf className="size-5" />
          </span>
          <span className="hidden text-lg font-extrabold tracking-tight text-foreground sm:block">
            Green<span className="text-primary">Bite</span>
          </span>
        </div>

        {/* Location selector */}
        <button
          type="button"
          className="hidden shrink-0 items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-left transition-colors hover:border-primary/50 md:flex"
        >
          <MapPin className="size-4 text-primary" />
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Antar ke
            </span>
            <span className="max-w-40 truncate text-sm font-semibold text-foreground">
              Jl. Sudirman No. 12, Jakarta
            </span>
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>

        {/* Search */}
        <div className="relative flex-1">
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3.5 py-2.5 transition-colors focus-within:border-primary">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={() => {
                if (blurTimer.current) clearTimeout(blurTimer.current)
                setFocused(true)
              }}
              onBlur={() => {
                blurTimer.current = setTimeout(() => setFocused(false), 120)
              }}
              placeholder="Cari 'Nasi Goreng', 'Ayam Geprek'..."
              aria-label="Cari makanan atau restoran"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>

          {showSuggestions && (
            <ul className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-xl">
              {suggestions.map((f) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onSelectFood(f.id)
                      setFocused(false)
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-accent"
                  >
                    <span className="relative size-10 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={f.image || "/placeholder.svg"}
                        alt={f.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-semibold text-foreground">
                        {f.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {f.restaurant} • {formatIDR(f.price)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="Notifikasi"
            className="relative hidden size-10 items-center justify-center rounded-2xl border border-border bg-card text-foreground transition-colors hover:border-primary/50 sm:flex"
          >
            <Bell className="size-5" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive" />
          </button>
          <button
            type="button"
            onClick={onCartOpen}
            aria-label={`Buka keranjang, ${itemCount} item`}
            className="relative flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105"
          >
            <ShoppingBag className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex min-w-5 items-center justify-center rounded-full border-2 border-background bg-destructive px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Profil"
            className="hidden size-10 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card text-foreground transition-colors hover:border-primary/50 sm:flex"
          >
            <User className="size-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
