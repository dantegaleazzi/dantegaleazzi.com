import { Bot, PanelsTopLeft, Repeat2, type LucideIcon } from 'lucide-react'

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
    tools: 'GPT-4o, Playwright',
    difficulty: 'Easy',
    Icon: Bot,
  },
  {
    number: '02',
    title: 'Turn notes into a working landing page',
    description: 'Go from a rough idea dump to structured copy, a sharp interface and a live first version.',
    tools: 'Claude, Vercel',
    difficulty: 'Easy',
    Icon: PanelsTopLeft,
  },
  {
    number: '03',
    title: 'Replace a paid tool with your own AI workflow',
    description: 'Spot the subscription you can retire, map the essential features and build only what you need.',
    tools: 'GPT-4o, Zapier',
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

      <div className="grid gap-4.5 lg:grid-cols-3">
        {workflows.map(({ number, title, description, tools, difficulty, Icon }, index) => (
          <article
            className={`workflow-card group relative flex min-h-72 flex-col overflow-hidden rounded-[10px] border-2 border-ink p-5.5 ${index === 1 ? 'bg-signal' : 'bg-[#fffef8]'}`}
            key={number}
            data-slot={number}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.66rem] font-medium uppercase">#{number}</span>
              <span className="status-badge border border-ink bg-paper px-2 py-1.5 font-mono text-[0.62rem] font-medium uppercase">
                Coming soon
              </span>
            </div>

            <span className="mt-8 grid size-11 place-items-center rounded-xl border-2 border-ink bg-white">
              <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[clamp(1.4rem,2vw,1.9rem)] leading-[1.05] font-bold tracking-[-0.04em]">
              {title}
            </h3>
            <p className="mt-3 text-[0.92rem] leading-snug text-ink/70">{description}</p>
            <p className="mt-auto pt-5 pr-12 font-mono text-[0.6rem] uppercase tracking-[0.06em] text-[#5f625b]">
              Tools: {tools} &middot; {difficulty}
            </p>
            <span className="card-corner absolute right-[-2px] bottom-[-2px] grid size-9.5 place-items-center border-2 border-ink bg-orange font-mono text-xl" aria-hidden="true">
              +
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
