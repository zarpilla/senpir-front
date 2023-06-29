<script setup>
defineProps({
  image: {
    type: Object,
    required: true
  },
  class: {
    type: String,
    required: false
  },
  overlay: {
    type: Boolean,
    required: false
  },
  cover: {
    type: Boolean,
    required: false
  },
  index: {
    type: Number,
    required: false
  }
})

const apiBase = import.meta.env.VITE_API_BASE;

</script>

<template>
  <div class="picture-wrapper" :class="class" v-if="image && image.data && Array.isArray(image.data)">
    <div :class="`overlay bg-color-${index}`" v-if="overlay"></div>
    <img :class="overlay ? 'with-overlay' : 'z' + ' ' + (cover ? 'with-cover' : 'z')"
      v-if="image.data[0].attributes.formats.small.url" :alt="image.data[0].attributes.alternativeText"
      :src="apiBase + image.data[0].attributes.formats.small.url" />
    <img :class="overlay ? 'with-overlay' : 'z' + ' ' + (cover ? 'with-cover' : 'z')" v-else
      :alt="image.data[0].attributes.alternativeText" :src="apiBase + image.data[0].attributes.url" />
  </div>

  <div class="picture-wrapper" :class="class"
    v-if="image && image.data && !Array.isArray(image.data) && image.data.attributes">
    <div :class="`overlay bg-color-${index}`" v-if="overlay"></div>
    <img :class="(overlay ? 'with-overlay' : 'z') + ' ' + (cover ? 'with-cover' : 'z')"
      v-if="image.data.attributes.formats && image.data.attributes.formats.small && image.data.attributes.formats.small.url"
      :alt="image.data.attributes.alternativeText" :src="apiBase + image.data.attributes.formats.small.url" />
    <img :class="overlay ? 'with-overlay' : 'z' + ' ' + (cover ? 'with-cover' : 'z')" v-else
      :alt="image.data.attributes.alternativeText" :src="apiBase + image.data.attributes.url" />
  </div>
</template>

<style scoped>
img {
  max-width: 100%;
}

img.with-overlay {
  mix-blend-mode: multiply;
}

img.with-cover {
  height: 220px;
  object-fit: cover;
}

.rounded img {
  border-radius: 15px;
}

.w-100-img img {
  width: 100%;
}

.zpicture-wrapper {
  position: relative;
}

.overlay {
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 0;
}</style>
