"use client"

import { Bell, Info, Tag, Truck } from "lucide-react"
import { type AppNotification } from "@/lib/data"
import { cn } from "@/lib/utils"

const iconByType = {
  order: Truck,
  promo: Tag,
  info: Info,
}

const toneByType = {
  order: "bg-sky-100 text-sky-600",
  promo: "bg-emerald-100 text-emerald-600",
  info: "bg-amber-100 text-amber-600",
}

export function NotificationList({
  notifications,
}: {
  notifications: AppNotification[]
}) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Bell className="size-6" />
        </span>
        <p className="text-sm font-semibold text-foreground">
          Belum ada notifikasi
        </p>
        <p className="max-w-[15rem] text-xs text-muted-foreground">
          Promo dan update pesananmu akan muncul di sini.
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {notifications.map((n) => {
        const Icon = iconByType[n.type]
        return (
          <li
            key={n.id}
            className={cn(
              "flex items-start gap-3 rounded-2xl border p-3 transition-colors",
              n.unread
                ? "border-primary/30 bg-accent/60"
                : "border-border bg-card",
            )}
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl",
                toneByType[n.type],
              )}
            >
              <Icon className="size-5" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-foreground">{n.title}</p>
                {n.unread && (
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                )}
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {n.body}
              </p>
              <span className="mt-1 text-[11px] font-medium text-muted-foreground/80">
                {n.time}
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
