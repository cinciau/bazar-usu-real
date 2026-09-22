"use client"

import { useMemo, useState } from "react"
import { ArrowRight, Bot, Check, Sparkles, X } from "lucide-react"
import type { FoodItem } from "@/lib/data"
import { formatIDR } from "@/lib/data"

type Props = { foods: FoodItem[]; onOpen: (id: string) => void }

const mealOptions = ["Makanan Berat", "Camilan", "Minuman", "Dessert"]
const budgetOptions = ["Di bawah Rp20.000", "Rp20.000 - Rp40.000", "Di atas Rp40.000"]
const tasteOptions = ["Pedas", "Tidak Pedas", "Manis", "Gurih", "Bebas"]

export function AiRecommendation({ foods, onOpen }: Props) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  const recommendations = useMemo(() => {
    const budget = answers[1]
    const max = budget === budgetOptions[0] ? 20000 : budget === budgetOptions[1] ? 40000 : Infinity
    return foods.filter((food) => food.price <= max).sort((a, b) => b.rating - a.rating).slice(0, 3)
  }, [answers, foods])

  const options = [mealOptions, budgetOptions, tasteOptions][step]
  const question = ["Lagi ingin makan apa?", "Berapa budget kamu?", "Bagaimana seleramu?"][step]

  const choose = (answer: string) => {
    const next = [...answers]
    next[step] = answer
    setAnswers(next)
    setStep(step + 1)
  }

  return (
    <>
      <section className="mx-4 mt-5 overflow-hidden rounded-3xl border border-[#bde7ca] bg-[#effaf1] p-4 shadow-sm sm:mx-6 md:mx-auto md:max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#00b14f] text-white"><Bot className="size-5" /></div>
          <div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-wider text-[#00a347]">Bazar USU AI</p><h2 className="mt-0.5 text-base font-extrabold text-[#24422c]">Masih bingung mau makan apa?</h2></div>
          <button type="button" onClick={() => setOpen(true)} className="flex shrink-0 items-center gap-1 rounded-xl bg-[#00b14f] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#009f46]">Coba AI <ArrowRight className="size-3.5" /></button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#55705b]">Coba tanya sama AI kita yuuu!</p>
      </section>

      {open && <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 sm:items-center sm:p-4"><div className="w-full max-w-md rounded-t-3xl bg-card p-5 shadow-2xl sm:rounded-3xl">
        <div className="flex items-start justify-between"><div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary"><Sparkles className="size-4" /> Rekomendasi pintar</p><h3 className="mt-1 text-xl font-extrabold text-foreground">{step < 3 ? question : "Pilihan terbaik untukmu"}</h3></div><button type="button" onClick={() => setOpen(false)} aria-label="Tutup rekomendasi" className="rounded-full p-2 hover:bg-muted"><X className="size-4" /></button></div>
        {step < 3 ? <div className="mt-6 grid gap-2">{options.map((option) => <button key={option} type="button" onClick={() => choose(option)} className="flex items-center justify-between rounded-2xl border border-border px-4 py-3 text-left text-sm font-semibold text-foreground transition hover:border-primary hover:bg-accent">{option}<ArrowRight className="size-4 text-muted-foreground" /></button>)}</div> : <div className="mt-5 space-y-3">{recommendations.map((food) => <button key={food.id} type="button" onClick={() => { onOpen(food.id); setOpen(false) }} className="flex w-full items-center gap-3 rounded-2xl border border-border p-3 text-left hover:border-primary"><div className="min-w-0 flex-1"><p className="font-bold text-foreground">{food.name}</p><p className="mt-1 text-xs text-muted-foreground">{food.restaurant} · {food.rating} · {formatIDR(food.price)}</p><p className="mt-1 flex items-center gap-1 text-xs font-semibold text-primary"><Check className="size-3" /> Rating tinggi dan sesuai budget</p></div><ArrowRight className="size-4 text-muted-foreground" /></button>)}<button type="button" onClick={() => { setAnswers([]); setStep(0) }} className="w-full rounded-2xl border border-border py-3 text-sm font-bold text-foreground">Rekomendasikan Lagi</button></div>}
      </div></div>}
    </>
  )
}
