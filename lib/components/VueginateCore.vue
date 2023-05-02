<script setup lang="ts">
import { usePagination } from '@/composables/pagination'
import { useStyles } from '@/composables/styles'
import { computed, toRefs, withModifiers, type PropType } from 'vue'
import type { PaginationStyles } from '@/types'
import NextIcon from './Icons/NextIcon.vue'
import PreviousIcon from './Icons/PreviousIcon.vue'

const emits = defineEmits<{
  (e: 'page-change', page: number): void
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
  },
  withDefaultStyles: {
    type: [Object, Boolean] as PropType<PaginationStyles | boolean>,
    default: true
  },
  customStyles: {
    type: Object as PropType<PaginationStyles>,
    default: () => {
      return {}
    }
  }
})

const meta = toRefs(props)

// Styles composable
const styles = useStyles(meta.customStyles, meta.withDefaultStyles)

// Pagination composable
const showComponent = computed(() => props.visibleAlways || totalPages.value > 1)
const { totalPages, currentPage, isFirstPage, previousPage, pages, isLastPage, nextPage } =
  usePagination(meta.currentPage, meta.totalItems, meta.itemsPerPage, meta.pagesToShow)

// Page events
const nextPageEvent = computed(() => (!isLastPage.value ? clickEventObject(nextPage.value) : {}))
const previousPageEvent = computed(() =>
  !isFirstPage.value ? clickEventObject(previousPage.value) : {}
)

function clickEventObject(page: number): Object {
  return {
    click: withModifiers(() => changePage(page), ['prevent'])
  }
}

function changePage(page: number) {
  if (page < 1 || page > totalPages.value || page === currentPage.value) {
    return
  }

  emits('page-change', page)
}
</script>
<template>
  <nav v-if="showComponent" aria-label="Page navigation">
    <ul :class="[styles.container]">
      <slot
        name="previous"
        :page="{ first: isFirstPage, next: previousPage }"
        :events="previousPageEvent"
      >
        <li>
          <a v-if="!isFirstPage" @click.prevent="changePage(previousPage)" :class="[styles.arrow]">
            <span class="sr-only">Prev Page</span>
            <PreviousIcon />
          </a>

          <span v-else :class="[styles.arrow, styles.disabled]">
            <span class="sr-only">Prev Page</span>
            <PreviousIcon />
          </span>
        </li>
      </slot>

      <template v-for="page in pages" :key="page">
        <slot v-if="page.isEllipsis()" name="ellipsis">
          <li>
            <span :class="[styles.ellipsis]">&#8230;</span>
          </li>
        </slot>

        <slot v-else-if="page.isCurrent()" name="active">
          <li>
            <span :class="[styles.active]">{{ page.number }}</span>
          </li>
        </slot>

        <slot v-else name="item" :events="clickEventObject(page.number)">
          <li>
            <a @click.prevent="changePage(page.number)" :class="[styles.item]">
              {{ page.number }}
            </a>
          </li>
        </slot>
      </template>

      <slot name="next" :page="{ last: isLastPage, next: nextPage }" :events="nextPageEvent">
        <li>
          <a v-if="!isLastPage" @click.prevent="changePage(nextPage)" :class="[styles.arrow]">
            <span class="sr-only">Next Page</span>
            <NextIcon />
          </a>

          <span v-else :class="[styles.arrow, styles.disabled]">
            <span class="sr-only">Next Page</span>
            <NextIcon />
          </span>
        </li>
      </slot>
    </ul>
  </nav>
</template>
