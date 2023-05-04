<script setup lang="ts">
import type { PaginationStyles } from '@/types'
import type { PropType } from 'vue'
import VueginateCore from './VueginateCore.vue'

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
    :total-items="totalItems"
    :current-page="currentPage"
    :items-per-page="itemsPerPage"
    :pages-to-show="pagesToShow"
    :with-default-styles="{
      container: ['flex', 'select-none', 'gap-1', 'text-xs', 'font-medium', 'text-gray-600'],
      item: [
        'block',
        'h-8',
        'w-8',
        'rounded',
        'border',
        'text-center',
        'leading-8',
        '[&:not(.active)]:border-gray-300',
        '[&:not(.active)]:[&:not(.disabled)]:hover:border-gray-400',
        '[&:not(.active)]:[&:not(.disabled)]:hover:bg-gray-50'
      ],
      page: [],
      active: ['active', 'bg-blue-50', 'text-blue-600', 'border-blue-500'],
      arrow: ['arrow', 'p-2'],
      disabled: ['disabled', 'bg-gray-200', 'opacity-50'],
      readers: ['sr-only']
    }"
    :custom-styles="customStyles"
    :visible-always="visibleAlways"
    @page-change="changePage"
  />
</template>
