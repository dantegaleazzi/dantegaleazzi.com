import type { Guide } from './types'

export const ep05: Guide = {
  number: 5,
  hook: 'Your startup\nname has 4 jobs.',
  subtitle: 'Before you fall in love with a name,\nmake sure it passes these tests.',
  startHere: 'Easy to say and spell',
  notHere: 'The perfect .com',
  intro: [
    'Naming is one of the most fun parts of starting something — and one of the easiest places to get stuck for weeks.',
    'This guide gives you four tests, a way out of the domain trap, and a reminder that a name is only the start of a brand.',
  ],
  sections: [
    {
      kicker: 'The four tests',
      title: 'Before choosing\na name, ask:',
      body: [
        'A name has to work when someone hears it, when they type it and when they try to remember it a week later. And you need somewhere to put it online.',
        'Run every candidate through these four questions before you get attached.',
      ],
      visuals: [
        {
          kind: 'window',
          title: 'The 4 tests',
          rows: [
            { text: 'Can people say it?' },
            { text: 'Can they spell it?' },
            { text: 'Will they remember it?' },
            { text: 'Can you get a good domain?' },
          ],
        },
        { kind: 'note', text: 'If it fails more than one, keep looking' },
      ],
      doThis: 'Write down your top five names. Run each one through the four tests and drop any that fail more than one.',
    },
    {
      kicker: 'The domain trap',
      title: 'A taken .com\ndoesn’t kill\nthe name.',
      body: [
        'It’s tempting to pick a weaker name just because the .com is free. That trade rarely pays off: people remember names, not domains.',
        'There are usually good options beyond the exact .com — a different extension, or a short word added to the name.',
      ],
      visuals: [
        {
          kind: 'cards',
          items: [
            { label: 'Better', text: 'A strong name with a good domain', tone: 'butter' },
            { label: 'Worse', text: 'A weak name with the perfect .com', tone: 'white' },
          ],
        },
        { kind: 'banner', text: 'Name beats perfect domain.' },
      ],
      doThis:
        'For your favorite name, list three domain options you could buy today. Pick the one that still sounds natural when you say it out loud.',
    },
    {
      kicker: 'The Sted example',
      fromSted: true,
      title: 'sted.com wasn’t\navailable.',
      body: [
        'When I looked, sted.com was taken. I could change the name, or find a domain that fit the product.',
        'I kept the name and went with sted.ai.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '↓',
          steps: [
            { text: 'Sted', tone: 'sky' },
            { text: 'sted.ai', tone: 'mint' },
          ],
        },
        { kind: 'banner', text: 'Sometimes the alternative\nmakes the brand stronger.' },
      ],
      doThis: 'If your .com is taken, look for a domain that says something about your product — not just any available variation.',
    },
    {
      kicker: 'A name isn’t a brand',
      title: 'The name is\nonly the start.',
      body: [
        'A name gets people in the door. What they remember is everything around it: how you position the product, what you say, how it looks, how it works and how it sounds.',
        'Don’t expect the name to do all of that on its own.',
      ],
      visuals: [
        {
          kind: 'chips',
          items: [
            { label: 'Name', tone: 'butter' },
            { label: 'Positioning', tone: 'sky' },
            { label: 'Message', tone: 'lilac' },
            { label: 'Visual identity', tone: 'mint' },
            { label: 'Product', tone: 'peach' },
            { label: 'Voice', tone: 'white' },
          ],
        },
        { kind: 'banner', text: 'The brand gives them\nsomething to remember.' },
      ],
      doThis: 'Write three lines: who the product is for (positioning), what you say about it (message) and how it should sound (voice).',
    },
  ],
  test: {
    name: 'The Say-It Test',
    intro: 'Your name will spread by people saying it out loud. Test that in two minutes.',
    steps: [
      'Say the name once to a friend — don’t spell it.',
      'Ask them to type it into a search bar or write it down.',
      'Ask them what they think the product does.',
    ],
    result: 'If they misspell it or can’t guess anything about it, the name has work to do. If both go well, check the domain next.',
  },
  takeaway: {
    title: 'Make it easy to say,\nspell and [[remember]].',
    body: 'Then find a domain that works with it.',
  },
  questions: [
    'Can people say it after hearing it once?',
    'Can they spell it without help?',
    'Will they remember it next week?',
    'Can I get a domain that works with it?',
    'Am I choosing a weaker name just because the .com is free?',
    'Is there already a known product with a similar name in my space?',
  ],
  prompts: [
    {
      id: 'name-ideas',
      title: 'Generate name ideas',
      description: 'A shortlist of names that pass the four tests.',
      text: `I'm naming a product.

What it does: [Your product in one sentence]
Who it's for: [Your first market]
How it should feel: [3 words, e.g. calm, fast, playful]

Give me 20 name ideas. Keep them short, easy to say and easy to spell. Avoid made-up spellings and generic words. For each name, add one line on why it could work. Then pick your top 5 and suggest domain options for each.`,
    },
    {
      id: 'four-tests',
      title: 'Run the four tests',
      description: 'Pressure-test your shortlist before you fall in love.',
      text: `Here's my shortlist of names: [Your names]

Rate each name on four tests: Can people say it? Can they spell it after hearing it? Will they remember it? Can I get a good domain?

Point out possible confusions, negative meanings in other languages and existing products with a similar name. Then recommend one and explain why.`,
    },
    {
      id: 'domain-options',
      title: 'Find domain alternatives',
      description: 'Options for when the .com is taken.',
      text: `The name I want is [Your name], but the .com is taken.

Suggest 10 domain alternatives that still read naturally: different extensions and short additions to the name. For each, tell me how it sounds when said out loud and whether it might confuse people. I'll check availability myself.`,
    },
  ],
}
