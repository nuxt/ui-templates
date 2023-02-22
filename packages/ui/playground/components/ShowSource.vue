<script setup>
const props = defineProps({
  src: String
})
const show = ref(false)
const url = computed(() => `https://emgithub.com/embed-v2.js?target=${encodeURIComponent(props.src)}&style=default&type=code&showFullPath=on&showFileMeta=on&showCopy=on`)
</script>

<template>
  <span n="xs" class="cursor-pointer n-link n-link-base hover:n-link-hover n-transition" @click="show = !show">
    {{ show ? 'Hide' : 'Show' }} source
  </span>
  <div v-if="show">
    <Script :src="url" />
  </div>
</template>
