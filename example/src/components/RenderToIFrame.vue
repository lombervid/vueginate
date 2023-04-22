<script setup lang="ts">
import { ref, createApp, onMounted, useSlots } from 'vue'
import { useCreateHTMLElement } from '../composebles/createHTMLElement'

// https://codesandbox.io/s/hf1fe?file=/src/components/RenderToIFrame.js

const { sleep, createTemplateElement, createInlineStyleElement } = useCreateHTMLElement()
const slots = useSlots()
const props = defineProps({
  template: {
    type: String,
    default: ''
  }
})

const iframeRef = ref(null)
const iframeBody = ref(null)
const iframeHead = ref(null)

onMounted(async () => {
  const el = document.createElement('div')
  const templateElement = createTemplateElement(props.template)

  // wait for the iframe to be mounted
  await sleep(50)

  iframeBody.value = iframeRef.value.contentDocument.body
  iframeHead.value = iframeRef.value.contentDocument.head

  iframeBody.value.appendChild(el)
  iframeHead.value.appendChild(createInlineStyleElement('body { margin: 0; padding: 10px; }'))

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
