## Vite Plugin Vue Style In Template

Extract the style tags from the Vue component into basic style tags.

## Usage

```bash
pnpm install vite-plugin-vue-style-in-template
```

```ts
import vueStyleInTemplate from 'vite-plugin-vue-style-in-template'

export default defineConfig({
  plugins: [vueStyleInTemplate()],
})
```

In [vitepress](https://vitepress.dev/)

```ts
import vueStyleInTemplate from 'vite-plugin-vue-style-in-template'

export default defineConfig({
  plugins: [
    vueStyleInTemplate({
      include: [/\.vue$/, /\.md$/],
    }),
  ],
})
```

## Example

`<style>` tags within the template will be extracted into corresponding `<style>` tags based on whether they contain the `scoped` attribute. If the original file does not have `<style>` tags, new `<style>` tags will be inserted.

### Basic Usage

transform:

```vue
<template>
  <div>
    <h1 class="main-title">Hello World</h1>
    <style scoped>
      .main-title {
        color: red;
      }
    </style>
    <p class="text">Some text</p>
    <style>
      .text {
        color: blue;
        font-size: 16px;
      }
    </style>
  </div>
</template>

<style>
.body {
  background-color: #f0f0f0;
}
</style>

```

to:

```vue
<template>
  <div>
    <h1 class="main-title">Hello World</h1>
    <p class="text">Some text</p>
  </div>
</template>

<style>
.body {
  background-color: #f0f0f0;
}
.text {
  color: blue;
  font-size: 16px;
}
</style>
<style scoped>
.main-title {
  color: red;
}
</style>
```

### With `slot`

You can use `<style>` tags within the `<slot>` tags to style the content of the slot.

`comp.vue`:

```vue
<template>
  <div>
    <div>
      <slot name="header" />
    </div>
    <div>
      <slot name="content" />
    </div>
  </div>
</template>
```

`app.vue`:

```vue
<script setup lang="ts">
import Comp from './comp.vue'
</script>
<template>
  <Comp>
    <template #header>
      <div class="header">Header</div>
      <style scoped>
        .header {
          color: red;
        }
      </style>
    </template>
    <template #content>
      <div class="content">Content</div>
      <style scoped>
        .content {
          color: blue;
        }
      </style>
    </template>
  </Comp>
</template>
```
