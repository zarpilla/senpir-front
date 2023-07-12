<script setup>
import { ref } from 'vue'
import axios from 'axios'
import localforage from 'localforage'

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
const loaded = ref(false)

const audioToBase64 = async (audioFile) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => { 
      // console.log('e.target.result', e.target.result)
      resolve(e.target.result)
    };
    reader.readAsDataURL(audioFile);
  });
}


const saveToIDB = async (url) => {
  const item = await localforage.getItem(url)
  if (!item) {
    const config = { responseType: 'blob' };
    const response = await axios.get(url, config)
    const base64 = await audioToBase64(response.data)
    await localforage.setItem(url, base64)    
  }  
  const stored = await localforage.getItem(url)
  return stored
  
}


const base64Audio = ref("")

if (props.audio && props.audio.data && props.audio.data.attributes) {
  audioInfo.value = props.audio.data.attributes
  const url = `${apiBase}${audioInfo.value.url}`
  saveToIDB(url).then((base64) => {
    base64Audio.value = base64;
    loaded.value = true
  })
}

</script>

<template>
  <div class="audio-wrapper mb-45" :class="class" v-if="audio && audio.data && audio.data.attributes && loaded">        
    <div class="d-flex text-center justify-content-center sound-wrapper">
      <img src="@/assets/images/sound.svg" class="sound" alt="" />
      <img src="@/assets/images/ear.svg" class="sound ear" alt="" />
      <span class="txt">ESCOLTAR EL TEXT</span>
    </div>
    <audio controls>
      <source :src="base64Audio" :type="audio.data.attributes.mime">
      El teu navegador no permet escoltar audio
    </audio> 
  </div>

</template>

<style scoped>
.audio-wrapper {
  border-radius: 15px;
  background: var(--senpir-verd-clar, #E0F0E5);
  padding: 16px 10px;
  text-align: center;
}
.sound-wrapper{
  margin: 6px auto 16px;
}
.sound{
  margin-right: 4px;
}
.ear {
  margin-right: 8px;
}
.txt {

/* Botó/Medium */
font-size: 14px;
font-weight: 600;
line-height: 17px;
letter-spacing: 1.5px;
text-transform: uppercase;
}
audio {
  border-radius: 20px;
}
.mb-45{
  margin-bottom: 2.2rem !important;
}
</style>
