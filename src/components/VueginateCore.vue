<script setup lang="ts">
import PreviousIcon from './Icons/PreviousIcon.vue'
import NextIcon from './Icons/NextIcon.vue'

type HTMLEntitiesKey = keyof typeof HTMLEntities

const HTMLEntities = {
  ellipsis: {
    unicode: '&#8230;',
    alphanumeric: '&hellip;'
  },
  lquot: {
    unicode: '&#171;',
    alphanumeric: '&laquo;'
  },
  rquot: {
    unicode: '&#187;',
    alphanumeric: '&raquo;'
  }
}

function htmlEntity(name: HTMLEntitiesKey, unicode: boolean = false): string {
  let character = HTMLEntities[name] ?? null

  if (!character) {
    return ''
  }

  return unicode ? character.unicode : character.alphanumeric
}
</script>
<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li>
        <a href="#" class="page-item arrow">
          <span class="sr-only">Prev Page</span>
          <PreviousIcon />
        </a>
      </li>
      <li>
        <a href="#" class="page-item"> 1 </a>
      </li>
      <li>
        <span class="page-item disabled" v-html="htmlEntity('ellipsis', true)"></span>
      </li>
      <li>
        <a href="#" class="page-item"> 13 </a>
      </li>
      <li>
        <a href="#" class="page-item"> 14 </a>
      </li>
      <li class="page-item active">15</li>
      <li>
        <a href="#" class="page-item"> 16 </a>
      </li>
      <li>
        <a href="#" class="page-item"> 17 </a>
      </li>
      <li>
        <span class="page-item disabled"> ... </span>
      </li>
      <li>
        <a href="#" class="page-item"> 30 </a>
      </li>
      <li>
        <a href="#" class="page-item arrow">
          <span class="sr-only">Next Page</span>
          <NextIcon />
        </a>
      </li>
    </ul>
  </nav>
</template>

<style>
.pagination,
.pagination * {
  @apply box-border;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.pagination {
  @apply list-none;
  @apply flex select-none justify-center gap-1 text-xs font-medium text-gray-600;
}

.pagination .page-item {
  @apply border-solid text-inherit decoration-inherit;
  @apply block h-8 w-8 rounded border border-gray-300 text-center leading-8;
}
.pagination .page-item:hover:not(.active):not(.disabled) {
  @apply border-gray-400 bg-gray-50;
}
.pagination .page-item.active {
  @apply border-blue-500 bg-blue-50 text-blue-600;
}
.pagination .page-item.disabled {
  @apply bg-gray-200 opacity-50;
}
.pagination .page-item.arrow {
  @apply inline-flex  items-center justify-center p-2;
}
</style>
