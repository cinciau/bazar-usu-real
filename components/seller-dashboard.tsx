"use client"

import { useMemo, useState } from "react"
import { BarChart3, Check, ChevronRight, MessageCircle, Package, Plus, Search, ShoppingBag, Store, X } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { foods } from "@/lib/data"

type SellerTab = "dashboard" | "products" | "orders" | "chat" | "store"

const sampleOrders = [
  { id: "#GB1024", buyer: "Andi Pratama", product: "Ayam Geprek Mozzarella", quantity: 2, total: "Rp56.000", status: "Pesanan Baru" },
  { id: "#GB1021", buyer: "Siti Rahma", product: "Kopi Susu Gayo", quantity: 1, total: "Rp18.000", status: "Diproses" },
]

const navItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
  { id: "products" as const, label: "Produk", icon: Package },
  { id: "orders" as const, label: "Pesanan", icon: ShoppingBag },
  { id: "chat" as const, label: "Chat", icon: MessageCircle },
  { id: "store" as const, label: "Toko", icon: Store },
]

export function SellerDashboard() {
  const { user, switchMode } = useApp()
  const [tab, setTab] = useState<SellerTab>("dashboard")
  const [products, setProducts] = useState(() => foods.slice(0, 5).map((food, index) => ({ ...food, active: index !== 4 })))
  const [search, setSearch] = useState("")
  const [storeOpen, setStoreOpen] = useState(true)
  const [chatMessage, setChatMessage] = useState("")
  const [chatSent, setChatSent] = useState<string[]>([])

  const visibleProducts = useMemo(() => products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())), [products, search])

  return <div className="min-h-dvh bg-[#f8fbf8] pb-24">
    <header className="bg-[#416b3e] px-5 pb-6 pt-5 text-white">
      <div className="mx-auto flex max-w-md items-center justify-between">
        <div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f4c95d]"><Store className="size-4" /> Bazar USU</div><h1 className="mt-3 text-2xl font-extrabold">{tab === "dashboard" ? `Halo, ${user.name}` : navItems.find((item) => item.id === tab)?.label}</h1><p className="mt-1 text-sm text-white/75">{tab === "dashboard" ? "Kelola toko dan pesananmu hari ini." : "Mode Penjual"}</p></div>
        <button type="button" onClick={() => switchMode("buyer")} className="rounded-full bg-white/15 px-3 py-2 text-xs font-bold text-white">Beralih ke Pembeli</button>
      </div>
    </header>
    <main className="mx-auto max-w-md space-y-5 px-4 py-5">
      {tab === "dashboard" && <>
        <div className="grid grid-cols-2 gap-3">{[["Pesanan Baru", "12", "bg-[#fff5d6]"], ["Diproses", "8", "bg-[#e3f2e6]"], ["Produk Aktif", "24", "bg-[#e8eefb]"], ["Pendapatan", "Rp1.250.000", "bg-[#f5e4ef]"]].map(([label, value, color]) => <div key={label} className={`rounded-3xl ${color} p-4`}><p className="text-xs font-semibold text-[#55705b]">{label}</p><p className="mt-2 text-xl font-extrabold text-[#253c29]">{value}</p></div>)}</div>
        <section className="rounded-3xl border border-[#deeadf] bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-extrabold text-[#253c29]">Pesanan Terbaru</h2><button type="button" onClick={() => setTab("orders")} className="text-xs font-bold text-[#416b3e]">Lihat semua</button></div><div className="mt-3 space-y-3">{sampleOrders.map((order) => <div key={order.id} className="rounded-2xl bg-[#f7faf7] p-3"><div className="flex items-center justify-between"><p className="text-xs font-bold text-[#416b3e]">{order.id}</p><span className="rounded-full bg-[#fff0c5] px-2 py-1 text-[10px] font-bold text-[#8c6816]">{order.status}</span></div><p className="mt-2 text-sm font-bold text-[#253c29]">{order.product}</p><div className="mt-1 flex justify-between text-xs text-[#6b7d6d]"><span>{order.quantity} item • {order.buyer}</span><span className="font-bold text-[#253c29]">{order.total}</span></div></div>)}</div></section>
        <section className="rounded-3xl border border-[#deeadf] bg-white p-4 shadow-sm"><h2 className="font-extrabold text-[#253c29]">Produk Terlaris</h2><div className="mt-3 space-y-3">{products.slice(0, 3).map((product, index) => <div key={product.id} className="flex items-center gap-3"><img src={product.image} alt="" className="size-12 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#253c29]">{product.name}</p><p className="text-xs text-[#6b7d6d]">Terjual {128 - index * 31}</p></div><p className="text-xs font-bold text-[#416b3e]">Rp{product.price.toLocaleString("id-ID")}</p></div>)}</div></section>
      </>}
      {tab === "products" && <section className="space-y-4"><div className="flex gap-2 rounded-2xl border border-[#deeadf] bg-white px-3 py-3"><Search className="size-4 text-[#6b7d6d]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari produk..." className="min-w-0 flex-1 text-sm outline-none" /></div>{visibleProducts.map((product) => <div key={product.id} className="flex items-center gap-3 rounded-3xl border border-[#deeadf] bg-white p-3 shadow-sm"><img src={product.image} alt="" className="size-16 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-extrabold text-[#253c29]">{product.name}</p><p className="mt-1 text-xs text-[#6b7d6d]">Rp{product.price.toLocaleString("id-ID")} • {product.cuisine}</p><span className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-bold ${product.active ? "bg-[#e3f2e6] text-[#416b3e]" : "bg-muted text-muted-foreground"}`}>{product.active ? "Aktif" : "Nonaktif"}</span></div><div className="flex flex-col gap-2"><button type="button" onClick={() => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, active: !item.active } : item))} className="rounded-xl border border-[#deeadf] px-2 py-1 text-[10px] font-bold text-[#416b3e]">{product.active ? "Nonaktifkan" : "Aktifkan"}</button><button type="button" onClick={() => setProducts((items) => items.filter((item) => item.id !== product.id))} className="rounded-xl px-2 py-1 text-[10px] font-bold text-red-500">Hapus</button></div></div>)}<button type="button" onClick={() => setProducts((items) => [{ ...foods[0], id: `new-${Date.now()}`, name: "Menu Baru", active: true }, ...items])} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#416b3e] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#416b3e]/20"><Plus className="size-4" /> Tambah Produk</button></section>}
      {tab === "orders" && <section className="space-y-3">{sampleOrders.map((order) => <div key={order.id} className="rounded-3xl border border-[#deeadf] bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><p className="font-extrabold text-[#416b3e]">{order.id}</p><span className="rounded-full bg-[#fff0c5] px-2 py-1 text-[10px] font-bold text-[#8c6816]">{order.status}</span></div><p className="mt-3 text-sm font-bold text-[#253c29]">{order.buyer}</p><p className="mt-1 text-sm text-[#6b7d6d]">{order.product} x{order.quantity}</p><div className="mt-4 flex items-center justify-between"><p className="font-extrabold text-[#253c29]">{order.total}</p><button type="button" className="rounded-xl bg-[#416b3e] px-3 py-2 text-xs font-bold text-white">Lihat Detail</button></div></div>)}</section>}
      {tab === "chat" && <section className="space-y-3"><div className="rounded-3xl border border-[#deeadf] bg-white p-4"><p className="font-extrabold text-[#253c29]">Andi Pratama</p><p className="mt-1 text-sm text-[#6b7d6d]">Pesanan saya sudah diproses?</p><div className="mt-4 space-y-2">{chatSent.map((message) => <p key={message} className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[#416b3e] px-3 py-2 text-sm text-white">{message}</p>)}</div><form onSubmit={(event) => { event.preventDefault(); if (chatMessage.trim()) { setChatSent((items) => [...items, chatMessage.trim()]); setChatMessage("") } }} className="mt-4 flex gap-2"><input value={chatMessage} onChange={(event) => setChatMessage(event.target.value)} placeholder="Tulis pesan..." className="min-w-0 flex-1 rounded-xl border border-[#deeadf] px-3 py-2 text-sm outline-none" /><button type="submit" className="flex size-10 items-center justify-center rounded-xl bg-[#416b3e] text-white"><MessageCircle className="size-4" /></button></form></div></section>}
      {tab === "store" && <section className="space-y-4 rounded-3xl border border-[#deeadf] bg-white p-5 shadow-sm"><div className="flex items-center gap-3"><div className="flex size-16 items-center justify-center rounded-2xl bg-[#e3f2e6] text-[#416b3e]"><Store className="size-8" /></div><div><h2 className="text-xl font-extrabold text-[#253c29]">Warung USU</h2><p className="text-sm text-[#6b7d6d]">4.8 • 24 Produk</p></div></div><p className="text-sm leading-relaxed text-[#55705b]">Menjual berbagai makanan favorit mahasiswa USU.</p><div className="flex items-center justify-between rounded-2xl bg-[#f7faf7] p-3"><div><p className="text-sm font-bold text-[#253c29]">Toko Buka</p><p className="text-xs text-[#6b7d6d]">{storeOpen ? "Toko sedang buka" : "Toko sedang tutup"}</p></div><button type="button" onClick={() => setStoreOpen((open) => !open)} className={`relative h-7 w-12 rounded-full ${storeOpen ? "bg-[#416b3e]" : "bg-gray-300"}`}><span className={`absolute top-1 size-5 rounded-full bg-white transition-transform ${storeOpen ? "translate-x-6" : "translate-x-1"}`} /></button></div><div className="space-y-2 text-sm text-[#55705b]"><p>Jam Buka <strong className="float-right text-[#253c29]">08.00 - 21.00</strong></p><p>Alamat <strong className="float-right text-[#253c29]">Area Kampus USU</strong></p></div><button type="button" className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#416b3e] py-3 text-sm font-bold text-[#416b3e]"><Check className="size-4" /> Edit Profil Toko</button></section>}
    </main>
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-md justify-around border-t border-[#deeadf] bg-white/95 px-2 py-2 backdrop-blur">{navItems.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setTab(id)} className={`flex flex-col items-center gap-1 rounded-xl px-2 py-1 text-[10px] font-bold ${tab === id ? "text-[#416b3e]" : "text-[#8a9b8b]"}`}><Icon className="size-5" />{label}</button>)}</nav>
  </div>
}
