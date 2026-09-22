"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type CartLine = {
  lineId: string
  foodId: string
  name: string
  image: string
  restaurant: string
  unitPrice: number
  quantity: number
  variantSummary: string[]
  addOnSummary: string[]
}

type CartContextValue = {
  lines: CartLine[]
  itemCount: number
  subtotal: number
  groupOrder: boolean
  addLine: (line: Omit<CartLine, "lineId">) => void
  changeQty: (lineId: string, delta: number) => void
  removeLine: (lineId: string) => void
  clear: () => void
  toggleGroupOrder: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function makeLineKey(line: Omit<CartLine, "lineId">): string {
  return [
    line.foodId,
    ...line.variantSummary,
    ...line.addOnSummary,
  ].join("|")
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [groupOrder, setGroupOrder] = useState(false)

  const addLine = useCallback((line: Omit<CartLine, "lineId">) => {
    const key = makeLineKey(line)
    setLines((prev) => {
      const existing = prev.find((l) => l.lineId === key)
      if (existing) {
        return prev.map((l) =>
          l.lineId === key
            ? { ...l, quantity: l.quantity + line.quantity }
            : l,
        )
      }
      return [...prev, { ...line, lineId: key }]
    })
  }, [])

  const changeQty = useCallback((lineId: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.lineId === lineId
            ? { ...l, quantity: l.quantity + delta }
            : l,
        )
        .filter((l) => l.quantity > 0),
    )
  }, [])

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId))
  }, [])

  const clear = useCallback(() => setLines([]), [])
  const toggleGroupOrder = useCallback(() => setGroupOrder((v) => !v), [])

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0)
    const subtotal = lines.reduce(
      (sum, l) => sum + l.unitPrice * l.quantity,
      0,
    )
    return {
      lines,
      itemCount,
      subtotal,
      groupOrder,
      addLine,
      changeQty,
      removeLine,
      clear,
      toggleGroupOrder,
    }
  }, [lines, groupOrder, addLine, changeQty, removeLine, clear, toggleGroupOrder])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
