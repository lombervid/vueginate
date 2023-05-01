import type { PaginationStyles } from '@/types'

const defaultClasses: PaginationStyles = Object.freeze({
  container: 'pagination',
  page: 'page-item',
  arrow: 'page-item arrow',
  active: 'page-item active',
  ellipsis: 'page-item disabled',
  disabled: 'disabled'
})

export function useStyles(): PaginationStyles {
  const defaults = defaultClasses

  function getClass(...sections: string[]): string {
    const classes: string[] = []

    sections.forEach((e) => {
      const sectionClasses = defaults[e as keyof typeof defaultClasses] ?? ''

      if (sectionClasses) {
        classes.push(sectionClasses)
      }
    })

    return classes.join(' ').trim()
  }

  return {
    container: getClass('container'),
    page: getClass('page'),
    arrow: getClass('arrow'),
    active: getClass('active'),
    ellipsis: getClass('ellipsis'),
    disabled: getClass('disabled')
  }
}
