<script setup>
import { ref, watch } from 'vue'
import distanceSvc from '../utils/distance'
import { useLocationStore } from '../stores/location'
import utmLatlng from 'utm-latlng'

const props = defineProps({
  coords1: {
    type: Object,
    required: true
  }
})

const distance = ref(0)
const locationStore = useLocationStore();

var utm = new utmLatlng()

const lngLat = ref({})

// utmLatlng.

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
  <div class="container distance-wrapper">
    <div class="separa mt-0 mb-3"></div>
    <div class="d-flex justify-content-center">
      <img src="@/assets/images/distance.svg" class="mx-2" alt="" />
      <b class="mx-1">Distància fins la fita</b> {{ distance.toFixed(0) }}m
    </div>
  </div>
</template>

<style scoped>
.distance-wrapper {
  margin: 1rem 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
}
.separa {
  width: 12vw;
  height: 0px;
  /* Senpir_verd */
  border: 2px solid #49A986;
  margin: auto;
}

</style>


