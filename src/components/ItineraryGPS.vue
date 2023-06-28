<script setup>
import { ref, onMounted, computed } from 'vue'
import { useGameStore } from '../stores/game'
import { useLocationStore } from '../stores/location'
import Picture from './Picture.vue'
import Audio from './Audio.vue'
import Markdown from 'vue3-markdown-it';
import Next from './Next.vue'


const locationStore = useLocationStore();

const location = ref({})


const optionsPosition = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 10000,
};

const successPosition = (pos) => {

  location.value = pos
  // console.log('gps', pos)
  if (pos.coords.latitude && pos.coords.longitude) {
    locationStore.setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
  }
}

const errorPosition = (err) => {
  console.error(`Please enable your GPS position feature. ERROR(${err.code}): ${err.message}`);
}

onMounted(() => {
  if (navigator.geolocation) {
    // console.log('navigator.geolocation', navigator.geolocation)
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(successPosition, errorPosition, optionsPosition);
    }, 3 * 1000)

  } else {
    console.warn("Geolocation API is not supported in your browser.");
  }

})

</script>

<template>
</template>

