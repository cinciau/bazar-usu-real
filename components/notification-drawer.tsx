"use client"

import { useEffect } from "react"
import { CheckCheck, X } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { NotificationList } from "@/components/notification-list"

export function NotificationDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { notifications, unreadCount, markAllRead } = useApp()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Tutup notifikasi"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in"
      />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-lg font-extrabold text-foreground">
              Notifikasi
            </h2>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0
                ? `${unreadCount} pesan belum dibaca`
                : "Semua sudah dibaca"}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground transition-colors hover:brightness-105"
              >
                <CheckCheck className="size-4" />
                Tandai dibaca
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NotificationList notifications={notifications} />
        </div>
      </aside>
    </div>
  )
}
