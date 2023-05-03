import type { PaginationStyles } from '@/types'
import { computed, type ComputedRef, type Ref } from 'vue'

export const DEFAULT_STYLES: PaginationStyles = Object.freeze({
  container: ['pagination'],
  item: ['page-item'],
  arrow: ['page-item', 'arrow'],
  active: ['page-item', 'active'],
  ellipsis: ['page-item', 'disabled'],
  disabled: ['disabled']
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
      arrow: getStyles('arrow'),
      active: getStyles('active'),
      ellipsis: getStyles('ellipsis'),
      disabled: getStyles('disabled')
    }
  })

  return styles
}
