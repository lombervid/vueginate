<script setup lang="ts">
import { ref, createApp, onMounted, useSlots } from 'vue'
import { useCreateHTMLElement } from '../composebles/createHTMLElement'

import { SourceType } from '../types'

// https://codesandbox.io/s/hf1fe?file=/src/components/RenderToIFrame.js

const { sleep, createTemplateElement } = useCreateHTMLElement()
const slots = useSlots()
const props = defineProps<{
  type: SourceType
}>()

const iframeRef = ref(null)
const iframeBody = ref(null)
const iframeHead = ref(null)

onMounted(async () => {
  const el = document.createElement('div')
  const templateElement = await createTemplateElement(props.type)

  // wait for the iframe to be mounted
  await sleep(50)

  iframeBody.value = iframeRef.value.contentDocument.body
  iframeHead.value = iframeRef.value.contentDocument.head

  iframeBody.value.appendChild(el)
  iframeHead.value.appendChild(
    await createTemplateElement({
      type: 'style',
      source: { type: 'inline', content: 'body { margin: 0; padding: 10px; }' }
    })
  )

  if (templateElement) {
    iframeHead.value.appendChild(templateElement)
  }

  createApp({
    name: 'IframeRender',
    setup() {
      return () => slots.default()
    }
  }).mount(el)
})
</script>

<template>
  <iframe ref="iframeRef" :id="Date.now().toString()"></iframe>
</template>
