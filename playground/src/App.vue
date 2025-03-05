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
<script setup lang="ts">
import Comp from './comp.vue'
</script>
