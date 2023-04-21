import { h, ref, createApp, onMounted, onBeforeUpdate } from 'vue'

// https://codesandbox.io/s/hf1fe?file=/src/components/RenderToIFrame.js

export default {
  name: 'RenderToIFrame',
  props: {
    template: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const iframeRef = ref(null)
    const iframeBody = ref(null)
    const iframeHead = ref(null)
    const iframeStyle = ref(null)
    const iframeCss = ref(null)
    let iframeApp = null

    const templates = async (template) => {
      switch (template) {
        case 'bootstrap':
          return await import('bootstrap/dist/css/bootstrap.min.css?inline')

        case 'tailwind':
          return await import('../tailwind.css?inline')

        case 'bulma':
          return await import('bulma/css/bulma.min.css?inline')

        case 'core':
          return {
            default:
              (await import('../tailwind.css?inline')).default.toString() +
              (await import('../../../dist/style.css')).default.toString()
          }
      }

      // return (await import('../../../dist/style.css')).default
      return null
    }

    onMounted(async () => {
      iframeCss.value = await templates(props.template)
      iframeBody.value = iframeRef.value.contentDocument.body
      iframeHead.value = iframeRef.value.contentDocument.head
      const el = document.createElement('div')
      iframeBody.value.appendChild(el)
      iframeStyle.value = document.createElement('style')
      iframeStyle.value.innerHTML = 'body { margin: 0; padding: 10px; }'
      iframeCss.value = await templates(props.template)

      if (iframeCss.value !== null) {
        iframeStyle.value.innerHTML += iframeCss.value.default
      }

      iframeHead.value.appendChild(iframeStyle.value)

      iframeApp = createApp({
        name: 'iframeRender_' + props.template + '_' + Date.now().toString(),
        setup() {
          return () => slots.default()
        }
      }).mount(el)
    })

    onBeforeUpdate(() => {
      if (!iframeApp || !iframeRef.value) {
        return
      }
      if (iframeCss.value) {
        iframeStyle.value.innerHTML += iframeCss.value.default
      }
    })

    return () => h('iframe', { ref: iframeRef })
  }
}
