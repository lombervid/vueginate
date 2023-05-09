<div align="center">

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/lombervid/vueginate?display_name=tag&sort=semver)](https://github.com/lombervid/vueginate)
[![npm](https://img.shields.io/npm/v/vueginate)](https://www.npmjs.com/package/vueginate)
[![tests](https://github.com/lombervid/vueginate/actions/workflows/tests.yml/badge.svg)](https://github.com/lombervid/vueginate/actions/workflows/tests.yml?query=branch%3Amain)
[![GitHub](https://img.shields.io/github/license/lombervid/vueginate)](https://github.com/lombervid/vueginate/blob/main/LICENSE)

</div>

# Vueginate

> Pagination component for Vue 3

**_Vueginate_** is a simple pagination component for Vue 3 applications. It includes out-of-the-box component variants for some of the most popular CSS Frameworks, such as [_Tailwind CSS_](https://tailwindcss.com/), [_Bootstrap_](https://getbootstrap.com/) (4 and 5) and [_Bulma_](https://bulma.io/).

## Installation

```sh
# or `yarn add vueginate` | `npm install vueginate`
pnpm add vueginate
```

## Usage

### Import the component

Import the component and use it in your template.

```html
<script setup>
  import { reactive } from 'vue'
  import { Vueginate } from 'vueginate'

  const data = reactive({
    totalItems: 86,
    currentPage: 9,
    itemsPerPage: 5,
  })
</script>

<template>
  <Vueginate
    :total-items="data.totalItems"
    :current-page="data.currentPage"
    :items-per-page="data.itemsPerPage"
  />
</template>
```

The above example will generate a code similar to the following:

```html
<nav aria-label="Page navigation">
  <ul class="vueginate-container">
    <li>
      <a class="vg-item vg-arrow" href="#">
        <span class="sr-only">Prev Page</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </li>
    <li><a class="vg-item vg-page" href="#">1</a></li>
    <li><span class="vg-item vg-disabled">…</span></li>
    <li><a class="vg-item vg-page" href="#">7</a></li>
    <li><a class="vg-item vg-page" href="#">8</a></li>
    <li><span class="vg-item vg-active" aria-current="page">9</span></li>
    <li><a class="vg-item vg-page" href="#">10</a></li>
    <li><a class="vg-item vg-page" href="#">11</a></li>
    <li><span class="vg-item vg-disabled">…</span></li>
    <li><a class="vg-item vg-page" href="#">18</a></li>
    <li>
      <a class="vg-item vg-arrow" href="#">
        <span class="sr-only">Next Page</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </li>
  </ul>
</nav>
```

## Styling your component

### Using default styles

**_Vueginate_** includes a default styles you can import inside your script:

```html
<script setup>
  import 'vueginate/css/vueginate.css'
</script>
```

or from your style:

```html
<style>
  /* or `@import 'vueginate/css/vueginate.css';` */
  @import 'vueginate';
</style>
```

### Custom styles

Or your can style your component base in the classes it has:

- `vueginate-container`: pagination container `ul`
- `vg-item`: every item in the list
- `vg-page`: any item that is not `...`, previous/next buttons, or the current page
- `vg-active`: current page
- `vg-arrow`: previous/next button
- `vg-disabled`: used for `...` items and for previous button (when `currentPage === 1`) and next button (when `currentPage === totalPages`)

All classes are applied to the `a` (or `span` if disabled or active) element inside the `li`

## Using with CSS Frameworks

**_Vueginate_** includes component variants for _Tailwind_, _Bootstrap_ and _Bulma_. You can use them importing their respective component:

```html
<script setup>
  import { reactive } from 'vue'
  import { VueginateTailwind } from 'vueginate'
  import { VueginateBootstrap } from 'vueginate'
  import { VueginateBulma } from 'vueginate'

  const data = reactive({
    totalItems: 86,
    currentPage: 9,
    itemsPerPage: 5,
  })
</script>

<template>
  <VueginateTailwind
    :total-items="data.totalItems"
    :current-page="data.currentPage"
    :items-per-page="data.itemsPerPage"
  />

  <VueginateBootstrap
    :total-items="data.totalItems"
    :current-page="data.currentPage"
    :items-per-page="data.itemsPerPage"
  />

  <VueginateBulma
    :total-items="data.totalItems"
    :current-page="data.currentPage"
    :items-per-page="data.itemsPerPage"
  />
</template>
```

## Roadmap

- [ ] Documentation
- [ ] Support to be able to change the default `ul` container to `div`
- [ ] Support to have a fixed size for the component

## License

[MIT](https://github.com/lombervid/vueginate/blob/main/LICENSE)
