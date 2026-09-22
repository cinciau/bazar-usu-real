"use client"

import {
  Cookie,
  CupSoda,
  Flame,
  MapPin,
  Salad,
  Tag,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react"
import { categories, type CategoryId } from "@/lib/data"

const iconMap: Record<string, LucideIcon> = {
  tag: Tag,
  "map-pin": MapPin,
  flame: Flame,
  cookie: Cookie,
  "cup-soda": CupSoda,
  salad: Salad,
}

type Props = {
  active: CategoryId | "all"
  onChange: (id: CategoryId | "all") => void
}

export function CategoryPills({ active, onChange }: Props) {
  return (
    <section className="sticky top-[65px] z-30 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Pill
            label="Semua"
            icon={UtensilsCrossed}
            active={active === "all"}
            onClick={() => onChange("all")}
          />
          {categories.map((c) => {
            const Icon = iconMap[c.icon] ?? Tag
            return (
              <Pill
                key={c.id}
                label={c.label}
                icon={Icon}
                active={active === c.id}
                onClick={() => onChange(c.id)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Pill({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string
  icon: LucideIcon
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent"
      }`}
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}
