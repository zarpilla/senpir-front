<script setup>
import { ref, watch } from 'vue'
import distanceSvc from '../utils/distance'
import { useLocationStore } from '../stores/location'
import * as utmLatlng from 'utm-latlng'

const props = defineProps({
  coords1: {
    type: Object,
    required: true
  }
})

const distance = ref(1000)
const locationStore = useLocationStore();

const utm = new utmLatlng()
const lngLat = ref({})

lngLat.value = utm.convertUtmToLatLng(props.coords1.latitude, props.coords1.longitude, '31', 'T')


if (props.coords1 && props.coords1.latitude) {
  lngLat.value = utm.convertUtmToLatLng(props.coords1.latitude, props.coords1.longitude, '31', 'T')
  distance.value = distanceSvc.distance(lngLat.value.lat, lngLat.value.lng, locationStore.latitude, locationStore.longitude)
}

watch(() => props.coords1.latitude, (newValue) => {
  if (newValue) {

    lngLat.value = utm.convertUtmToLatLng(props.coords1.latitude, props.coords1.longitude, '31', 'T')
    distance.value = distanceSvc.distance(lngLat.value.lat, lngLat.value.lng, locationStore.latitude, locationStore.longitude)
  }
})

watch(() => locationStore.latitude, (newValue) => {
  if (newValue) {
    distance.value = distanceSvc.distance(lngLat.value.lat, lngLat.value.lng, locationStore.latitude, locationStore.longitude)
  }
})

watch(() => locationStore.longitude, (newValue) => {
  if (newValue) {
    distance.value = distanceSvc.distance(lngLat.value.lat, lngLat.value.lng, locationStore.latitude, locationStore.longitude)
  }
})

</script>

<template>
  <div class="distance-wrapper">
    <!-- distance: {{ distance.toFixed(0) }} m -->
  </div>
</template>

<style scoped>
.distance-wrapper{
  margin: 1rem 0;
}
</style>


