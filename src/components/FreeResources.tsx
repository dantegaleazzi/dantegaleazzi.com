import {
  ArrowUpRight,
  BookOpen,
  Bot,
  Box,
  Code2,
  GraduationCap,
  MessageSquareCode,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'

type ResourceCategory = 'Tool' | 'Course' | 'Article'
type ResourceFilter = 'All' | ResourceCategory

type StackItem = {
  name: string
  description: string
  category: ResourceCategory
  href: string
  Icon: LucideIcon
  affiliate?: boolean
}

const stackItems: StackItem[] = [
  {
    name: 'Cursor',
    description: 'The editor I use to learn, ship and work alongside coding agents.',
    category: 'Tool',
    href: 'https://www.cursor.com/',
    Icon: Code2,
  },
  {
    name: 'Lovable',
    description: 'A fast way to test product ideas and turn prompts into working interfaces.',
    category: 'Tool',
    href: 'https://lovable.dev/',
    Icon: Box,
  },
  {
    name: 'ChatGPT',
    description: 'For research, planning, debugging and turning loose ideas into concrete next steps.',
    category: 'Tool',
    href: 'https://chatgpt.com/',
    Icon: MessageSquareCode,
  },
  {
    name: 'Claude',
    description: 'A thoughtful partner for long context, code review and working through complex systems.',
    category: 'Tool',
    href: 'https://claude.ai/',
    Icon: Bot,
  },
  {
    name: 'AI builder courses',
    description: 'Courses and learning paths that help regular people build useful products with AI.',
    category: 'Course',
    href: '#newsletter',
    Icon: GraduationCap,
  },
  {
    name: 'What I’m reading',
    description: 'Articles, field notes and references that changed how I think about building with AI.',
    category: 'Article',
    href: '#newsletter',
    Icon: BookOpen,
  },
]

export function FreeResources() {
  const [activeFilter, setActiveFilter] = useState<ResourceFilter>('All')
  const filters: ResourceFilter[] = ['All', 'Tool', 'Course', 'Article']
  const visibleItems =
    activeFilter === 'All' ? stackItems : stackItems.filter((item) => item.category === activeFilter)

  return (
    <section className="execution-stack py-8 lg:py-11" id="resources" aria-labelledby="resources-title">
      <div className="section-heading mb-8 flex items-end justify-between">
        <div>
          <p className="section-kicker mb-3 font-mono text-[0.68rem] font-medium tracking-[0.08em] text-[#5f625b] uppercase">
            Tools / assets / useful links
          </p>
          <h2
            className="text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.95] font-bold tracking-[-0.06em]"
            id="resources-title"
          >
            Free Resources
          </h2>
        </div>
        <p className="hidden font-mono text-[0.68rem] font-medium tracking-[0.08em] uppercase sm:block">
          {String(visibleItems.length).padStart(3, '0')} resources
        </p>
      </div>

      <div className="resource-filters mb-5 flex flex-wrap gap-2" aria-label="Filter resources">
        {filters.map((filter) => {
          const count =
            filter === 'All' ? stackItems.length : stackItems.filter((item) => item.category === filter).length
          const isActive = activeFilter === filter

          return (
            <button
              className={`resource-filter border-2 border-ink px-3 py-2 font-mono text-[0.64rem] font-medium uppercase transition-colors ${
                isActive ? 'bg-signal' : 'bg-white hover:bg-[#fff6c7]'
              }`}
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'All' ? 'All' : `${filter}s`}
              <span className="ml-2 opacity-55">{String(count).padStart(2, '0')}</span>
            </button>
          )
        })}
      </div>

      <div className="stack-grid grid border-t-2 border-ink bg-white lg:grid-cols-2">
        {visibleItems.map(({ name, description, category, href, Icon, affiliate }, index) => {
          const isExternal = href.startsWith('http')

          return (
            <a
              className={`stack-card group grid min-h-28 grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 border-b-2 border-ink px-3 py-4 no-underline transition-colors hover:bg-signal focus-visible:bg-signal focus-visible:outline-none lg:px-4 ${
                index % 2 === 0 ? 'lg:border-r-2' : ''
              }`}
              href={href}
              key={name}
              rel={isExternal ? 'noreferrer' : undefined}
              target={isExternal ? '_blank' : undefined}
            >
              <span className="grid size-10 place-items-center border-2 border-ink bg-white">
                <Icon className="size-4.5" strokeWidth={1.8} aria-hidden="true" />
              </span>

              <span className="min-w-0">
                <span className="block text-lg leading-tight font-bold tracking-[-0.035em]">{name}</span>
                <span className="mt-1 block text-xs leading-relaxed opacity-70">{description}</span>
              </span>

              <span className="flex items-center gap-2 self-start pt-1 sm:self-center sm:pt-0">
                <span className="hidden items-center gap-2 sm:flex">
                  {affiliate && (
                    <span className="border border-ink bg-orange px-2 py-1 font-mono text-[0.58rem] text-white uppercase">
                      Affiliate
                    </span>
                  )}
                  <span className="border border-ink bg-white px-2 py-1 font-mono text-[0.6rem] uppercase">{category}</span>
                </span>
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>
            </a>
          )
        })}
      </div>

      <p className="mt-6 font-mono text-[0.64rem] leading-relaxed opacity-60">
        Some links may become affiliate links. They’ll always be clearly marked, and I’ll only share tools I use or
        genuinely recommend.
      </p>
    </section>
  )
}
