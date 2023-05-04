<script setup lang="ts">
import type { PaginationStyles } from '@/types'
import type { PropType } from 'vue'
import VueginateCore from './VueginateCore.vue'
import PreviousIcon from './Icons/PreviousIcon.vue'
import NextIcon from './Icons/NextIcon.vue'

const emits = defineEmits<{
  (e: 'page-change', page: number): void
}>()

defineProps({
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
  customStyles: {
    type: Object as PropType<PaginationStyles>,
    default: () => {
      return {}
    }
  }
})

function changePage(page: number) {
  emits('page-change', page)
}
</script>

<template>
  <VueginateCore
    class="pagination"
    role="navigation"
    aria-label="pagination"
    :total-items="totalItems"
    :current-page="currentPage"
    :items-per-page="itemsPerPage"
    :pages-to-show="pagesToShow"
    :with-default-styles="{
      container: ['pagination-list'],
      item: [],
      page: [],
      active: [],
      arrow: ['p-2'],
      disabled: ['is-disabled'],
      readers: ['is-sr-only']
    }"
    :custom-styles="customStyles"
    :visible-always="visibleAlways"
    @page-change="changePage"
  >
    <template #previous="{ item }">
      <li>
        <a
          v-if="!item.isFirst"
          @click.prevent="changePage(item.target)"
          class="pagination-previous"
          :class="[item.cssClass]"
          ><PreviousIcon
        /></a>
        <span v-else class="pagination-previous" :class="[item.cssClass]"><PreviousIcon /></span>
      </li>
    </template>

    <template #ellipsis="{ item }">
      <li>
        <span class="pagination-ellipsis" :class="item.cssClass">&hellip;</span>
      </li>
    </template>

    <template #active="{ item }">
      <li>
        <span
          class="pagination-link is-current"
          :class="item.cssClass"
          :aria-label="`Page ${item.target}`"
          aria-current="page"
        >
          {{ item.target }}
        </span>
      </li>
    </template>

    <template #item="{ item }">
      <li>
        <a
          class="pagination-link"
          @click.prevent="changePage(item.target)"
          :class="item.cssClass"
          :aria-label="`Goto page ${item.target}`"
        >
          {{ item.target }}
        </a>
      </li>
    </template>

    <template #next="{ item }">
      <li>
        <a
          v-if="!item.isLast"
          @click.prevent="changePage(item.target)"
          class="pagination-next"
          :class="[item.cssClass]"
        >
          <NextIcon />
        </a>
        <span v-else class="pagination-next" :class="[item.cssClass]"><NextIcon /></span>
      </li>
    </template>
  </VueginateCore>
</template>
