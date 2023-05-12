export type ElementType = 'style' | 'link' | 'script'
export type ElementStyle = 'inline' | 'source'
export type ImportContent = () => Promise<string>

export interface SourceType {
  type: ElementType
  source: {
    type: ElementStyle
    content: string | ImportContent
  }
}
