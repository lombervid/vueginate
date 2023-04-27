<script setup lang="ts">
import { usePagination } from '@/composables/pagination'
import { computed, toRefs } from 'vue'
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
  }
})

const meta = toRefs(props)
const { totalPages, currentPage, isFirstPage, previousPage, pages, isLastPage, nextPage } =
  usePagination(meta.currentPage, meta.totalItems, meta.itemsPerPage, meta.pagesToShow)

function changePage(page: number) {
  if (page < 1 || page > totalPages.value || page === currentPage.value) {
    return
  }

  emits('page-change', page)
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
