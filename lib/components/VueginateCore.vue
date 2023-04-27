<script setup lang="ts">
import { PageInfo, PageType } from '@/types'
import { computed, warn } from 'vue'
import NextIcon from './Icons/NextIcon.vue'
import PreviousIcon from './Icons/PreviousIcon.vue'

Math.trunc =
  Math.trunc ||
  function (x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x)
  }

const emits = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
    validator(value: number) {
      return Number.isInteger(value) && value >= 0
    }
  },
  currentPage: {
    type: Number,
    required: true,
    validator(value: number) {
      return Number.isInteger(value) && value > 0
    }
  },
  itemsPerPage: {
    type: Number,
    required: true,
    validator(value: number) {
      return Number.isInteger(value) && value > 0
    }
  },
  pagesToShow: {
    type: Number,
    default: 2,
    validator(value: number) {
      return Number.isInteger(value) && value >= -1
    }
  },
  visibleAlways: {
    type: Boolean
  }
})

const totalPages = computed(() => {
  const totalItems = Math.trunc(props.totalItems)
  const itemsPerPage = Math.trunc(props.itemsPerPage)
  const total = Math.trunc(totalItems / itemsPerPage)

  return totalItems % itemsPerPage === 0 ? total : total + 1
})

const toShow = computed(() => Math.trunc(props.pagesToShow))
const currentPage = computed(() => {
  const currentPage = Math.trunc(props.currentPage)

  if (currentPage < 1) {
    return 1
  }

  if (currentPage > totalPages.value) {
    warn('`currentPage` should not be greater than the total number of pages')
    return totalPages.value
  }

  return currentPage
})
const isFirstPage = computed(() => currentPage.value <= 1)
const isLastPage = computed(() => currentPage.value >= totalPages.value)

const nextPage = computed(() => {
  return isLastPage.value ? currentPage.value : currentPage.value + 1
})
const previousPage = computed(() => {
  return isFirstPage.value ? currentPage.value : currentPage.value - 1
})

const pages = computed<PageInfo[]>(() => {
  const pages: PageInfo[] = []

  for (let i = 1; i <= totalPages.value; i++) {
    const page = new PageInfo(i, getPageType(i))

    if (page.isEllipsis()) {
      const next =
        i < currentPage.value ? currentPage.value - (toShow.value + 1) : totalPages.value - 1

      if (i < next) {
        i = next
      }
    }

    pages.push(page)
  }

  return pages
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
  return page === currentPage.value
}

function isEllipsis(page: number) {
  if (toShow.value < 0) {
    return false
  }

  if (page < currentPage.value) {
    const nextPage = currentPage.value - toShow.value

    return (page === 2 && nextPage > 3) || (page > 2 && page < nextPage)
  }

  const lastPage = currentPage.value + toShow.value

  return (
    (page === lastPage + 1 && page < totalPages.value - 1) ||
    (page > lastPage + 1 && page < totalPages.value)
  )
}

function changePage(page: number) {
  if (page < 1 || page > totalPages.value || page === currentPage.value) {
    return
  }

  emits('pageChange', page)
}

const showComponent = computed(() => props.visibleAlways || totalPages.value > 1)
</script>
<template>
  <nav v-if="showComponent" aria-label="Page navigation">
    <ul class="pagination">
      <slot name="previous" :page="{ first: isFirstPage, next: previousPage }">
        <li>
          <span v-if="isFirstPage" class="page-item ellipsis disabled">
            <span class="sr-only">Prev Page</span>
            <PreviousIcon />
          </span>
          <a v-else @click.prevent="changePage(previousPage)" class="page-item ellipsis">
            <span class="sr-only">Prev Page</span>
            <PreviousIcon />
          </a>
        </li>
      </slot>

      <template v-for="page in pages" :key="page">
        <slot v-if="page.isEllipsis()" name="ellipsis">
          <li>
            <span class="page-item disabled">&#8230;</span>
          </li>
        </slot>

        <slot v-else-if="page.isCurrent()" name="active">
          <li>
            <span class="page-item active">{{ page.number }}</span>
          </li>
        </slot>

        <slot v-else name="item">
          <li>
            <a @click.prevent="changePage(page.number)" class="page-item"> {{ page.number }} </a>
          </li>
        </slot>
      </template>

      <slot name="next" :page="{ last: isLastPage, next: nextPage }">
        <li>
          <span v-if="isLastPage" class="page-item ellipsis disabled">
            <span class="sr-only">Next Page</span>
            <NextIcon />
          </span>
          <a v-else @click.prevent="changePage(nextPage)" class="page-item ellipsis">
            <span class="sr-only">Next Page</span>
            <NextIcon />
          </a>
        </li>
      </slot>
    </ul>
  </nav>
</template>
