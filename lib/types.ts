export enum PageType {
  Page = 'page',
  Ellipsis = 'ellipsis',
  Current = 'current'
}

export interface PaginationStyles {
  container?: string[]
  item?: string[]
  arrow?: string[]
  active?: string[]
  disabled?: string[]
}

export class PageInfo {
  readonly number: number
  readonly type: PageType

  constructor(number: number, type: PageType) {
    this.number = type === PageType.Ellipsis ? 0 : number
    this.type = type
  }

  isCurrent(): boolean {
    return this.type === PageType.Current
  }

  isEllipsis(): boolean {
    return this.type === PageType.Ellipsis
  }

  isPage(): boolean {
    return this.type === PageType.Page
  }
}
