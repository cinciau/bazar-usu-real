"use client"

import Image from "next/image"
import { Clock, MapPin, Plus, Star } from "lucide-react"
import { type FoodItem, formatIDR } from "@/lib/data"

type Props = {
  food: FoodItem
  onOpen: (id: string) => void
}

export function FoodCard({ food, onOpen }: Props) {
  const discount = Math.round(
    ((food.originalPrice - food.price) / food.originalPrice) * 100,
  )

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        onClick={() => onOpen(food.id)}
        className="relative aspect-[4/3] overflow-hidden text-left"
        aria-label={`Lihat detail ${food.name}`}
      >
        <Image
          src={food.image || "/placeholder.svg"}
          alt={food.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-destructive px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            -{discount}%
          </span>
        )}
        <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-bold text-foreground shadow-sm backdrop-blur-sm">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          {food.rating}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="truncate font-medium text-foreground">
            {food.restaurant}
          </span>
        </div>
        <span className="mt-0.5 inline-block w-fit rounded-md bg-accent px-1.5 py-0.5 text-[11px] font-medium text-accent-foreground">
          {food.cuisine}
        </span>

        <button
          type="button"
          onClick={() => onOpen(food.id)}
          className="mt-2 line-clamp-1 text-left text-[15px] font-bold text-foreground transition-colors hover:text-primary"
        >
          {food.name}
        </button>

        <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {food.deliveryTime}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" />
            {food.distanceKm} km
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2 pt-1">
          <div className="flex flex-col leading-tight">
            {food.originalPrice > food.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatIDR(food.originalPrice)}
              </span>
            )}
            <span className="text-base font-extrabold text-foreground">
              {formatIDR(food.price)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpen(food.id)}
            className="flex items-center gap-1 rounded-xl bg-primary px-3 py-2 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:brightness-105 active:scale-95"
          >
            <Plus className="size-4" />
            Tambah
          </button>
        </div>
      </div>
    </article>
  )
}
