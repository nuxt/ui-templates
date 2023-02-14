<script setup lang="ts">
import { resolveComponent } from '#imports'

defineProps<{
  to?: string
  icon?: string
}>()

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <Component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    v-bind="$attrs"
    class="n-button n-transition n-button-base hover:n-button-hover active:n-button-active focus-visible:n-focus-base n-disabled:n-disabled"
  >
    <slot name="icon">
      <NIcon v-if="icon" :icon="icon" class="n-button-icon" />
    </slot>
    <slot />
  </Component>
</template>
