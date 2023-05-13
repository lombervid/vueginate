import { DEFAULT_STYLES, useStyles } from '@/composables/styles'
import type { PaginationStyles } from '@/types'
import { ref } from 'vue'

const testStyles = ref<PaginationStyles>({})
const testDefaultStyles = ref<PaginationStyles | boolean>(true)

const styles = useStyles(testStyles, testDefaultStyles)

const EMPTY_STYLES: PaginationStyles = Object.freeze({
  container: [],
  item: [],
  page: [],
  arrow: [],
  active: [],
  disabled: [],
  readers: [],
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
      expected: EMPTY_STYLES,
    },
    {
      defaults: {},
      expected: DEFAULT_STYLES,
    },
    {
      defaults: { item: ['custom-class'] },
      expected: { ...DEFAULT_STYLES, item: ['custom-class'] },
    },
    {
      defaults: { disabled: [''], active: ['custom-active'] },
      expected: { ...DEFAULT_STYLES, disabled: [''], active: ['custom-active'] },
    },
    {
      defaults: {
        container: ['custom-container'],
        item: ['custom-item'],
        page: ['custom-page'],
        arrow: ['custom-arrow'],
        active: ['custom-active'],
        disabled: ['custom-disabled'],
        readers: ['custom-readers'],
      },
      expected: {
        container: ['custom-container'],
        item: ['custom-item'],
        page: ['custom-page'],
        arrow: ['custom-arrow'],
        active: ['custom-active'],
        disabled: ['custom-disabled'],
        readers: ['custom-readers'],
      },
    },
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
        container: [...(DEFAULT_STYLES.container ?? []), 'custom-container'],
      },
    },
    {
      custom: {
        container: ['custom-container'],
        item: ['custom-item'],
        page: ['custom-page'],
        arrow: ['custom-arrow'],
        active: ['custom-active'],
        disabled: ['custom-disabled'],
        readers: ['custom-readers'],
      },
      expected: {
        container: [...(DEFAULT_STYLES.container ?? []), 'custom-container'],
        item: [...(DEFAULT_STYLES.item ?? []), 'custom-item'],
        page: [...(DEFAULT_STYLES.page ?? []), 'custom-page'],
        arrow: [...(DEFAULT_STYLES.arrow ?? []), 'custom-arrow'],
        active: [...(DEFAULT_STYLES.active ?? []), 'custom-active'],
        disabled: [...(DEFAULT_STYLES.disabled ?? []), 'custom-disabled'],
        readers: [...(DEFAULT_STYLES.readers ?? []), 'custom-readers'],
      },
    },
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
        disabled: [...(DEFAULT_STYLES.disabled ?? []), 'custom-disabled'],
      },
    },
    {
      custom: { disabled: ['custom-disabled'] },
      defaults: false,
      expected: { ...EMPTY_STYLES, disabled: ['custom-disabled'] },
    },
    {
      custom: { container: ['custom-container'] },
      defaults: { ...EMPTY_STYLES, container: ['default-container'] },
      expected: { ...EMPTY_STYLES, container: ['default-container', 'custom-container'] },
    },
    {
      custom: {
        container: ['custom-container'],
        item: ['custom-item'],
        page: ['custom-page'],
        arrow: ['custom-arrow'],
        active: ['custom-active'],
        disabled: ['custom-disabled'],
        readers: ['custom-readers'],
      },
      defaults: {
        container: ['default-container'],
        item: ['default-item'],
        page: ['default-page'],
        arrow: ['default-arrow'],
        active: ['default-active'],
        disabled: ['default-disabled'],
        readers: ['default-readers'],
      },
      expected: {
        container: ['default-container', 'custom-container'],
        item: ['default-item', 'custom-item'],
        page: ['default-page', 'custom-page'],
        arrow: ['default-arrow', 'custom-arrow'],
        active: ['default-active', 'custom-active'],
        disabled: ['default-disabled', 'custom-disabled'],
        readers: ['default-readers', 'custom-readers'],
      },
    },
  ])(
    'default and custom styles customization ($defaults, $custom) -> $expected',
    ({ custom, defaults, expected }) => {
      testStyles.value = custom
      testDefaultStyles.value = defaults

      expect(styles.value).toStrictEqual(expected)
    }
  )
})
