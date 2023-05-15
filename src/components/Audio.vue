<script setup>
defineProps({
  audio: {
    type: Object,
    required: true
  },
  class: {
    type: String,
    required: false
  }
})

const apiBase = import.meta.env.VITE_API_BASE;


</script>

<template>
  <div class="audio-wrapper" :class="class" v-if="audio && audio.data && audio.data.attributes">
    audio
  </div>
</template>

<style scoped>
</style>
