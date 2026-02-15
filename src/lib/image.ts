export function resolveImageUrl(filePath: string): string {
  return `/api/files?path=${encodeURIComponent(filePath)}`
}
