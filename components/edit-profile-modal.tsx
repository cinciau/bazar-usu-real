"use client"

import { useEffect, useState } from "react"
import { Check, X } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { UserAvatar } from "@/components/user-avatar"
import { avatarChoices } from "@/lib/data"
import { cn } from "@/lib/utils"

export function EditProfileModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { user, updateProfile } = useApp()
  const [name, setName] = useState(user.name)
  const [avatar, setAvatar] = useState(user.avatar)

  useEffect(() => {
    if (open) {
      setName(user.name)
      setAvatar(user.avatar)
    }
  }, [open, user])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const handleSave = () => {
    if (!name.trim()) return
    updateProfile({ name: name.trim(), avatar })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in"
      />
      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-border bg-background p-5 shadow-2xl animate-in zoom-in-95 fade-in duration-200">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-foreground">
            Edit Profil
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mb-5 flex flex-col items-center gap-3">
          <UserAvatar
            name={name || "GB"}
            avatarId={avatar}
            className="size-20 text-2xl ring-4 ring-accent"
          />
          <span className="text-xs font-semibold text-muted-foreground">
            Pilih Avatar
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {avatarChoices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => setAvatar(choice.id)}
                aria-label={`Avatar ${choice.label}`}
                className={cn(
                  "relative flex size-10 items-center justify-center rounded-full transition-transform hover:scale-110",
                  choice.color,
                  avatar === choice.id &&
                    "ring-2 ring-foreground ring-offset-2 ring-offset-background",
                )}
              >
                {avatar === choice.id && (
                  <Check className="size-5 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        <label className="mb-4 flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">
            Nama Lengkap
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama kamu"
            className="rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          />
        </label>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-border py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-[1.5] rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:brightness-105 disabled:opacity-50"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  )
}
