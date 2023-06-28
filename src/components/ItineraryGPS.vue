<script setup>
import { ref, onMounted, computed } from 'vue'
import { useLocationStore } from '../stores/location'

const locationStore = useLocationStore();

const location = ref({})


const optionsPosition = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 10000,
};

const successPosition = (pos) => {

  location.value = pos
  if (pos.coords.latitude && pos.coords.longitude) {
    locationStore.setEnabled(true)
    locationStore.setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
  }
}

const errorPosition = (err) => {
  locationStore.setEnabled(false)
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
    locationStore.setEnabled(false)
  }

})

</script>

<template>
</template>

