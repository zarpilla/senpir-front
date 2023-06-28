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


const enabled = ref(false)
enabled.value = locationStore.enabled

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

watch(() => locationStore.enabled, (newValue) => {
  if (newValue) {
    enabled.value = locationStore.enabled
  }
})

</script>

<template>
  <div class="container distance-wrapper ms-auto me-auto">
    <div class="text-center">

      <div v-if="lngLat && lngLat.lat" class="container text-center mt-0 mb-4">
        <div class="d-flex justify-content-center">
          <img src="@/assets/images/location.svg" class="location me-2" alt="" />
          <div class="text-start coords">
            {{ lngLat.lat }},<br>{{ lngLat.lng }}
          </div>
        </div>
      </div>
      <div class="separa mt-0 mb-3"></div>
      <div class="d-flex justify-content-center">
        <img src="@/assets/images/distance.svg" class="mx-2" alt="" />
        <div v-if="enabled && lngLat && lngLat.lat">
          <b class="mx-1">Distància fins la fita</b> {{ distance.toFixed(0) > 1000 ? (distance / 1000).toFixed(2) :
            distance.toFixed(0) }}{{ distance.toFixed(0) > 1000 ? 'km' : 'm' }}
        </div>
        <div v-else class="disabled-gps">
Si vols, pots habilitar el GPS per saber a quina distància et trobes
        </div>
      </div>



      <!-- <div class="z">
      <div v-if="coords1">coords1: {{ coords1.latitude }}, {{ coords1.longitude }}</div>
      <div v-if="lngLat">lngLat: {{ lngLat.lat }}, {{ lngLat.lng }}</div>
      <div v-if="locationStore">position: {{ locationStore.latitude }}, {{ locationStore.longitude }}</div>
    </div> -->
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

.coords {
  /* Text/Small */
  font-size: 14px;
  line-height: 17px;
  font-weight: normal;

}
</style>


