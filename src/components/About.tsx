import { useState } from 'react'
import { AtSign, BriefcaseBusiness, GitBranch, LayoutGrid, FileText, ArrowLeft } from 'lucide-react'

const socialLinks = [
  { label: 'X / Twitter', href: '#x', Icon: AtSign },
  { label: 'GitHub', href: '#github', Icon: GitBranch },
  { label: 'Projects', href: '#projects', Icon: LayoutGrid },
  { label: 'LinkedIn', href: '#linkedin', Icon: BriefcaseBusiness },
  { label: 'Newsletter', href: '#newsletter', Icon: FileText },
]

export function About() {
  const [story, setStory] = useState<'short' | 'long'>('short')

  return (
    <div className="hero-panel mx-auto w-full max-w-4xl px-0 py-8 lg:py-6">
      <div className="desktop-window-bar" aria-hidden="true">
        <div className="desktop-window-controls">
          <span className="bg-[#ff5f56]" />
          <span className="bg-[#ffbd2e]" />
          <span className="bg-[#27c93f]" />
        </div>
        <div className="text-[0.62rem] font-mono uppercase tracking-widest opacity-40">ABOUT_DANTE_GALEAZZI.DOC</div>
        <div className="w-12" />
      </div>

      <div className="hero-content-wrapper lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="hero-eyebrow inline-flex items-center border border-ink pr-2.5 font-mono text-[0.66rem] uppercase">
            <span className="mr-2.5 bg-ink px-2.5 py-1.5 text-signal">ABOUT / BUILDER LOG</span>
            EST. 2026
          </div>
          <a href="#" className="flex items-center gap-2 font-mono text-[0.68rem] font-bold uppercase tracking-wider no-underline hover:text-signal">
            <ArrowLeft size={14} /> Back to home
          </a>
        </div>

        <h1
          className="hero-title max-w-225 text-[clamp(3.8rem,19vw,6rem)] leading-[0.88] font-bold tracking-[-0.075em] lg:text-[clamp(4.2rem,6vw,6.2rem)] lg:leading-[0.87]"
          id="hero-title"
        >
          <span className="block w-fit">Hi, I'm</span>
          <span className="pixel-underline relative z-0 mt-[0.12em] block w-fit underline-yellow">Dante Galeazzi</span>
        </h1>

        <div className="mt-10 flex gap-4 font-mono text-[0.7rem] uppercase">
          <button
            onClick={() => setStory('short')}
            className={`border-2 border-ink px-4 py-2 transition-colors ${
              story === 'short' ? 'bg-signal' : 'bg-white hover:bg-gray-50'
            } cursor-pointer shadow-[3px_3px_0_var(--color-ink)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_var(--color-ink)]`}
          >
            Short Story
          </button>
          <button
            onClick={() => setStory('long')}
            className={`border-2 border-ink px-4 py-2 transition-colors ${
              story === 'long' ? 'bg-signal' : 'bg-white hover:bg-gray-50'
            } cursor-pointer shadow-[3px_3px_0_var(--color-ink)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_var(--color-ink)]`}
          >
            Long Story
          </button>
        </div>

        <div className="hero-copy mt-8 text-[clamp(1.08rem,1.7vw,1.42rem)] leading-relaxed lg:mt-6 lg:text-[clamp(1rem,1.2vw,1.15rem)]">
          {story === 'short' ? (
            <div className="space-y-4">
              <p>
                I'm Dante Galeazzi. I'm learning to code in public by building real products with AI agents.
              </p>
              <p>
                I’m testing how regular people can use AI to build apps, automate work, save money, and turn ideas into useful products.
              </p>
              <p>
                Right now, I’m building Make AI Do The Work — a weekly letter about practical AI workflows, build logs, tool tests, costs, failures, and what actually works.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-[clamp(1rem,1.4vw,1.2rem)]">
              <p>
                I started from the creative and agency world, working across branding, websites, content, and digital products. Over time, I kept running into the same problem: ideas were easy, execution was slow.
              </p>
              <p>
                AI changed that.
              </p>
              <p>
                Now I’m learning programming by building in public. I use tools like ChatGPT, Claude Code, Codex, Gemini, Lovable, Cursor, and other AI agents to turn ideas into working apps, workflows, and experiments.
              </p>
              <p>
                Make AI Do The Work is where I document the process: what I build, what breaks, what it costs, what tools are worth using, and how normal people can make AI execute real work instead of just generating content.
              </p>
              <p>
                The long-term goal is simple: build useful software, learn deeply, share honestly, and create products that help people do more with AI.
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-8 border-t-2 border-ink pt-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 font-mono text-[0.75rem] font-bold uppercase tracking-[0.1em]">Currently</h3>
            <ul className="space-y-2 font-mono text-[0.75rem] uppercase">
              <li className="flex items-center gap-2">
                <span className="size-1.5 bg-signal border border-ink shadow-[1px_1px_0_var(--color-ink)]" />
                Learning to code in public
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 bg-signal border border-ink shadow-[1px_1px_0_var(--color-ink)]" />
                Building Make AI Do The Work
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 bg-signal border border-ink shadow-[1px_1px_0_var(--color-ink)]" />
                Testing AI agents and workflows
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-mono text-[0.75rem] font-bold uppercase tracking-[0.1em]">Find Me</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider no-underline hover:text-signal"
                >
                  <Icon size={14} className="transition-transform group-hover:-translate-y-1" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
