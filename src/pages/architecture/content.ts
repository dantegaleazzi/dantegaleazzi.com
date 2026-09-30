// Everything the architecture page says. It presents the V2 design for the iOS submission:
// no deployment claims beyond "iOS integration in progress", and recovery providers are "in progress" too.
// The AI is always "AI Provider": the model behind it changes, so no model or vendor is named.
import type { Brand } from './brandPaths'

// The website's look: paper background, ink borders, yellow marker. Accents are dark enough to read on light.
export const palette = {
  bg: '#faf6ec',
  surface: '#ffffff',
  surfaceRaised: '#f7f2e8',
  offRoute: '#f6f2e8',
  line: '#cfc8b8',
  lineSoft: '#e6e0d2',
  cardStroke: '#1e1e1e',
  dot: '#e3dccb',
  glow: '#faf6ec',
  marker: '#ffd400',
  text: '#1e1e1e',
  muted: '#5f625b',
  faint: '#9d998f',
  input: '#1e1e1e',
  retrieval: '#2574c0',
  evidence: '#a87e00',
  ai: '#6d4fcb',
  storage: '#23865a',
  pending: '#8a877f',
  full: '#23865a',
  partial: '#a87e00',
  metadata: '#c95f14',
  failed: '#c23b2c',
}


export const fonts = {
  sans: "'Space Grotesk', Arial, sans-serif",
  mono: "'DM Mono', ui-monospace, monospace",
}

export const pageCopy = {
  title: 'STED — V2 architecture',
  subtitle: 'An evidence-first pipeline that turns saved links into searchable knowledge.',
  integrationNote: 'V2 architecture · iOS integration in progress.',
  walkthroughNote: 'Illustrative walkthrough.',
  linkStep: '01 — How STED reads a link',
  chatStep: '02 — How Ask Sted uses your saved knowledge',
  chatTitle: 'Your saved knowledge, ready to answer.',
  chatSubtitle: 'Ask Sted retrieves your saved knowledge, uses focused tools, and builds answers around the evidence it finds.',
}

export const categoryLegend = [
  { label: 'Retrieval', color: palette.retrieval },
  { label: 'Evidence', color: palette.evidence },
  { label: 'AI', color: palette.ai },
  { label: 'Storage & use', color: palette.storage },
]

// Link walkthrough ------------------------------------------------------------

export type StageId = 'save' | 'recognize' | 'retrieve' | 'evidence' | 'understand' | 'validate' | 'use'
export const stageOrder: StageId[] = ['save', 'recognize', 'retrieve', 'evidence', 'understand', 'validate', 'use']

export type SourceId = 'ios' | 'share'
export type ObjectId = 'article' | 'post' | 'reel' | 'video' | 'podcast' | 'repo'
export type AdapterId = 'web' | 'youtube' | 'instagram' | 'x' | 'tiktok' | 'reddit' | 'github' | 'spotify'
export type FieldId = 'text' | 'caption' | 'transcript' | 'author' | 'media' | 'refs'
export type FieldState = 'found' | 'missing' | 'na'
export type Coverage = 'full' | 'partial' | 'metadata' | 'failed'

export const sources: { id: SourceId; label: string; detail: string; brand: Brand }[] = [
  { id: 'ios', label: 'iOS app', detail: 'Swift · SwiftUI', brand: 'apple' },
  { id: 'share', label: 'Share Extension', detail: 'From any app', brand: 'apple' },
]

export const objects: { id: ObjectId; label: string }[] = [
  { id: 'article', label: 'Article' },
  { id: 'post', label: 'Post' },
  { id: 'reel', label: 'Reel' },
  { id: 'video', label: 'Video' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'repo', label: 'Repository' },
]

export const adapters: { id: AdapterId; label: string; detail: string; brand?: Brand }[] = [
  { id: 'web', label: 'Web', detail: 'HTML + metadata' },
  { id: 'youtube', label: 'YouTube', detail: 'Metadata + transcript attempt', brand: 'youtube' },
  { id: 'instagram', label: 'Instagram', detail: 'Public content + metadata', brand: 'instagram' },
  { id: 'x', label: 'X', detail: 'Public content + metadata', brand: 'x' },
  { id: 'tiktok', label: 'TikTok', detail: 'Public content + metadata', brand: 'tiktok' },
  { id: 'reddit', label: 'Reddit', detail: 'Public structured content', brand: 'reddit' },
  { id: 'github', label: 'GitHub', detail: 'Public API + README', brand: 'github' },
  { id: 'spotify', label: 'Spotify', detail: 'Episode metadata', brand: 'spotify' },
]

export const fields: { id: FieldId; label: string }[] = [
  { id: 'text', label: 'Text' },
  { id: 'caption', label: 'Caption' },
  { id: 'transcript', label: 'Transcript' },
  { id: 'author', label: 'Author' },
  { id: 'media', label: 'Media metadata' },
  { id: 'refs', label: 'Source references' },
]

export const coverages: { id: Coverage; label: string; color: string }[] = [
  { id: 'full', label: 'Full', color: palette.full },
  { id: 'partial', label: 'Partial', color: palette.partial },
  { id: 'metadata', label: 'Metadata only', color: palette.metadata },
  { id: 'failed', label: 'Failed', color: palette.failed },
]

export const outputs = ['Title', 'Summary', 'Key ideas', 'Topics', 'Suggested project']
export const checks = ['Structure', 'Evidence references', 'Project ownership', 'Persistence']
export const uses = ['Library', 'Search', 'Ask Sted', 'Recap']

export type ExampleId = 'article' | 'youtube' | 'instagram' | 'github'

export type Example = {
  id: ExampleId
  label: string
  url: string
  source: SourceId
  object: ObjectId
  adapter: AdapterId
  fields: Record<FieldId, FieldState>
  coverage: Coverage
  check: string
  // Every walkthrough example goes through AI understanding; the deterministic path exists but is not simulated here.
  understanding: 'deterministic' | 'ai'
  result: 'Full result' | 'Limited result'
  note: string
}

export const examples: Example[] = [
  {
    id: 'article',
    label: 'Web article',
    url: 'https://example.com/blog/deep-work-notes',
    source: 'share',
    object: 'article',
    adapter: 'web',
    fields: { text: 'found', caption: 'na', transcript: 'na', author: 'found', media: 'found', refs: 'found' },
    coverage: 'full',
    check: 'Enough evidence',
    understanding: 'ai',
    result: 'Full result',
    note: 'Complete example: the article body, author and page metadata are all readable.',
  },
  {
    id: 'youtube',
    label: 'YouTube video',
    url: 'https://youtube.com/watch?v=example123',
    source: 'share',
    object: 'video',
    adapter: 'youtube',
    fields: { text: 'found', caption: 'na', transcript: 'missing', author: 'found', media: 'found', refs: 'found' },
    coverage: 'partial',
    check: 'Limited: no transcript',
    understanding: 'ai',
    result: 'Limited result',
    note: 'Partial example: title, description and channel are available, but no transcript came back.',
  },
  {
    id: 'instagram',
    label: 'Instagram reel',
    url: 'https://instagram.com/reel/example123',
    source: 'share',
    object: 'reel',
    adapter: 'instagram',
    fields: { text: 'na', caption: 'found', transcript: 'missing', author: 'found', media: 'found', refs: 'found' },
    coverage: 'partial',
    check: 'Limited: caption only',
    understanding: 'ai',
    result: 'Limited result',
    note: 'Partial example: the public caption and reel metadata are available, without a transcript.',
  },
  {
    id: 'github',
    label: 'GitHub repository',
    url: 'https://github.com/example/demo-repo',
    source: 'ios',
    object: 'repo',
    adapter: 'github',
    fields: { text: 'found', caption: 'na', transcript: 'na', author: 'found', media: 'found', refs: 'found' },
    coverage: 'full',
    check: 'Enough evidence',
    understanding: 'ai',
    result: 'Full result',
    note: 'Complete example: the public API returns the repository metadata and the README text.',
  },
]

// Explanations shown when a node is selected ----------------------------------

export type NodeInfo = { title: string; kicker: string; summary: string; technical?: string }

export type FlowNodeId = StageId | 'next' | 'recovery'

export const flowInfo: Record<FlowNodeId, NodeInfo> = {
  save: {
    kicker: '01 · Save',
    title: 'Save a link',
    summary: 'Share a URL from any app with the Share Extension, or paste it in the iOS app.',
  },
  recognize: {
    kicker: '02 · Recognize',
    title: 'Recognize the source',
    summary: 'The link is normalized safely and classified by platform and content type: article, post, reel, video, podcast or repository.',
    technical: 'The classification picks the reading strategy: which adapter reads the link and which prompt interprets it later.',
  },
  retrieve: {
    kicker: '03 · Retrieve',
    title: 'Retrieve what is available',
    summary: 'The matching adapter reads what the source makes publicly available. Coverage varies by platform and by post.',
    technical:
      'Web: HTML and metadata. YouTube: metadata plus a transcript attempt. Instagram, X and TikTok: public content and available metadata. Reddit: public structured content when accessible. GitHub: public API and README. Spotify: episode metadata.',
  },
  recovery: {
    kicker: '03 · Retrieve · Recovery',
    title: 'Recovery providers',
    summary: 'Apify for social extraction and Firecrawl for web and dynamic pages. Provider integration is in progress.',
    technical: 'Recovery is triggered by insufficient evidence, not on every link.',
  },
  evidence: {
    kicker: '04 · Evidence',
    title: 'Normalize into an EvidenceBundle',
    summary: 'Everything retrieved becomes one EvidenceBundle with a coverage state: Full, Partial, Metadata only or Failed.',
    technical:
      'Fields: text, caption, transcript when it exists, author, media metadata and source references. A successful HTTP response does not guarantee enough evidence.',
  },
  understand: {
    kicker: '05 · Understand',
    title: 'Understand the evidence',
    summary:
      'Evidence checks decide the path: a deterministic result, or AI understanding. When the AI Provider is used, it interprets the available evidence with a prompt specific to the content type.',
    technical: 'Structured output: title, summary, key ideas, topics and a suggested project. Not every link needs the AI Provider. When evidence is thin, the result is limited.',
  },
  validate: {
    kicker: '06 · Validate & publish',
    title: 'Validate and publish',
    summary: 'Checks the structure, the evidence references and project ownership, then persists the result.',
    technical: 'When evidence is thin, a limited result is kept instead of a full one.',
  },
  use: {
    kicker: '07 · Saved knowledge',
    title: 'Saved knowledge',
    summary: 'The result becomes saved knowledge: it feeds the Library, Search, Ask Sted and Recap.',
  },
  next: {
    kicker: 'Continues in step 02',
    title: 'How Ask Sted uses your saved knowledge',
    summary: 'Saved knowledge is what Ask Sted searches, reads and cites when you ask a question.',
  },
}

// System map --------------------------------------------------------------------

export type SystemNodeId =
  | 'clients'
  | 'captureApi'
  | 'supabase'
  | 'surfaces'
  | 'askStedService'
  | 'askTools'
  | 'answer'
  | 'revenuecat'
  | 'checkout'
  | 'website'

export const systemInfo: Record<SystemNodeId, NodeInfo> = {
  clients: {
    kicker: 'Client',
    title: 'iOS app + Share Extension',
    summary: 'Swift and SwiftUI. The Share Extension saves links from any app.',
  },
  captureApi: {
    kicker: 'Capture API',
    title: 'V2 pipeline',
    summary: 'Retrieval, evidence, understanding and validation for every saved link. Evidence checks decide between a deterministic result and AI understanding.',
    technical: 'TypeScript on Node.js, running on Google Cloud Run. An AI Provider powers the understanding step.',
  },
  supabase: {
    kicker: 'Storage',
    title: 'Supabase',
    summary: 'Auth, PostgreSQL and the saved knowledge.',
  },
  surfaces: {
    kicker: 'In the app',
    title: 'Library · Search · Recap',
    summary: 'Where saved knowledge shows up for the user.',
  },
  askStedService: {
    kicker: 'Ask Sted',
    title: 'Ask Sted service',
    summary: 'A separate service that answers questions about the user’s library.',
    technical: 'The Vercel AI SDK coordinates the tool loop. Supabase persists conversations.',
  },
  askTools: {
    kicker: 'Ask Sted',
    title: 'Tools + AI Provider',
    summary: 'Server tools search the user’s library; the AI Provider reasons over what they return.',
    technical: 'The model works through tools instead of receiving the whole library.',
  },
  answer: {
    kicker: 'Ask Sted',
    title: 'Answer with sources',
    summary: 'Answers about saved content link to the sources they use.',
  },
  revenuecat: {
    kicker: 'Payments',
    title: 'RevenueCat',
    summary: 'Subscriptions and entitlements.',
  },
  checkout: {
    kicker: 'Payments',
    title: 'Web checkout',
    summary: 'RevenueCat hosted funnels with Stripe.',
  },
  website: {
    kicker: 'Support',
    title: 'Website',
    summary: 'The public website, delivered on Cloudflare.',
  },
}
