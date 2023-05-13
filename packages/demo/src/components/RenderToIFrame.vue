<script setup lang="ts">
import { createApp, onMounted, ref, useSlots } from 'vue'
import { useCreateHTMLElement } from '../composables/createHTMLElement'
import type { SourceType } from '../types'

// https://codesandbox.io/s/hf1fe?file=/src/components/RenderToIFrame.js

const { sleep, createTemplateElement } = useCreateHTMLElement()
const slots = useSlots()
const props = defineProps<{
  type: SourceType
}>()

const iframeRef = ref<HTMLIFrameElement | null>(null)
const iframeBody = ref<HTMLElement | null>(null)
const iframeHead = ref<HTMLHeadElement | null>(null)

onMounted(async () => {
  const el = document.createElement('div')
  const templateElement = await createTemplateElement(props.type)

  // wait for the iframe to be mounted
  await sleep(50)

  iframeBody.value = iframeRef.value?.contentDocument?.body ?? null
  iframeHead.value = iframeRef.value?.contentDocument?.head ?? null

  iframeBody.value?.appendChild(el)

  const style = await createTemplateElement({
    type: 'style',
    source: { type: 'inline', content: 'body { margin: 0; padding: 10px; }' },
  })

  if (style) {
    iframeHead.value?.appendChild(style)
  }

  if (templateElement) {
    iframeHead.value?.appendChild(templateElement)
  }

  createApp({
    name: 'IframeRender',
    setup() {
      return () => (slots.default ? slots.default() : null)
    },
  }).mount(el)
})
</script>

<template>
  <iframe ref="iframeRef" :id="Date.now().toString()"></iframe>
</template>
