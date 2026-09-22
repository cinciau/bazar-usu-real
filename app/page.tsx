"use client"

import { useMemo, useState } from "react"
import { type CategoryId, categories, foods } from "@/lib/data"
import { CartProvider } from "@/components/cart-provider"
import { SiteHeader } from "@/components/site-header"
import { MysteryBoxBanner } from "@/components/mystery-box-banner"
import { CategoryPills } from "@/components/category-pills"
import { FoodGrid } from "@/components/food-grid"
import { FoodDetailModal } from "@/components/food-detail-modal"
import { CartDrawer } from "@/components/cart-drawer"
import { FloatingCart } from "@/components/floating-cart"

export default function Page() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">("all")
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return foods.filter((f) => {
      const matchCategory =
        activeCategory === "all" || f.categories.includes(activeCategory)
      const matchQuery =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.restaurant.toLowerCase().includes(q) ||
        f.cuisine.toLowerCase().includes(q)
      return matchCategory && matchQuery
    })
  }, [query, activeCategory])

  const heading = useMemo(() => {
    if (query.trim()) return `Hasil untuk "${query.trim()}"`
    if (activeCategory === "all") return "Rekomendasi Untukmu"
    return categories.find((c) => c.id === activeCategory)?.label ?? "Menu"
  }, [query, activeCategory])

  const selectedFood = useMemo(
    () => foods.find((f) => f.id === selectedFoodId) ?? null,
    [selectedFoodId],
  )

  return (
    <CartProvider>
      <div className="min-h-dvh bg-background pb-24">
        <SiteHeader
          query={query}
          onQueryChange={setQuery}
          onCartOpen={() => setCartOpen(true)}
          onSelectFood={setSelectedFoodId}
        />

        {!query.trim() && activeCategory === "all" && <MysteryBoxBanner />}

        <CategoryPills active={activeCategory} onChange={setActiveCategory} />

        <FoodGrid foods={filtered} heading={heading} onOpen={setSelectedFoodId} />

        <FoodDetailModal
          food={selectedFood}
          onClose={() => setSelectedFoodId(null)}
        />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        <FloatingCart onOpen={() => setCartOpen(true)} />
      </div>
    </CartProvider>
  )
}
