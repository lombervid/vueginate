import { PageInfo, PageType } from '@/types'
import type { Ref } from 'vue'
import { computed, warn } from 'vue'

Math.trunc =
  Math.trunc ||
  function (x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x)
  }

export function usePagination(
  currentPage: Ref<number>,
  total: Ref<number>,
  perPage: Ref<number>,
  pagesToShow: Ref<number>
) {
  const toShow = computed(() => Math.trunc(pagesToShow.value))
  const totalPages = computed(() => {
    const totalItems = Math.trunc(total.value)
    const itemsPerPage = Math.trunc(perPage.value)
    const pages = Math.trunc(totalItems / itemsPerPage)

    return totalItems % itemsPerPage === 0 ? pages : pages + 1
  })

  const current = computed(() => {
    const current = Math.trunc(currentPage.value)

    if (current < 1) {
      return 1
    }

    if (current > totalPages.value) {
      warn('`currentPage` should not be greater than the total number of pages')
      return totalPages.value
    }

    return current
  })

  const isFirstPage = computed(() => current.value <= 1)
  const isLastPage = computed(() => current.value >= totalPages.value)
  const nextPage = computed(() => (isLastPage.value ? current.value : current.value + 1))
  const previousPage = computed(() => (isFirstPage.value ? current.value : current.value - 1))

  const pages = computed<PageInfo[]>(() => {
    const pagesColl: PageInfo[] = []

    for (let i = 1; i <= totalPages.value; i++) {
      const page = new PageInfo(i, getPageType(i))

      if (page.isEllipsis()) {
        const next = i < current.value ? current.value - (toShow.value + 1) : totalPages.value - 1

        if (i < next) {
          i = next
        }
      }

      pagesColl.push(page)
    }

    return pagesColl
  })

  function getPageType(page: number): PageType {
    if (isCurrentPage(page)) {
      return PageType.Current
    }

    if (isEllipsis(page)) {
      return PageType.Ellipsis
    }

    return PageType.Page
  }

  function isCurrentPage(page: number) {
    return page === current.value
  }

  function isEllipsis(page: number) {
    if (toShow.value < 0) {
      return false
    }

    if (page < current.value) {
      const nextPage = current.value - toShow.value

      return (page === 2 && nextPage > 3) || (page > 2 && page < nextPage)
    }

    const lastPage = current.value + toShow.value

    return (
      (page === lastPage + 1 && page < totalPages.value - 1) ||
      (page > lastPage + 1 && page < totalPages.value)
    )
  }

  return { totalPages, current, isFirstPage, previousPage, pages, isLastPage, nextPage }
}
