"use client"

import { useEffect, useState } from "react"
import { Check, MapPin, Plus, X } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { type AddressLabel } from "@/lib/data"
import { cn } from "@/lib/utils"

const labelOptions: AddressLabel[] = ["Rumah", "Kantor", "Lainnya"]

export function AddressSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const {
    addresses,
    activeAddressId,
    setActiveAddressId,
    addAddress,
    user,
  } = useApp()
  const [adding, setAdding] = useState(false)
  const [label, setLabel] = useState<AddressLabel>("Rumah")
  const [detail, setDetail] = useState("")
  const [note, setNote] = useState("")

  useEffect(() => {
    if (!open) {
      setAdding(false)
      setDetail("")
      setNote("")
      setLabel("Rumah")
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const handleSelect = (id: string) => {
    setActiveAddressId(id)
    onClose()
  }

  const handleSave = () => {
    if (!detail.trim()) return
    addAddress({
      label,
      recipient: user.name,
      detail: detail.trim(),
      note: note.trim() || undefined,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in"
      />
      <div className="relative z-10 w-full max-w-md rounded-t-3xl border border-border bg-background p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-foreground">
            Pilih Alamat Antar
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

        {!adding ? (
          <>
            <ul className="flex max-h-[45dvh] flex-col gap-2 overflow-y-auto">
              {addresses.map((addr) => {
                const isActive = addr.id === activeAddressId
                return (
                  <li key={addr.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(addr.id)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-colors",
                        isActive
                          ? "border-primary bg-accent"
                          : "border-border bg-card hover:border-primary/50",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <MapPin className="size-4.5" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">
                            {addr.label}
                          </span>
                          {isActive && (
                            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                              Aktif
                            </span>
                          )}
                        </span>
                        <span className="text-sm text-foreground/80">
                          {addr.detail}
                        </span>
                        {addr.note && (
                          <span className="mt-0.5 truncate text-xs text-muted-foreground">
                            Catatan: {addr.note}
                          </span>
                        )}
                      </span>
                      {isActive && (
                        <Check className="mt-1 size-5 shrink-0 text-primary" />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>

            <button
              type="button"
              onClick={() => setAdding(true)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/40 py-3 text-sm font-bold text-primary transition-colors hover:bg-accent"
            >
              <Plus className="size-4.5" />
              Tambah Alamat Baru
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground">
                Label Alamat
              </span>
              <div className="flex gap-2">
                {labelOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setLabel(opt)}
                    className={cn(
                      "flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
                      label === opt
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/50",
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-muted-foreground">
                Alamat Lengkap
              </span>
              <input
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Jl. Contoh No. 1, Kota"
                className="rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-muted-foreground">
                Catatan untuk Driver (opsional)
              </span>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Warna pagar, patokan, dll."
                className="rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              />
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="flex-1 rounded-2xl border border-border py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!detail.trim()}
                className="flex-[1.5] rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:brightness-105 disabled:opacity-50"
              >
                Simpan & Pakai Alamat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
