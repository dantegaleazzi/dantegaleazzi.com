import { AtSign, BriefcaseBusiness, Camera, CirclePlay, GitBranch, Music2, Smartphone, type LucideIcon } from 'lucide-react'
import type { SocialKey } from '../../content/site'

// Lucide ships no brand logos, so each network gets a neutral stand-in icon.
export const socialIcons: Record<SocialKey, LucideIcon> = {
  youtube: CirclePlay,
  shorts: Smartphone,
  instagram: Camera,
  tiktok: Music2,
  linkedin: BriefcaseBusiness,
  x: AtSign,
  github: GitBranch,
}
