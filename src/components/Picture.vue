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
  <div class="picture-wrapper" :class="class" v-if="image && image.data && Array.isArray(image.data)">    
    <!-- <template v-for="img in image.data">
      <img v-if="image.data[0].attributes.formats.small.url" :alt="image.data[0].attributes.alternativeText" :src="apiBase + image.data[0].attributes.formats.small.url" />    
      <img v-else :alt="image.data[0].attributes.alternativeText" :src="apiBase + image.data[0].attributes.url" />    
    </template> -->
    <img v-if="image.data[0].attributes.formats.small.url" :alt="image.data[0].attributes.alternativeText" :src="apiBase + image.data[0].attributes.formats.small.url" />    
    <img v-else :alt="image.data[0].attributes.alternativeText" :src="apiBase + image.data[0].attributes.url" />
  </div>

  <div class="picture-wrapper" :class="class" v-if="image && image.data && !Array.isArray(image.data) && image.data.attributes">
    <img v-if="image.data.attributes.formats && image.data.attributes.formats.small && image.data.attributes.formats.small.url" :alt="image.data.attributes.alternativeText" :src="apiBase + image.data.attributes.formats.small.url" />    
    <img v-else :alt="image.data.attributes.alternativeText" :src="apiBase + image.data.attributes.url" />    
  </div>
</template>

<style scoped>
img {max-width: 100%;}

.rounded img{
  border-radius: 15px;
}
.w-100-img img {
  width: 100%;
}
</style>
