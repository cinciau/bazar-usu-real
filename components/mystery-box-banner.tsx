"use client"

import { useState } from "react"
import Image from "next/image"
import { Gift, Sparkles } from "lucide-react"
import { formatIDR } from "@/lib/data"

const budgets = [25000, 40000, 60000]

export function MysteryBoxBanner() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-emerald-600 p-5 text-primary-foreground shadow-lg sm:p-7">
        <div className="pointer-events-none absolute -right-6 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              Mystery Box
            </span>
            <h2 className="mt-3 text-balance text-2xl font-extrabold leading-tight sm:text-3xl">
              Bingung mau makan apa?
            </h2>
            <p className="mt-1.5 max-w-md text-pretty text-sm text-white/90">
              Pilih budget-mu, dapatkan menu kejutan{" "}
              <span className="font-bold">hemat 40%!</span> Chef kami yang pilihkan
              menu terbaik untukmu.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {budgets.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelected(b)}
                  className={`rounded-2xl border px-4 py-2 text-sm font-bold transition-all ${
                    selected === b
                      ? "border-white bg-white text-primary shadow-md"
                      : "border-white/40 bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {formatIDR(b)}
                </button>
              ))}
              <button
                type="button"
                disabled={selected === null}
                className="rounded-2xl bg-amber-300 px-5 py-2 text-sm font-extrabold text-amber-950 shadow-md transition-all hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {selected
                  ? `Buka Kejutan ${formatIDR(selected)}`
                  : "Pilih Budget"}
              </button>
            </div>
          </div>

          <div className="relative hidden size-40 shrink-0 sm:block">
            <Image
              src="/food/mystery-box.png"
              alt="Mystery Box kejutan GreenBite"
              fill
              sizes="160px"
              className="object-contain drop-shadow-xl"
            />
            <span className="absolute -left-2 top-2 flex size-11 items-center justify-center rounded-2xl bg-white/90 text-primary shadow-lg">
              <Gift className="size-6" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
