"use client"

import { SearchX } from "lucide-react"
import { type FoodItem } from "@/lib/data"
import { FoodCard } from "@/components/food-card"

type Props = {
  foods: FoodItem[]
  heading: string
  onOpen: (id: string) => void
}

export function FoodGrid({ foods, heading, onOpen }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="text-xl font-extrabold tracking-tight text-foreground">
          {heading}
        </h2>
        <span className="text-sm text-muted-foreground">
          {foods.length} menu
        </span>
      </div>

      {foods.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <SearchX className="size-10 text-muted-foreground" />
          <p className="mt-3 font-semibold text-foreground">
            Menu tidak ditemukan
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Coba kata kunci lain atau pilih kategori berbeda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  )
}
