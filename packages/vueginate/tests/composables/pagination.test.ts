import { usePagination } from '@/composables/pagination'
import { ref } from 'vue'

type PaginatonData = {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  pagesToShow: number
  fixedLength: boolean
}

const initialData: PaginatonData = Object.freeze({
  currentPage: 9,
  totalItems: 86,
  itemsPerPage: 5,
  pagesToShow: 2,
  fixedLength: false,
})

const testData = {
  currentPage: ref<number>(initialData.currentPage),
  totalItems: ref<number>(initialData.totalItems),
  itemsPerPage: ref<number>(initialData.itemsPerPage),
  pagesToShow: ref<number>(initialData.pagesToShow),
  fixedLength: ref<boolean>(initialData.fixedLength),
}

const pagination = usePagination(
  testData.currentPage,
  testData.totalItems,
  testData.itemsPerPage,
  testData.pagesToShow,
  testData.fixedLength
)

const testCases = [
  {
    description: 'middle current page',
    data: { currentPage: 9, totalItems: 86, itemsPerPage: 5, pagesToShow: 2, fixedLength: false },
    expected: {
      current: 9,
      total: 18,
      isFirst: false,
      isLast: false,
      next: 10,
      previous: 8,
      items: 9,
      ellipsis: [
        { index: 1, value: true },
        { index: 7, value: true },
      ],
    },
  },
  {
    description: 'first page',
    data: { currentPage: 1, totalItems: 86, itemsPerPage: 5, pagesToShow: 2, fixedLength: false },
    expected: {
      current: 1,
      total: 18,
      isFirst: true,
      isLast: false,
      next: 2,
      previous: 1,
      items: 5,
      ellipsis: [{ index: 3, value: true }],
    },
  },
  {
    description: 'last page',
    data: { currentPage: 18, totalItems: 86, itemsPerPage: 5, pagesToShow: 2, fixedLength: false },
    expected: {
      current: 18,
      total: 18,
      isFirst: false,
      isLast: true,
      next: 18,
      previous: 17,
      items: 5,
      ellipsis: [{ index: 1, value: true }],
    },
  },
  {
    description: 'items per page',
    data: { currentPage: 9, totalItems: 86, itemsPerPage: 7, pagesToShow: 2, fixedLength: false },
    expected: {
      current: 9,
      total: 13,
      isFirst: false,
      isLast: false,
      next: 10,
      previous: 8,
      items: 9,
      ellipsis: [
        { index: 1, value: true },
        { index: 8, value: false },
      ],
    },
  },
  {
    description: 'show all pages',
    data: { currentPage: 9, totalItems: 86, itemsPerPage: 5, pagesToShow: -1, fixedLength: false },
    expected: {
      current: 9,
      total: 18,
      isFirst: false,
      isLast: false,
      next: 10,
      previous: 8,
      items: 18,
      ellipsis: [],
    },
  },
  {
    description: 'do not show pages between ellipsis and current page',
    data: { currentPage: 9, totalItems: 86, itemsPerPage: 5, pagesToShow: 0, fixedLength: false },
    expected: {
      current: 9,
      total: 18,
      isFirst: false,
      isLast: false,
      next: 10,
      previous: 8,
      items: 5,
      ellipsis: [
        { index: 1, value: true },
        { index: 3, value: true },
      ],
    },
  },
  {
    description: 'fixed length left',
    data: { currentPage: 3, totalItems: 86, itemsPerPage: 5, pagesToShow: 2, fixedLength: true },
    expected: {
      current: 3,
      total: 18,
      isFirst: false,
      isLast: false,
      next: 4,
      previous: 2,
      items: 9,
      ellipsis: [
        { index: 1, value: false },
        { index: 7, value: true },
      ],
    },
  },
  {
    description: 'fixed length right',
    data: { currentPage: 15, totalItems: 86, itemsPerPage: 5, pagesToShow: 2, fixedLength: true },
    expected: {
      current: 15,
      total: 18,
      isFirst: false,
      isLast: false,
      next: 16,
      previous: 14,
      items: 9,
      ellipsis: [
        { index: 1, value: true },
        { index: 7, value: false },
      ],
    },
  },
]

function setTestData(data: PaginatonData) {
  testData.currentPage.value = data.currentPage
  testData.totalItems.value = data.totalItems
  testData.itemsPerPage.value = data.itemsPerPage
  testData.pagesToShow.value = data.pagesToShow
  testData.fixedLength.value = data.fixedLength
}

describe.each(testCases)('usePagination', ({ description, data, expected }) => {
  describe(`${description}`, () => {
    beforeAll(() => {
      setTestData(data)
    })

    test('total pages', () => {
      expect(pagination.totalPages.value).toBe(expected.total)
    })

    test('page position', () => {
      expect(pagination.currentPage.value).toBe(expected.current)
      expect(pagination.isFirstPage.value).toBe(expected.isFirst)
      expect(pagination.isLastPage.value).toBe(expected.isLast)
    })

    test('directional pages', () => {
      expect(pagination.previousPage.value).toBe(expected.previous)
      expect(pagination.nextPage.value).toBe(expected.next)
    })

    test('total page items', () => {
      expect(pagination.pages.value.length).toBe(expected.items)
    })

    test.each(expected.ellipsis)('ellipsis position %i', (item) => {
      expect(pagination.pages.value.at(item.index)?.isEllipsis()).toBe(item.value)
    })
  })
})
