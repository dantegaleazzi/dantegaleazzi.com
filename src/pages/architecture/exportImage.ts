// Turns a diagram <svg> into a standalone SVG or a 1920×1080 PNG, entirely in the browser.
// Fonts are embedded from /public/fonts so the file renders the same anywhere, with no network calls.

const SVG_NS = 'http://www.w3.org/2000/svg'
export const EXPORT_WIDTH = 1920
export const EXPORT_HEIGHT = 1080

const fontFiles = [
  { family: 'Space Grotesk', weight: '300 700', url: '/fonts/space-grotesk-latin.woff2' },
  { family: 'DM Mono', weight: '400', url: '/fonts/dm-mono-400-latin.woff2' },
  { family: 'DM Mono', weight: '500', url: '/fonts/dm-mono-500-latin.woff2' },
]

let fontCss: Promise<string> | null = null

function toDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

function embeddedFontCss() {
  fontCss ??= Promise.all(
    fontFiles.map(async ({ family, weight, url }) => {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`Could not load ${url}`)
      const data = await toDataUrl(new Blob([await response.arrayBuffer()], { type: 'font/woff2' }))
      return `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;src:url(${data}) format('woff2');}`
    }),
  ).then((rules) => rules.join(''))
  return fontCss
}

export async function svgMarkup(svg: SVGSVGElement) {
  const clone = svg.cloneNode(true) as SVGSVGElement
  // Interaction-only pieces never reach the file.
  clone.querySelectorAll('[data-export="hide"], .arch-focus').forEach((element) => element.remove())
  clone.querySelectorAll('[tabindex]').forEach((element) => {
    for (const attribute of ['tabindex', 'role', 'aria-pressed', 'aria-label', 'class', 'style']) element.removeAttribute(attribute)
  })
  clone.removeAttribute('class')
  clone.setAttribute('width', String(EXPORT_WIDTH))
  clone.setAttribute('height', String(EXPORT_HEIGHT))
  const style = document.createElementNS(SVG_NS, 'style')
  style.textContent = await embeddedFontCss()
  clone.insertBefore(style, clone.firstChild)
  return new XMLSerializer().serializeToString(clone)
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export async function exportSvg(svg: SVGSVGElement, filename: string) {
  download(new Blob([await svgMarkup(svg)], { type: 'image/svg+xml;charset=utf-8' }), filename)
}

export async function renderPng(svg: SVGSVGElement) {
  const url = URL.createObjectURL(new Blob([await svgMarkup(svg)], { type: 'image/svg+xml;charset=utf-8' }))
  try {
    const image = new Image()
    image.decoding = 'sync'
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error('The diagram could not be rendered.'))
      image.src = url
    })
    const canvas = document.createElement('canvas')
    canvas.width = EXPORT_WIDTH
    canvas.height = EXPORT_HEIGHT
    canvas.getContext('2d')!.drawImage(image, 0, 0, EXPORT_WIDTH, EXPORT_HEIGHT)
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('PNG export failed.'))), 'image/png'),
    )
  } finally {
    URL.revokeObjectURL(url)
  }
}

export async function exportPng(svg: SVGSVGElement, filename: string) {
  download(await renderPng(svg), filename)
}
