"use client"

import { useMemo, useState } from "react"
import { AppProvider, useApp } from "@/components/app-provider"
import { CartProvider } from "@/components/cart-provider"
import { SiteHeader } from "@/components/site-header"
import { AiRecommendation } from "@/components/ai-recommendation"
import { CategoryPills } from "@/components/category-pills"
import { FoodGrid } from "@/components/food-grid"
import { FoodDetailModal } from "@/components/food-detail-modal"
import { CartDrawer } from "@/components/cart-drawer"
import { FloatingCart } from "@/components/floating-cart"
import { BottomNav, type AppTab } from "@/components/bottom-nav"
import { AddressSheet } from "@/components/address-sheet"
import { NotificationDrawer } from "@/components/notification-drawer"
import { ProfileView } from "@/components/profile-view"
import { SellerDashboard } from "@/components/seller-dashboard"
import { type CategoryId, categories, foods } from "@/lib/data"

function BuyerApp() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">("all")
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [addressOpen, setAddressOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [tab, setTab] = useState<AppTab>("home")
  const { activeAddress } = useApp()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return foods.filter((f) => (activeCategory === "all" || f.categories.includes(activeCategory)) && (!q || `${f.name} ${f.restaurant} ${f.cuisine}`.toLowerCase().includes(q)))
  }, [query, activeCategory])
  const selectedFood = foods.find((f) => f.id === selectedFoodId) ?? null
  const heading = query.trim() ? `Hasil untuk "${query.trim()}"` : activeCategory === "all" ? "Rekomendasi Untukmu" : categories.find((c) => c.id === activeCategory)?.label ?? "Menu"

  const changeTab = (next: AppTab) => {
    setTab(next)
    if (next === "cart") setCartOpen(true)
    if (next === "search") document.querySelector<HTMLInputElement>("input[aria-label='Cari makanan atau restoran']")?.focus()
  }

  return (
    <div className="min-h-dvh bg-background pb-24">
      <SiteHeader query={query} onQueryChange={setQuery} onCartOpen={() => setCartOpen(true)} onSelectFood={setSelectedFoodId} onAddressOpen={() => setAddressOpen(true)} onNotificationsOpen={() => setNotificationOpen(true)} onProfileOpen={() => setTab("profile")} />
      <div className="mx-auto max-w-md md:max-w-7xl">
        {tab === "profile" ? <ProfileView /> : (
          <>
            <button type="button" onClick={() => setAddressOpen(true)} className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-[#f8eac8] px-3 py-2 text-left text-xs font-semibold text-[#416b3e] md:hidden"><span aria-hidden="true">●</span> Antar ke: <span className="truncate">{activeAddress.detail}</span></button>
            {!query.trim() && activeCategory === "all" && <AiRecommendation foods={foods} onOpen={setSelectedFoodId} />}
            <CategoryPills active={activeCategory} onChange={setActiveCategory} />
            <FoodGrid foods={filtered} heading={heading} onOpen={setSelectedFoodId} />
          </>
        )}
      </div>
      <FoodDetailModal food={selectedFood} onClose={() => setSelectedFoodId(null)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FloatingCart onOpen={() => setCartOpen(true)} />
      <AddressSheet open={addressOpen} onClose={() => setAddressOpen(false)} />
      <NotificationDrawer open={notificationOpen} onClose={() => { setNotificationOpen(false); setTab("home") }} />
      <BottomNav active={tab} onChange={changeTab} />
    </div>
  )
}

function BazarApp() {
  const { activeMode } = useApp()
  return activeMode === "seller" ? <SellerDashboard /> : <BuyerApp />
}

export default function Page() {
  return <AppProvider><CartProvider><BazarApp /></CartProvider></AppProvider>
}
