import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('blob:') || url.startsWith('http')) return url;
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/api\/?$/, '');
  const cleanUrl = url.replace(/\\/g, '/');
  return `${baseUrl}${cleanUrl.startsWith('/') ? '' : '/'}${cleanUrl}`;
}
