<script setup>
import { ref, watch } from 'vue'
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

// console.log('locationStore 0', props.coords1)
if (props.coords1 && props.coords1.latitude) {
    distance.value = distanceSvc.distance(props.coords1.longitude, props.coords1.latitude, locationStore.longitude, locationStore.latitude)
}

watch(() => locationStore.latitude, (newValue) => {
  if (newValue) {
    distance.value = distanceSvc.distance(props.coords1.longitude, props.coords1.latitude, locationStore.longitude, locationStore.latitude)
  }
})

watch(() => locationStore.longitude, (newValue) => {
  if (newValue) {
    distance.value = distanceSvc.distance(props.coords1.longitude, props.coords1.latitude, locationStore.longitude, locationStore.latitude)
  }
})

</script>

<template>
  <div class="distance-wrapper">    
    {{ distance }}
  </div>

</template>

<style scoped>
</style>


