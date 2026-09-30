// Step 02: how Ask Sted works today. Keep this in line with the deployed chat:
// - an exact URL and the dedicated history/schedule API controls skip the AI Provider;
// - every natural-language request goes through the AI Provider, which picks tools that our server runs;
// - context = persisted history (up to 8 previous messages, 4,000 characters each) + bounded tool evidence;
// - the iOS app receives JSON (no streaming). Anything else belongs in the roadmap, labeled as such.
import type { NodeInfo } from './content'

export type ToolId = 'search' | 'read' | 'recent' | 'period' | 'overview' | 'listSchedules' | 'createSchedule' | 'deleteSchedule' | 'save' | 'help'

export type Tool = { id: ToolId; name: string; technical: string; rule: string }

export const toolGroups: { group: string; tools: Tool[] }[] = [
  {
    group: 'Find & read',
    tools: [
      { id: 'search', name: 'Find saved knowledge', technical: 'search_saved_items', rule: 'Searches only the signed-in user’s saves and returns a bounded set of sources.' },
      { id: 'read', name: 'Read selected saves', technical: 'read_saved_items', rule: 'Reads specific saves the user owns, to compare or go deeper.' },
    ],
  },
  {
    group: 'Summarize',
    tools: [
      { id: 'recent', name: 'Summarize recent saves', technical: 'summarize_recent_items', rule: 'Summarizes the latest saves from retrieved evidence.' },
      { id: 'period', name: 'Today · Yesterday · This week', technical: 'summarize_period', rule: 'Summarizes the saves from one period, from retrieved evidence.' },
    ],
  },
  {
    group: 'Library',
    tools: [{ id: 'overview', name: 'Library count', technical: 'library_overview', rule: 'Counts and describes the user’s library.' }],
  },
  {
    group: 'Weekly schedules',
    tools: [
      { id: 'listSchedules', name: 'List weekly schedules', technical: 'list_summary_schedules', rule: 'Lists the user’s weekly summary schedules.' },
      { id: 'createSchedule', name: 'Create weekly schedule', technical: 'create_weekly_summary_schedule', rule: 'Needs an explicit day and time.' },
      { id: 'deleteSchedule', name: 'Delete weekly schedule', technical: 'delete_summary_schedule', rule: 'Needs an identified schedule.' },
    ],
  },
  {
    group: 'Save',
    tools: [{ id: 'save', name: 'Save a link', technical: 'save_link', rule: 'Accepts the single link present in the message.' }],
  },
  {
    group: 'Help',
    tools: [{ id: 'help', name: 'Help & conversation', technical: 'respond_without_library', rule: 'Answers without touching the library.' }],
  },
]

export const allTools = toolGroups.flatMap(({ tools }) => tools)

export type ChatExampleId = 'search' | 'period' | 'schedule' | 'url'

export type ChatExample = {
  id: ChatExampleId
  label: string
  message: string
  route: 'question' | 'url'
  tool?: ToolId
  readsLibrary: boolean
  result: string[]
  sources: string[]
  note: string
}

export const chatExamples: ChatExample[] = [
  {
    id: 'search',
    label: 'Search',
    message: 'What did I save about onboarding?',
    route: 'question',
    tool: 'search',
    readsLibrary: true,
    result: ['Answer built from two saves'],
    sources: ['Onboarding teardown · example.com', 'First-run UX notes · youtube.com'],
    note: 'The AI Provider asks for a search; our server runs it on this user’s saves and returns bounded evidence. The answer cites the saves it used.',
  },
  {
    id: 'period',
    label: 'Yesterday',
    message: 'What did I save yesterday?',
    route: 'question',
    tool: 'period',
    readsLibrary: true,
    result: ['Summary of yesterday’s saves'],
    sources: ['Article · example.com', 'Video · youtube.com'],
    note: 'A period question uses the period summary tool. Today, the AI Provider still chooses that tool.',
  },
  {
    id: 'schedule',
    label: 'Weekly schedule',
    message: 'Remind me every Friday at 6 PM.',
    route: 'question',
    tool: 'createSchedule',
    readsLibrary: false,
    result: ['Weekly summary scheduled', 'Fridays · 6 PM'],
    sources: [],
    note: 'Handled as a weekly summary schedule, not as a general reminder. The day and time are explicit, so the schedule can be created.',
  },
  {
    id: 'url',
    label: 'Paste a URL',
    message: 'https://example.com/guide/onboarding',
    route: 'url',
    readsLibrary: false,
    result: ['Saved · Processing'],
    sources: [],
    note: 'An exact URL skips the AI Provider and goes straight to Capture. The reply confirms the save; nothing about the content is known until it has been read.',
  },
]

export type ChatNodeId =
  | 'message'
  | 'auth'
  | 'router'
  | 'capture'
  | 'confirmation'
  | 'context'
  | 'sdk'
  | 'provider'
  | 'tools'
  | 'knowledge'
  | 'answer'
  | 'citations'
  | 'persist'
  | 'response'
  | 'deterministicNext'
  | 'recapCandidate'

export const chatInfo: Record<ChatNodeId, NodeInfo> = {
  message: { kicker: 'Step 02 · Input', title: 'User message', summary: 'The iOS app sends the message to our backend as a JSON request.' },
  auth: {
    kicker: 'Step 02 · Backend',
    title: 'Authentication & usage limits',
    summary: 'Every request belongs to the signed-in user and is checked against usage limits.',
  },
  router: {
    kicker: 'Step 02 · Backend',
    title: 'Request router',
    summary:
      'An exact URL goes straight to Capture, and the dedicated history and schedule controls are handled without the AI Provider. Natural-language requests use the AI Provider to select tools.',
    technical: 'Greetings, counts and period inventories written in natural language still go through the AI Provider today.',
  },
  capture: {
    kicker: 'Step 02 · Exact URL',
    title: 'Capture',
    summary: 'The link enters the step 01 pipeline. Accepting it needs no AI Provider call.',
  },
  confirmation: {
    kicker: 'Step 02 · Exact URL',
    title: 'Save confirmation',
    summary: 'The reply confirms the save: Saved or Processing. It does not describe the content before it has been read.',
  },
  context: {
    kicker: 'Step 02 · Memory',
    title: 'Conversation context',
    summary:
      'Persisted in Supabase: conversations, messages, sources and response metadata. Sent to the AI Provider: the current question, up to eight previous messages and the bounded evidence tools return.',
    technical:
      'Previous messages are capped at 4,000 characters each. This is persisted history plus a bounded context window. Conversation compaction and semantic memory are future improvements.',
  },
  sdk: {
    kicker: 'Step 02 · Orchestration',
    title: 'Vercel AI SDK · ToolLoopAgent',
    summary: 'Coordinates the loop between the AI Provider and our server tools. It is orchestration, not hosting or storage.',
    technical: 'Up to four agent steps and up to three tool calls per request. The SDK does not manage memory: the context is the persisted history we send.',
  },
  provider: {
    kicker: 'Step 02 · AI',
    title: 'AI Provider',
    summary: 'Interprets the question, requests a tool when it needs data, and writes the answer from what the tools return.',
    technical: 'The model behind the provider can change; the architecture does not depend on a specific one.',
  },
  tools: {
    kicker: 'Step 02 · Backend',
    title: 'Server tools',
    summary: 'Our backend executes every tool and applies permissions and validations. The AI Provider only requests a tool; it never runs one.',
  },
  knowledge: {
    kicker: 'Step 02 · Storage',
    title: 'User-owned saved knowledge',
    summary: 'Tool queries are scoped to the signed-in user and return a bounded set of sources.',
    technical: 'The whole library is never sent to the AI Provider.',
  },
  answer: {
    kicker: 'Step 02 · Output',
    title: 'Answer / action result',
    summary: 'An answer built around the retrieved evidence, or the result of an action such as a new weekly schedule.',
  },
  citations: {
    kicker: 'Step 02 · Output',
    title: 'Citation checks',
    summary: 'Checks that the cited sources come from the evidence retrieved for this request.',
    technical: 'These checks reduce unsupported citations; they do not guarantee factual accuracy.',
  },
  persist: { kicker: 'Step 02 · Storage', title: 'Persist conversation', summary: 'The message, the answer and its sources are stored in Supabase.' },
  response: {
    kicker: 'Step 02 · Output',
    title: 'JSON response to iOS',
    summary: 'The current iOS app receives a JSON response with the answer and its source cards. There is no live streaming.',
  },
  deterministicNext: {
    kicker: 'Next',
    title: 'Broader deterministic routing',
    summary:
      'Greetings, help, counts and period inventories would get a safe deterministic handler when the request is unambiguous. Ambiguous requests and genuine synthesis would still use the AI Provider and tools.',
  },
  recapCandidate: {
    kicker: 'Candidate implemented · deployment pending',
    title: 'Deterministic recap buttons',
    summary: 'Two exact recap buttons answered without the AI Provider.',
  },
}

export const roadmap = {
  soon: [
    {
      status: 'Next',
      title: 'Broader deterministic routing',
      lines: ['Greetings, help, counts and period inventories', 'get a safe deterministic handler when unambiguous.', 'Ambiguous requests and real synthesis still use', 'the AI Provider and tools.'],
    },
    {
      status: 'Candidate · deployment pending',
      title: 'Deterministic recap buttons',
      lines: ['Two exact recap buttons answered', 'without calling the AI Provider.'],
    },
    {
      status: 'Future',
      title: 'Richer conversation context',
      lines: ['Active source selection · Last topic, period and', 'operation · Compact conversation summary ·', 'Context token budget · Cached recaps.'],
      examples: ['“Tell me more about the second one.”', '“Compare those.”', '“What about yesterday?”'],
    },
  ],
  later: [
    { title: 'Faster answers', lines: ['Deterministic routes,', 'cached recaps, fewer', 'AI Provider calls.'] },
    { title: 'Better continuity', lines: ['Active selections, compact', 'context, references like', '“the second one”.'] },
    { title: 'Deeper retrieval', lines: ['Hybrid search, better', 'ranking, broader source', 'coverage.'] },
    { title: 'More actions', lines: ['Project organization,', 'topic and note editing,', 'multi-link workflows.'] },
    { title: 'Streaming', lines: ['Streaming and visible', 'progress. Needs a future', 'iOS update.'] },
  ],
}
