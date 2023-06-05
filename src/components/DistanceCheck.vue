<script setup>
import { ref } from 'vue'
import distanceSvc from '../utils/distance'
import { useLocationStore } from '../stores/location'

const props = defineProps({
  coords1: {
    type: Object,
    required: true
  }
})

const distance = ref(1000)
const locationStore = useLocationStore();

console.log('locationStore', locationStore.latitude, locationStore.latitude)

distance.value = distanceSvc.distance(props.coords1.latitude, props.coords1.longitude, locationStore.latitude, locationStore.longitude)

</script>

<template>
  <div class="distance-wrapper">    
    {{ distance }}
  </div>

</template>

<style scoped>
</style>


