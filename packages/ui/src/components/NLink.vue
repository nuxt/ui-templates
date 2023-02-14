<script setup lang="ts">
import { resolveComponent } from '#imports'

defineProps<{
  to?: string
  href?: string
  target?: string
}>()

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <Component
    :is="(href || target) ? 'a' : NuxtLink"
    v-bind="$props"
    class="n-link n-link-base hover:n-link-hover n-transition"
  >
    <slot />
  </Component>
</template>
