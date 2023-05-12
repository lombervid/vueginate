import type { ComputedRef, Ref } from 'vue'
import { computed } from 'vue'
import type { PaginationStyles } from '../types'

export const DEFAULT_STYLES: PaginationStyles = Object.freeze({
  container: ['vueginate-container'],
  item: ['vg-item'],
  page: ['vg-page'],
  arrow: ['vg-arrow'],
  active: ['vg-active'],
  disabled: ['vg-disabled'],
  readers: ['sr-only'],
})

export function useStyles(
  customStyles: Ref<PaginationStyles>,
  withDefaultStyles: Ref<PaginationStyles | boolean>
): ComputedRef<PaginationStyles> {
  function getDefaultStyles(section: string): string[] {
    const key = section as keyof typeof DEFAULT_STYLES

    if (withDefaultStyles.value === false) {
      return []
    }

    if (typeof withDefaultStyles.value === 'object') {
      return withDefaultStyles.value[key] ?? DEFAULT_STYLES[key] ?? []
    }

    return DEFAULT_STYLES[key] ?? []
  }

  function getCustomStyles(section: string): string[] {
    return customStyles.value[section as keyof typeof DEFAULT_STYLES] ?? []
  }

  function getStyles(section: string): string[] {
    const styles: string[] = []

    styles.push(...getDefaultStyles(section))
    styles.push(...getCustomStyles(section))

    return styles
  }

  const styles = computed((): PaginationStyles => {
    return {
      container: getStyles('container'),
      item: getStyles('item'),
      page: getStyles('page'),
      arrow: getStyles('arrow'),
      active: getStyles('active'),
      disabled: getStyles('disabled'),
      readers: getStyles('readers'),
    }
  })

  return styles
}
