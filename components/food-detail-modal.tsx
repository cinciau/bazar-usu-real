"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Flame, Minus, Plus, Star, X } from "lucide-react"
import { type FoodItem, formatIDR } from "@/lib/data"
import { useCart } from "@/components/cart-provider"

type Props = {
  food: FoodItem | null
  onClose: () => void
}

export function FoodDetailModal({ food, onClose }: Props) {
  useEffect(() => {
    if (!food) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [food, onClose])

  if (!food) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Detail ${food.name}`}
    >
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
      />
      <FoodDetailContent key={food.id} food={food} onClose={onClose} />
    </div>
  )
}

function FoodDetailContent({
  food,
  onClose,
}: {
  food: FoodItem
  onClose: () => void
}) {
  const { addLine } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [variants, setVariants] = useState<Record<string, string>>(() =>
    Object.fromEntries(food.variants.map((v) => [v.id, v.options[0].id])),
  )
  const [addOns, setAddOns] = useState<Record<string, boolean>>({})

  const variantDelta = food.variants.reduce((sum, group) => {
    const opt = group.options.find((o) => o.id === variants[group.id])
    return sum + (opt?.priceDelta ?? 0)
  }, 0)
  const addOnDelta = food.addOns.reduce(
    (sum, a) => sum + (addOns[a.id] ? a.price : 0),
    0,
  )
  const unitPrice = food.price + variantDelta + addOnDelta
  const total = unitPrice * quantity

  const handleAdd = () => {
    const variantSummary = food.variants.map((g) => {
      const opt = g.options.find((o) => o.id === variants[g.id])
      return `${g.label}: ${opt?.label ?? ""}`
    })
    const addOnSummary = food.addOns
      .filter((a) => addOns[a.id])
      .map((a) => a.label)

    addLine({
      foodId: food.id,
      name: food.name,
      image: food.image,
      restaurant: food.restaurant,
      unitPrice,
      quantity,
      variantSummary,
      addOnSummary,
    })
    onClose()
  }

  return (
    <div className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-card shadow-2xl sm:rounded-3xl">
      {/* Header image */}
      <div className="relative aspect-[16/10] shrink-0">
        <Image
          src={food.image || "/placeholder.svg"}
          alt={food.name}
          fill
          sizes="512px"
          className="object-cover"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md backdrop-blur-sm transition-transform hover:scale-105"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1 font-semibold text-foreground">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {food.rating}
          </span>
          <span>({food.reviews.toLocaleString("id-ID")} ulasan)</span>
          <span aria-hidden>•</span>
          <span>{food.deliveryTime}</span>
        </div>

        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
          {food.name}
        </h2>
        <p className="text-sm font-medium text-primary">{food.restaurant}</p>

        <div className="mt-3 flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
            <Flame className="size-4" />
            {food.calories} kcal
          </span>
          {food.originalPrice > food.price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatIDR(food.originalPrice)}
            </span>
          )}
          <span className="text-lg font-extrabold text-foreground">
            {formatIDR(food.price)}
          </span>
        </div>

        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          {food.description}
        </p>

        {/* Variants */}
        {food.variants.map((group) => (
          <fieldset key={group.id} className="mt-5">
            <legend className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
              {group.label}
              {group.required && (
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                  Wajib
                </span>
              )}
            </legend>
            <div className="flex flex-col gap-2">
              {group.options.map((opt) => {
                const checked = variants[group.id] === opt.id
                return (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border px-3.5 py-2.5 text-sm transition-colors ${
                      checked
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 font-medium text-foreground">
                      <span
                        className={`flex size-4.5 items-center justify-center rounded-full border-2 ${
                          checked ? "border-primary" : "border-muted-foreground/40"
                        }`}
                      >
                        {checked && (
                          <span className="size-2 rounded-full bg-primary" />
                        )}
                      </span>
                      {opt.label}
                    </span>
                    <span className="flex items-center gap-2">
                      {opt.priceDelta > 0 && (
                        <span className="text-xs font-semibold text-muted-foreground">
                          +{formatIDR(opt.priceDelta)}
                        </span>
                      )}
                      <input
                        type="radio"
                        name={group.id}
                        checked={checked}
                        onChange={() =>
                          setVariants((prev) => ({
                            ...prev,
                            [group.id]: opt.id,
                          }))
                        }
                        className="sr-only"
                      />
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}

        {/* Add-ons */}
        {food.addOns.length > 0 && (
          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-bold text-foreground">
              Tambahan
            </legend>
            <div className="flex flex-col gap-2">
              {food.addOns.map((a) => {
                const checked = !!addOns[a.id]
                return (
                  <label
                    key={a.id}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border px-3.5 py-2.5 text-sm transition-colors ${
                      checked
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 font-medium text-foreground">
                      <span
                        className={`flex size-4.5 items-center justify-center rounded-md border-2 ${
                          checked
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground/40"
                        }`}
                      >
                        {checked && <Plus className="size-3" strokeWidth={3} />}
                      </span>
                      {a.label}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {formatIDR(a.price)}
                      </span>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setAddOns((prev) => ({ ...prev, [a.id]: !prev[a.id] }))
                        }
                        className="sr-only"
                      />
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        )}
      </div>

      {/* Sticky footer */}
      <div className="shrink-0 border-t border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-2xl border border-border p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Kurangi jumlah"
              className="flex size-9 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-accent disabled:opacity-40"
            >
              <Minus className="size-4" />
            </button>
            <span
              aria-live="polite"
              className="w-8 text-center text-base font-bold text-foreground"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              aria-label="Tambah jumlah"
              className="flex size-9 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-accent"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex flex-1 items-center justify-between gap-2 rounded-2xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-sm transition-all hover:brightness-105 active:scale-[0.98]"
          >
            <span>Tambah ke Keranjang</span>
            <span>{formatIDR(total)}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
