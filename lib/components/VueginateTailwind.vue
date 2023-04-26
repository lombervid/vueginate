<script setup lang="ts">
import PreviousIcon from './Icons/PreviousIcon.vue'
import NextIcon from './Icons/NextIcon.vue'
</script>

<template>
  <!-- Tailwind -->
  <nav aria-label="Page navigation">
    <ul class="flex select-none justify-center gap-1 text-xs font-medium text-gray-600">
      <li>
        <a
          href="#"
          class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 p-2 text-center leading-8 hover:border-gray-400 hover:bg-gray-50"
        >
          <span class="sr-only">Prev Page</span>
          <PreviousIcon />
        </a>
      </li>
      <li>
        <a
          href="#"
          class="block h-8 w-8 rounded border border-gray-300 text-center leading-8 hover:border-gray-400 hover:bg-gray-50"
        >
          1
        </a>
      </li>
      <li>
        <span
          class="block h-8 w-8 rounded border border-gray-300 bg-gray-200 text-center leading-8 opacity-50"
        >
          ...
        </span>
      </li>
      <li>
        <a
          href="#"
          class="block h-8 w-8 rounded border border-gray-300 text-center leading-8 hover:border-gray-400 hover:bg-gray-50"
        >
          13
        </a>
      </li>
      <li>
        <a
          href="#"
          class="block h-8 w-8 rounded border border-gray-300 text-center leading-8 hover:border-gray-400 hover:bg-gray-50"
        >
          14
        </a>
      </li>
      <li
        class="block h-8 w-8 rounded border border-blue-500 bg-blue-50 text-center leading-8 text-blue-600"
      >
        15
      </li>
      <li>
        <a
          href="#"
          class="block h-8 w-8 rounded border border-gray-300 text-center leading-8 hover:border-gray-400 hover:bg-gray-50"
        >
          16
        </a>
      </li>
      <li>
        <a
          href="#"
          class="block h-8 w-8 rounded border border-gray-300 text-center leading-8 hover:border-gray-400 hover:bg-gray-50"
        >
          17
        </a>
      </li>
      <li>
        <span
          class="block h-8 w-8 rounded border border-gray-300 bg-gray-200 text-center leading-8 opacity-50"
        >
          ...
        </span>
      </li>
      <li>
        <a
          href="#"
          class="block h-8 w-8 rounded border border-gray-300 text-center leading-8 hover:border-gray-400 hover:bg-gray-50"
        >
          30
        </a>
      </li>
      <li>
        <a
          href="#"
          class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 p-2 text-center leading-8 hover:border-gray-400 hover:bg-gray-50"
        >
          <span class="sr-only">Next Page</span>
          <NextIcon />
        </a>
      </li>
    </ul>
  </nav>
</template>
