import {
  CircleHelp,
  HeartHandshake,
  MessageCircleWarning,
  ScanFace,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'
import type { CategoryId } from './types'

export interface CategoryConfig {
  id: CategoryId
  label: string
  blurb: string
  icon: LucideIcon
  tile: string
  iconWrap: string
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: 'cyberbullying',
    label: 'Cyberbullying',
    blurb: 'Mean messages, teasing or being left out online',
    icon: MessageCircleWarning,
    tile: 'bg-pink-50 border-pink-200 hover:border-pink-300 data-[selected=true]:border-pink-400 data-[selected=true]:bg-pink-100',
    iconWrap: 'bg-pink-200 text-pink-800',
  },
  {
    id: 'fake-ai',
    label: 'Fake AI Photos / Impersonation',
    blurb: 'Edited pictures or someone pretending to be you',
    icon: ScanFace,
    tile: 'bg-violet-50 border-violet-200 hover:border-violet-300 data-[selected=true]:border-violet-400 data-[selected=true]:bg-violet-100',
    iconWrap: 'bg-violet-200 text-violet-800',
  },
  {
    id: 'harmful-content',
    label: 'Harmful Content',
    blurb: "Scary or upsetting stuff you didn't want to see",
    icon: TriangleAlert,
    tile: 'bg-orange-50 border-orange-200 hover:border-orange-300 data-[selected=true]:border-orange-400 data-[selected=true]:bg-orange-100',
    iconWrap: 'bg-orange-200 text-orange-800',
  },
  {
    id: 'worried-friend',
    label: 'Worried About a Friend',
    blurb: 'Someone you know might need some help',
    icon: HeartHandshake,
    tile: 'bg-teal-50 border-teal-200 hover:border-teal-300 data-[selected=true]:border-teal-400 data-[selected=true]:bg-teal-100',
    iconWrap: 'bg-teal-200 text-teal-800',
  },
  {
    id: 'other',
    label: 'Other',
    blurb: "Something else that's on your mind",
    icon: CircleHelp,
    tile: 'bg-sky-50 border-sky-200 hover:border-sky-300 data-[selected=true]:border-sky-400 data-[selected=true]:bg-sky-100',
    iconWrap: 'bg-sky-200 text-sky-800',
  },
]

export function getCategory(id: CategoryId): CategoryConfig {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1]
}
