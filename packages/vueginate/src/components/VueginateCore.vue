<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, toRefs } from 'vue'
import { usePagination } from '../composables/pagination'
import { useStyles } from '../composables/styles'
import type { PaginationStyles } from '../types'
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
    },
  },
  currentPage: {
    type: Number,
    required: true,
    validator(value: number) {
      return Number.isInteger(value) && value > 0
    },
  },
  itemsPerPage: {
    type: Number,
    required: true,
    validator(value: number) {
      return Number.isInteger(value) && value > 0
    },
  },
  pagesToShow: {
    type: Number,
    default: 2,
    validator(value: number) {
      return Number.isInteger(value) && value >= -1
    },
  },
  visibleAlways: {
    type: Boolean,
  },
  withDefaultStyles: {
    type: [Object, Boolean] as PropType<PaginationStyles | boolean>,
    default: (): PaginationStyles | boolean => true,
  },
  customStyles: {
    type: Object as PropType<PaginationStyles>,
    default: (): PaginationStyles => {
      return {}
    },
  },
})

const meta = toRefs(props)

// Styles composable
const styles = useStyles(meta.customStyles, meta.withDefaultStyles)

// Pagination composable
const showComponent = computed(() => props.visibleAlways || totalPages.value > 1)
const { totalPages, currentPage, isFirstPage, previousPage, pages, isLastPage, nextPage } =
  usePagination(meta.currentPage, meta.totalItems, meta.itemsPerPage, meta.pagesToShow)

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
        :item="{
          isFirst: isFirstPage,
          target: previousPage,
          cssClass: [styles.item, styles.arrow, isFirstPage ? styles.disabled : []],
        }"
        :emit="!isFirstPage ? () => changePage(previousPage) : null"
      >
        <li>
          <a
            v-if="!isFirstPage"
            @click.prevent="changePage(previousPage)"
            :class="[styles.item, styles.arrow]"
            href="#"
          >
            <span :class="styles.readers">Prev Page</span>
            <PreviousIcon />
          </a>

          <span v-else :class="[styles.item, styles.arrow, styles.disabled]">
            <span :class="styles.readers">Prev Page</span>
            <PreviousIcon />
          </span>
        </li>
      </slot>

      <template v-for="page in pages" :key="page">
        <slot
          v-if="page.isEllipsis()"
          name="ellipsis"
          :item="{ target: page.number, cssClass: [styles.item, styles.disabled] }"
        >
          <li>
            <span :class="[styles.item, styles.disabled]">&#8230;</span>
          </li>
        </slot>

        <slot
          v-else-if="page.isCurrent()"
          name="active"
          :item="{ target: page.number, cssClass: [styles.item, styles.active] }"
        >
          <li>
            <span :class="[styles.item, styles.active]" aria-current="page">{{ page.number }}</span>
          </li>
        </slot>

        <slot
          v-else
          name="item"
          :item="{ target: page.number, cssClass: [styles.item, styles.page] }"
          :emit="() => changePage(page.number)"
        >
          <li>
            <a
              @click.prevent="changePage(page.number)"
              :class="[styles.item, styles.page]"
              href="#"
            >
              {{ page.number }}
            </a>
          </li>
        </slot>
      </template>

      <slot
        name="next"
        :item="{
          isLast: isLastPage,
          target: nextPage,
          cssClass: [styles.item, styles.arrow, isLastPage ? styles.disabled : []],
        }"
        :emit="!isLastPage ? () => changePage(nextPage) : null"
      >
        <li>
          <a
            v-if="!isLastPage"
            @click.prevent="changePage(nextPage)"
            :class="[styles.item, styles.arrow]"
            href="#"
          >
            <span :class="styles.readers">Next Page</span>
            <NextIcon />
          </a>

          <span v-else :class="[styles.item, styles.arrow, styles.disabled]">
            <span :class="styles.readers">Next Page</span>
            <NextIcon />
          </span>
        </li>
      </slot>
    </ul>
  </nav>
</template>
