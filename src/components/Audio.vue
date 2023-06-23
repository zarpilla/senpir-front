<script setup>
import { ref } from 'vue'
import offline from '../offline/index'

const props = defineProps({
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

const audioInfo = ref("")

if (props.audio && props.audio.data && props.audio.data.attributes) {
  audioInfo.value = props.audio.data.attributes
  const url = `${apiBase}${audioInfo.value.url}`
  // offline.get(url).then(() => { console.log('offline', url)})
  const audio = new Audio(url);
  // console.log('audio', audio)
}

</script>

<template>
  <div class="audio-wrapper" :class="class" v-if="audio && audio.data && audio.data.attributes">    
    <audio controls>
      <source :src="`${apiBase}${audio.data.attributes.url}`" :type="audio.data.attributes.mime">
      El teu navegador no permet escoltar audio
    </audio> 
  </div>

</template>

<style scoped>
</style>
