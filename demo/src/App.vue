<script setup lang="ts">
import { reactive } from 'vue'

import { Vueginate } from '@/main'
import RenderToIFrame from './components/RenderToIFrame.vue'

const coreStyle = async (): Promise<string> => {
  return (await import('@dist/style.css?inline')).default.toString()
}

function change(page: number) {
  console.log('yeyyy', page)
  data.current = page
}

const data = reactive({
  total: 86,
  current: 9,
  perPage: 5,
  toShow: 2
})
</script>

<template>
  <h1>Vueginate demo</h1>

  <RenderToIFrame
    :type="{
      type: 'style',
      source: {
        type: 'inline',
        content: coreStyle
      }
    }"
  >
    <h1 style="text-align: center; border-bottom: 2px solid #171; padding-bottom: 1.25rem">
      Tailwind Core
    </h1>

    <Vueginate
      :total-items="data.total"
      :current-page="data.current"
      :items-per-page="data.perPage"
      :pages-to-show="data.toShow"
      visible-always
      @page-change="change"
    >
      <template #previous></template>
      <template #item></template>
      <template #active></template>
      <template #ellipsis></template>
    </Vueginate>
  </RenderToIFrame>

  <!-- <RenderToIFrame
    :type="{
      type: 'style',
      source: {
        type: 'inline',
        content: coreStyle
      }
    }"
  >
    <h1 style="text-align: center; border-bottom: 2px solid #171; padding-bottom: 1.25rem">
      Tailwind Core
    </h1>

    <VueginateCore />
  </RenderToIFrame>

  <RenderToIFrame
    :type="{
      type: 'script',
      source: {
        type: 'source',
        content: 'https://cdn.tailwindcss.com'
      }
    }"
  >
    <h1 class="mb-5 border-b-2 border-lime-600 pb-5 text-center text-3xl font-bold">
      Tailwind Pagination
    </h1>

    <VueginateTailwind />
  </RenderToIFrame>

  <RenderToIFrame
    :type="{
      type: 'link',
      source: {
        type: 'source',
        content: 'https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css'
      }
    }"
  >
    <h1 class="fw-semibold border-bottom border-info-subtle border-2 text-center">
      Bootstrap Pagination
    </h1>

    <VueginateBootstrap />
  </RenderToIFrame>

  <RenderToIFrame
    :type="{
      type: 'link',
      source: {
        type: 'source',
        content: 'https://cdn.jsdelivr.net/npm/bulma@0/css/bulma.min.css'
      }
    }"
  >
    <h1 class="has-text-weight-semibold has-text-centered is-size-2 is-bordered pb-4">
      Bulma Pagination
    </h1>

    <VueginateBulma />
  </RenderToIFrame> -->
</template>

<style scoped>
iframe {
  border: 0;
  resize: both;
  overflow: auto;
  width: 100%;
  height: 10rem;
}
</style>
