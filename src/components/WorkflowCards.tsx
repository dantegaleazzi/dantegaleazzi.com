import { ArrowUpRight, Bot, PanelsTopLeft, Repeat2, type LucideIcon } from 'lucide-react'

type Workflow = {
  number: string
  title: string
  description: string
  tools: string
  difficulty: string
  Icon: LucideIcon
}

const workflows: Workflow[] = [
  {
    number: '01',
    title: 'Make AI QA your app overnight',
    description: 'Set up an AI testing loop that finds bugs while you sleep and hands you a useful report in the morning.',
    tools: 'GPT-4o, Playwright, Slack',
    difficulty: 'Easy',
    Icon: Bot,
  },
  {
    number: '02',
    title: 'Turn notes into a working landing page',
    description: 'Go from a rough idea dump to structured copy, a sharp interface and a live first version.',
    tools: 'Claude, Notion, Vercel',
    difficulty: 'Easy',
    Icon: PanelsTopLeft,
  },
  {
    number: '03',
    title: 'Replace a paid tool with your own AI workflow',
    description: 'Spot the subscription you can retire, map the essential features and build only what you need.',
    tools: 'GPT-4o, Zapier, Airtable',
    difficulty: 'Medium',
    Icon: Repeat2,
  },
]

export function WorkflowCards() {
  return (
    <section className="workflows-section py-8 lg:py-11" id="workflows" aria-labelledby="workflows-title">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="section-kicker mb-3 font-mono text-[0.68rem] font-medium tracking-[0.08em] text-[#5f625b] uppercase">
            Workflow inventory / execution logs
          </p>
          <h2 className="text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.95] font-bold tracking-[-0.06em]" id="workflows-title">
            Popular workflows
          </h2>
        </div>
        <p className="hidden font-mono text-[0.68rem] font-medium tracking-[0.08em] uppercase sm:block">003 entries</p>
      </div>

      <ul className="border-t border-ink/15">
        {workflows.map(({ number, title, description, tools, difficulty, Icon }) => (
          <li key={number}>
            <a
              href="#newsletter"
              className="group grid grid-cols-1 gap-4 border-b border-ink/15 py-6 no-underline transition-colors hover:bg-[#fff9e6] focus-visible:bg-[#fff9e6] focus-visible:outline-none lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8 lg:px-3"
            >
              <div className="flex items-center gap-4 lg:w-44">
                <span className="font-mono text-[0.7rem] font-medium text-[#5f625b]">#{number}</span>
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border-2 border-ink bg-[#fffef8]">
                  <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="text-[clamp(1.3rem,2vw,1.7rem)] leading-[1.1] font-bold tracking-[-0.03em]">
                  {title}
                </h3>
                <p className="mt-1.5 max-w-150 text-[0.95rem] leading-snug text-ink/70">{description}</p>
                <p className="mt-3 font-mono text-[0.62rem] tracking-[0.06em] text-[#5f625b] uppercase">
                  Tools: {tools} &middot; {difficulty}
                </p>
              </div>

              <div className="flex items-center gap-4 lg:justify-end">
                <span className="status-badge border border-ink bg-paper px-2 py-1.5 font-mono text-[0.62rem] font-medium uppercase">
                  Coming soon
                </span>
                <ArrowUpRight
                  className="size-5 text-ink/40 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  aria-hidden="true"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
