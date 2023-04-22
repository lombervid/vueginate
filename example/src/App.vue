<script setup lang="ts">
import RenderToIFrame from './components/RenderToIframe.vue'
import {
  VueginateCore,
  VueginateBootstrap,
  VueginateBulma,
  VueginateTailwind
} from '../../dist/vueginate.js'
</script>

<template>
  <h1>Vueginate example</h1>

  <RenderToIFrame template="core">
    <h1 class="mb-5 border-b-2 border-lime-600 pb-5 text-center text-3xl font-bold">
      Tailwind Core
    </h1>

    <VueginateCore />
  </RenderToIFrame>

  <RenderToIFrame template="tailwind">
    <h1 class="mb-5 border-b-2 border-lime-600 pb-5 text-center text-3xl font-bold">
      Tailwind Pagination
    </h1>

    <VueginateTailwind />
  </RenderToIFrame>

  <RenderToIFrame template="bootstrap">
    <h1 class="fw-semibold border-bottom border-info-subtle border-2 text-center">
      Bootstrap Pagination
    </h1>

    <VueginateBootstrap />
  </RenderToIFrame>

  <RenderToIFrame template="bulma">
    <h1 class="has-text-weight-semibold has-text-centered is-size-2 is-bordered pb-4">
      Bulma Pagination
    </h1>

    <VueginateBulma />
  </RenderToIFrame>
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
