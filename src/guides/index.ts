import { ep01 } from './ep01'
import { ep02 } from './ep02'
import { ep03 } from './ep03'
import { ep04 } from './ep04'
import { ep05 } from './ep05'
import { ep06 } from './ep06'
import { ep07 } from './ep07'
import { ep08 } from './ep08'
import { ep09 } from './ep09'
import { ep10 } from './ep10'
import { ep11 } from './ep11'
import { ep12 } from './ep12'
import { ep13 } from './ep13'
import type { Guide, GuideLink, GuideMeta } from './types'

export const guideTitles = [
  'Start With a Problem',
  'Find Your Target Market',
  'Validate the Idea',
  'Define Your MVP',
  'Name Your Startup',
  'Build It With AI',
  'Get It to Real Users',
  'Set Up Your Company',
  'Figure Out How You Make Money',
  'Build Distribution',
  'Prepare to Launch',
  'Ship, Learn & Iterate',
  'Zero to a Hundred — What I Learned Building From 0 → 100 With AI',
]

const series = [ep01, ep02, ep03, ep04, ep05, ep06, ep07, ep08, ep09, ep10, ep11, ep12, ep13]
export const guides: Record<number, Guide> = Object.fromEntries(series.map((guide, index) => [index + 1, guide]))

export const guideIndexPath = '/zero-to-100-guide'
export const guidePath = (number: number) => `${guideIndexPath}-${number}`

function seriesLink(number: number): GuideLink | undefined {
  if (number < 1 || number > guideTitles.length) return undefined
  return { href: guidePath(number), label: `Part ${number}`, title: guideTitles[number - 1] }
}

export function seriesMeta(number: number): GuideMeta {
  return {
    title: guideTitles[number - 1],
    file: `ZERO_TO_100_EP${number}.DOC`,
    crumb: { href: guideIndexPath, label: 'Zero to 100' },
    back: { href: guideIndexPath, label: 'All guides' },
    part: `Part ${number} of ${guideTitles.length}`,
    prev: seriesLink(number - 1),
    next: seriesLink(number + 1),
  }
}
