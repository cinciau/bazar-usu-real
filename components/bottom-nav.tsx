"use client"

import { Bell, Home, Receipt, User } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { cn } from "@/lib/utils"

export type AppTab = "home" | "orders" | "notifications" | "profile"

const tabs: { id: AppTab; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Beranda", icon: Home },
  { id: "orders", label: "Pesanan", icon: Receipt },
  { id: "notifications", label: "Notifikasi", icon: Bell },
  { id: "profile", label: "Profil", icon: User },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: AppTab
  onChange: (tab: AppTab) => void
}) {
  const { unreadCount } = useApp()

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-border bg-background/95 backdrop-blur-md"
    >
      <ul className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-1.5">
        {tabs.map((tab) => {
          const isActive = active === tab.id
          const Icon = tab.icon
          return (
            <li key={tab.id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex w-full flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-semibold transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="relative">
                  <Icon
                    className={cn("size-6", isActive && "fill-primary/15")}
                    strokeWidth={isActive ? 2.4 : 2}
                  />
                  {tab.id === "notifications" && unreadCount > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex min-w-4 items-center justify-center rounded-full border-2 border-background bg-destructive px-0.5 text-[9px] font-bold leading-none text-white">
                      {unreadCount}
                    </span>
                  )}
                </span>
                {tab.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
