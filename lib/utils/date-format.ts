export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()

  const minutes = Math.floor(diffInMs / (1000 * 60))
  const hours = Math.floor(diffInMs / (1000 * 60 * 60))
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`
  if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} ago`
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`
  return `${years} year${years === 1 ? "" : "s"} ago`
}
