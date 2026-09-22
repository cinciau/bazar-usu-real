import { avatarChoices } from "@/lib/data"
import { cn } from "@/lib/utils"

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const second = parts[1]?.[0] ?? ""
  return (first + second).toUpperCase() || "GB"
}

export function UserAvatar({
  name,
  avatarId,
  className,
}: {
  name: string
  avatarId: string
  className?: string
}) {
  const color =
    avatarChoices.find((a) => a.id === avatarId)?.color ?? "bg-emerald-500"
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full font-bold text-white",
        color,
        className,
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
