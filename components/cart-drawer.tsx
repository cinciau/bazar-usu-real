"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Check,
  Copy,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Users,
  X,
} from "lucide-react"
import { formatIDR } from "@/lib/data"
import { useCart } from "@/components/cart-provider"

type Props = {
  open: boolean
  onClose: () => void
}

const BASE_ONGKIR = 15000
const ONGKIR_DISCOUNT = 10000
const PLATFORM_FEE = 2000

export function CartDrawer({ open, onClose }: Props) {
  const {
    lines,
    subtotal,
    itemCount,
    groupOrder,
    changeQty,
    removeLine,
    toggleGroupOrder,
    clear,
  } = useCart()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  const ongkir = subtotal > 0 ? BASE_ONGKIR - ONGKIR_DISCOUNT : 0
  const platformFee = subtotal > 0 ? PLATFORM_FEE : 0
  const total = subtotal + ongkir + platformFee

  const handleShareLink = () => {
    if (!groupOrder) toggleGroupOrder()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-foreground/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang belanja"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-primary" />
            <h2 className="text-lg font-extrabold text-foreground">
              Keranjang
            </h2>
            {itemCount > 0 && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                {itemCount} item
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup keranjang"
            className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent"
          >
            <X className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="flex size-16 items-center justify-center rounded-3xl bg-accent">
              <ShoppingBag className="size-7 text-primary" />
            </span>
            <p className="mt-4 font-bold text-foreground">
              Keranjangmu masih kosong
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Yuk pilih menu favoritmu dan mulai pesan!
            </p>
          </div>
        ) : (
          <>
            {/* Group order banner */}
            <div className="px-5 pt-4">
              <div
                className={`rounded-2xl border p-3.5 transition-colors ${
                  groupOrder
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="size-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">
                      Order Bareng Teman
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Bagikan link, biar teman tambah pesanan di keranjang yang
                      sama.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleShareLink}
                  className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-all ${
                    copied
                      ? "bg-primary text-primary-foreground"
                      : "border border-primary/40 bg-background text-primary hover:bg-primary/5"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="size-4" />
                      Link tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      {groupOrder ? "Salin ulang link" : "Buat link grup"}
                    </>
                  )}
                </button>
                {groupOrder && (
                  <p className="mt-2 truncate rounded-lg bg-muted px-2.5 py-1.5 text-center text-xs font-medium text-muted-foreground">
                    greenbite.app/g/AY7K-2X9
                  </p>
                )}
              </div>
            </div>

            {/* Lines */}
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {lines.map((line) => (
                <div
                  key={line.lineId}
                  className="flex gap-3 rounded-2xl border border-border bg-card p-3"
                >
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={line.image || "/placeholder.svg"}
                      alt={line.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-1 text-sm font-bold text-foreground">
                        {line.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeLine(line.lineId)}
                        aria-label={`Hapus ${line.name}`}
                        className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    {(line.variantSummary.length > 0 ||
                      line.addOnSummary.length > 0) && (
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {[...line.variantSummary, ...line.addOnSummary].join(
                          " • ",
                        )}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="text-sm font-extrabold text-foreground">
                        {formatIDR(line.unitPrice * line.quantity)}
                      </span>
                      <div className="flex items-center gap-1 rounded-xl border border-border p-0.5">
                        <button
                          type="button"
                          onClick={() => changeQty(line.lineId, -1)}
                          aria-label="Kurangi"
                          className="flex size-7 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-foreground">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeQty(line.lineId, 1)}
                          aria-label="Tambah"
                          className="flex size-7 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={clear}
                className="w-full py-1 text-center text-xs font-medium text-muted-foreground underline-offset-2 hover:text-destructive hover:underline"
              >
                Kosongkan keranjang
              </button>
            </div>

            {/* Summary */}
            <div className="border-t border-border bg-card p-5">
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-semibold text-foreground">
                    {formatIDR(subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Ongkir</dt>
                  <dd className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground line-through">
                      {formatIDR(BASE_ONGKIR)}
                    </span>
                    <span className="font-semibold text-primary">
                      {formatIDR(ongkir)}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Biaya Layanan</dt>
                  <dd className="font-semibold text-foreground">
                    {formatIDR(platformFee)}
                  </dd>
                </div>
                <div className="mt-2 flex justify-between border-t border-border pt-2.5">
                  <dt className="text-base font-extrabold text-foreground">
                    Total
                  </dt>
                  <dd className="text-base font-extrabold text-foreground">
                    {formatIDR(total)}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                className="mt-4 w-full rounded-2xl bg-primary py-3.5 text-center font-bold text-primary-foreground shadow-sm transition-all hover:brightness-105 active:scale-[0.98]"
              >
                Checkout • {formatIDR(total)}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
