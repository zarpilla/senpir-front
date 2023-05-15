<script setup>
defineProps({
  image: {
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
  <div class="picture-wrapper" :class="class" v-if="image && image.data && image.data.attributes">
    <img :alt="image.data.attributes.alternativeText" :src="apiBase + image.data.attributes.url" />    
  </div>
</template>

<style scoped>
</style>
