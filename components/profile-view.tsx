"use client"

import { useState } from "react"
import {
  ChevronRight,
  CreditCard,
  Gift,
  Heart,
  HelpCircle,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Settings,
  Ticket,
} from "lucide-react"
import { useApp } from "@/components/app-provider"
import { UserAvatar } from "@/components/user-avatar"
import { EditProfileModal } from "@/components/edit-profile-modal"

const menuItems = [
  { icon: Gift, label: "Pesanan Kamu" },
  { icon: Heart, label: "Restoran Favorit", value: "8 resto" },
  { icon: CreditCard, label: "Metode Pembayaran", value: "GoPay, OVO" },
  { icon: MapPin, label: "Alamat Tersimpan" },
  { icon: Settings, label: "Pengaturan" },
  { icon: HelpCircle, label: "Bantuan" },
]

export function ProfileView() {
  const { isLoggedIn, user, login, logout } = useApp()
  const [editOpen, setEditOpen] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-20 text-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-accent text-primary">
          <LogIn className="size-9" />
        </span>
        <div className="space-y-1.5">
          <h2 className="text-xl font-extrabold text-foreground">
            Kamu belum masuk
          </h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            Masuk untuk melihat profil, riwayat pesanan, voucher, dan poin
            GreenBite kamu.
          </p>
        </div>
        <button
          type="button"
          onClick={login}
          className="flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-95"
        >
          <LogIn className="size-4.5" />
          Masuk ke Akun
        </button>
      </div>
    )
  }

  return (
    <div className="px-4 py-4">
      {/* Profile header card */}
      <section className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="bg-gradient-to-br from-primary to-emerald-600 px-5 pb-8 pt-6">
          <div className="flex items-center gap-4">
            <UserAvatar
              name={user.name}
              avatarId={user.avatar}
              className="size-16 text-xl ring-4 ring-white/30"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-extrabold text-white">
                {user.name}
              </p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white">
                <Gift className="size-3" />
                Member Emas
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-2 text-xs font-bold text-white backdrop-blur transition-colors hover:bg-white/30"
            >
              <Pencil className="size-3.5" />
              Edit
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-5 py-4">
          <div className="flex items-center gap-3 text-sm">
            <Phone className="size-4 text-primary" />
            <span className="text-foreground">{user.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="size-4 text-primary" />
            <span className="truncate text-foreground">{user.email}</span>
          </div>
        </div>
      </section>

      {/* Menu list */}
      <ul className="mt-4 overflow-hidden rounded-3xl border border-border bg-card">
        {menuItems.map((item, i) => {
          const Icon = item.icon
          return (
            <li key={item.label}>
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted"
                style={{
                  borderTop: i === 0 ? undefined : "1px solid var(--border)",
                }}
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="size-4.5" />
                </span>
                <span className="flex-1 text-sm font-semibold text-foreground">
                  {item.label}
                </span>
                {item.value && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.value}
                  </span>
                )}
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        onClick={logout}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 py-3.5 text-sm font-bold text-destructive transition-colors hover:bg-destructive/10"
      >
        <LogOut className="size-4.5" />
        Keluar
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        BazarUSU v1.0 • Dibuat dengan sepenuh hati
      </p>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  )
}
