import { DEFAULT_STYLES, useStyles } from '@/composables/styles'
import type { PaginationStyles } from '@/types'
import { ref } from 'vue'

const testStyles = ref<PaginationStyles>({})
const testDefaultStyles = ref<PaginationStyles | boolean>(true)

const styles = useStyles(testStyles, testDefaultStyles)

const EMPTY_STYLES: PaginationStyles = Object.freeze({
  container: [],
  item: [],
  arrow: [],
  active: [],
  ellipsis: [],
  disabled: []
})

describe('useStyles', () => {
  afterEach(() => {
    testStyles.value = {}
    testDefaultStyles.value = true
  })

  test('default values', () => {
    expect(styles.value).toStrictEqual(DEFAULT_STYLES)
  })

  test.each([
    {
      defaults: false,
      expected: EMPTY_STYLES
    },
    {
      defaults: {},
      expected: DEFAULT_STYLES
    },
    {
      defaults: { item: ['custom-class'] },
      expected: { ...DEFAULT_STYLES, item: ['custom-class'] }
    },
    {
      defaults: { disabled: [''], active: ['custom-active'] },
      expected: { ...DEFAULT_STYLES, disabled: [''], active: ['custom-active'] }
    },
    {
      defaults: {
        container: ['custom-container'],
        item: ['custom-item'],
        arrow: ['custom-arrow'],
        active: ['custom-active'],
        ellipsis: ['custom-ellipsis'],
        disabled: ['custom-disabled']
      },
      expected: {
        container: ['custom-container'],
        item: ['custom-item'],
        arrow: ['custom-arrow'],
        active: ['custom-active'],
        ellipsis: ['custom-ellipsis'],
        disabled: ['custom-disabled']
      }
    }
  ])('default styles customization', ({ defaults, expected }) => {
    testDefaultStyles.value = defaults
    expect(styles.value).toStrictEqual(expected)
  })

  test.each([
    { custom: {}, expected: DEFAULT_STYLES },
    {
      custom: { container: ['custom-container'] },
      expected: {
        ...DEFAULT_STYLES,
        container: [...(DEFAULT_STYLES.container ?? []), 'custom-container']
      }
    },
    {
      custom: {
        container: ['custom-container'],
        item: ['custom-item'],
        arrow: ['custom-arrow'],
        active: ['custom-active'],
        ellipsis: ['custom-ellipsis'],
        disabled: ['custom-disabled']
      },
      expected: {
        container: [...(DEFAULT_STYLES.container ?? []), 'custom-container'],
        item: [...(DEFAULT_STYLES.item ?? []), 'custom-item'],
        arrow: [...(DEFAULT_STYLES.arrow ?? []), 'custom-arrow'],
        active: [...(DEFAULT_STYLES.active ?? []), 'custom-active'],
        ellipsis: [...(DEFAULT_STYLES.ellipsis ?? []), 'custom-ellipsis'],
        disabled: [...(DEFAULT_STYLES.disabled ?? []), 'custom-disabled']
      }
    }
  ])('custom styles ($custom) -> $expected', ({ custom, expected }) => {
    testStyles.value = custom
    expect(styles.value).toStrictEqual(expected)
  })

  test.each([
    {
      custom: { disabled: ['custom-disabled'] },
      defaults: { item: ['default-item'] },
      expected: {
        ...DEFAULT_STYLES,
        item: ['default-item'],
        disabled: ['disabled', 'custom-disabled']
      }
    },
    {
      custom: { disabled: ['custom-disabled'] },
      defaults: false,
      expected: { ...EMPTY_STYLES, disabled: ['custom-disabled'] }
    },
    {
      custom: { container: ['custom-container'] },
      defaults: { ...EMPTY_STYLES, container: ['default-container'] },
      expected: { ...EMPTY_STYLES, container: ['default-container', 'custom-container'] }
    },
    {
      custom: {
        container: ['custom-container'],
        item: ['custom-item'],
        arrow: ['custom-arrow'],
        active: ['custom-active'],
        ellipsis: ['custom-ellipsis'],
        disabled: ['custom-disabled']
      },
      defaults: {
        container: ['default-container'],
        item: ['default-item'],
        arrow: ['default-arrow'],
        active: ['default-active'],
        ellipsis: ['default-ellipsis'],
        disabled: ['default-disabled']
      },
      expected: {
        container: ['default-container', 'custom-container'],
        item: ['default-item', 'custom-item'],
        arrow: ['default-arrow', 'custom-arrow'],
        active: ['default-active', 'custom-active'],
        ellipsis: ['default-ellipsis', 'custom-ellipsis'],
        disabled: ['default-disabled', 'custom-disabled']
      }
    }
  ])(
    'default and custom styles customization ($defaults, $custom) -> $expected',
    ({ custom, defaults, expected }) => {
      testStyles.value = custom
      testDefaultStyles.value = defaults

      expect(styles.value).toStrictEqual(expected)
    }
  )
})
