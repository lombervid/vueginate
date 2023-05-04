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
      container: ['pagination'],
      item: ['page-item'],
      page: [],
      active: ['active'],
      arrow: [],
      disabled: ['disabled'],
      readers: []
    }"
    :custom-styles="customStyles"
    :visible-always="visibleAlways"
    @page-change="changePage"
  >
    <template #previous="{ item }">
      <li :class="[item.cssClass]">
        <a
          v-if="!item.isFirst"
          class="page-link"
          @click.prevent="changePage(item.target)"
          href="#"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
        <span v-else class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </span>
      </li>
    </template>

    <template #ellipsis="{ item }">
      <li :class="[item.cssClass]">
        <span class="page-link">&hellip;</span>
      </li>
    </template>

    <template #active="{ item }">
      <li :class="[item.cssClass]" aria-current="page">
        <span class="page-link">{{ item.target }}</span>
      </li>
    </template>

    <template #item="{ item }">
      <li :class="[item.cssClass]">
        <a class="page-link" @click.prevent="changePage(item.target)" href="#">{{ item.target }}</a>
      </li>
    </template>

    <template #next="{ item }">
      <li :class="[item.cssClass]">
        <a
          v-if="!item.isLast"
          class="page-link"
          @click.prevent="changePage(item.target)"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
        <span v-else class="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </span>
      </li>
    </template>
  </VueginateCore>
</template>
