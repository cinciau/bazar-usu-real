"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  type AppNotification,
  type SavedAddress,
  type UserProfile,
  defaultAddresses,
  defaultNotifications,
  defaultUser,
} from "@/lib/data"

type AppContextValue = {
  // Auth
  isLoggedIn: boolean
  user: UserProfile
  login: () => void
  logout: () => void
  updateProfile: (patch: Partial<UserProfile>) => void
  // Address
  addresses: SavedAddress[]
  activeAddressId: string
  activeAddress: SavedAddress
  setActiveAddressId: (id: string) => void
  addAddress: (address: Omit<SavedAddress, "id">) => void
  // Notifications
  notifications: AppNotification[]
  unreadCount: number
  markAllRead: () => void
  activeMode: "buyer" | "seller"
  isSeller: boolean
  switchMode: (mode: "buyer" | "seller") => void
  becomeSeller: (storeName: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<UserProfile>(defaultUser)
  const [activeMode, setActiveMode] = useState<"buyer" | "seller">("buyer")
  const [isSeller, setIsSeller] = useState(false)

  const [addresses, setAddresses] = useState<SavedAddress[]>(defaultAddresses)
  const [activeAddressId, setActiveAddressId] = useState<string>(
    defaultAddresses[0].id,
  )

  const [notifications, setNotifications] =
    useState<AppNotification[]>(defaultNotifications)

  const login = useCallback(() => setIsLoggedIn(true), [])
  const logout = useCallback(() => setIsLoggedIn(false), [])

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...patch }))
  }, [])

  const addAddress = useCallback((address: Omit<SavedAddress, "id">) => {
    const id = `addr-${Date.now()}`
    setAddresses((prev) => [...prev, { ...address, id }])
    setActiveAddressId(id)
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }, [])
  const switchMode = useCallback((mode: "buyer" | "seller") => {
    if (mode === "seller" && !isSeller) return
    setActiveMode(mode)
  }, [isSeller])
  const becomeSeller = useCallback((storeName: string) => {
    setIsSeller(true)
    setActiveMode("seller")
    setUser((prev) => ({ ...prev, name: storeName }))
  }, [])

  const value = useMemo<AppContextValue>(() => {
    const activeAddress =
      addresses.find((a) => a.id === activeAddressId) ?? addresses[0]
    const unreadCount = notifications.filter((n) => n.unread).length
    return {
      isLoggedIn,
      user,
      login,
      logout,
      updateProfile,
      addresses,
      activeAddressId,
      activeAddress,
      setActiveAddressId,
      addAddress,
      notifications,
      unreadCount,
      markAllRead,
      activeMode,
      isSeller,
      switchMode,
      becomeSeller,
    }
  }, [
    isLoggedIn,
    user,
    login,
    logout,
    updateProfile,
    addresses,
    activeAddressId,
    addAddress,
    notifications,
    markAllRead,
    activeMode,
    isSeller,
    switchMode,
    becomeSeller,
  ])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
