import { ElementType, ElementStyle, SourceType } from '../types'

function createHTMLTemplateElement(
  type: ElementType,
  content: string,
  style: ElementStyle = 'source'
) {
  const element = document.createElement(type)

  if (style === 'inline') {
    element.innerHTML = content
  } else {
    if (element instanceof HTMLLinkElement) {
      // type === 'link'
      element.rel = 'stylesheet'
      element.href = content
    } else if (element instanceof HTMLScriptElement) {
      // type === 'script'
      element.src = content
    }
  }

  return element
}

export function useCreateHTMLElement() {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async function createTemplateElement(template: SourceType) {
    if (!template) {
      return null
    }

    const content =
      template.source.type === 'inline' && typeof template.source.content === 'function'
        ? await template.source.content()
        : template.source.content

    return createHTMLTemplateElement(template.type, content.toString(), template.source.type)
  }

  return { sleep, createTemplateElement }
}
