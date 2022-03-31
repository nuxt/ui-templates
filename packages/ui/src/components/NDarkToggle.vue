<script setup lang="ts">
import { useToggle } from '@vueuse/core'

const mode = useColorMode()
const isDark = computed<boolean>({
  get () {
    return mode.value === 'dark'
  },
  set (v) {
    mode.preference = v ? 'dark' : 'light'
  }
})
const toggle = useToggle(isDark)

const context = {
  mode,
  isDark,
  toggle
}
</script>

<template>
  <slot v-bind="context" />
</template>
