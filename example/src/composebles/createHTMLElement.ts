const templates = {
  bootstrap: {
    type: 'link',
    source: 'https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css'
  },
  bulma: {
    type: 'link',
    source: 'https://cdn.jsdelivr.net/npm/bulma@0/css/bulma.min.css'
  },
  tailwind: {
    type: 'script',
    source: 'https://cdn.tailwindcss.com'
  }
}

export function useCreateHTMLElement() {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  function createTemplateElement(template) {
    const name = templates[template] ?? null

    if (!name) {
      return null
    }

    const el = document.createElement(name.type)

    if (name.type === 'link') {
      el.href = name.source
      el.rel = 'stylesheet'
    } else if (name.type === 'script') {
      el.src = name.source
    }

    return el
  }

  function createInlineStyleElement(content: string) {
    const element = document.createElement('style')
    element.innerHTML = content

    return element
  }

  return { sleep, createTemplateElement, createInlineStyleElement }
}
