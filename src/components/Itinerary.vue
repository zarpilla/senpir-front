<script setup>
import { ref, onMounted } from 'vue'
import { useItineraryStore } from '../stores/itinerary'


const itineraryStore = useItineraryStore();


itineraryStore.loadItinerary().then(itinerary => {
  console.log('itinerary', itineraryStore.data.value)
})

const location = ref({})

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (loc) {

      location.value = loc
      console.log(loc.coords.latitude);
      console.log(loc.coords.longitude);
      console.log(loc.coords.accuracy);
      console.log('loc', loc)

    },
      function error(msg) { alert('Please enable your GPS position feature.'); console.error('err', msg) },
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
  } else {
    alert("Geolocation API is not supported in your browser.");
  }

})

</script>

<template>
  <div class="greetings">
    <h1>Itinerary</h1>
    <div>latitude: {{ location?.coords?.latitude }}</div>
    <div>longitude: {{ location?.coords?.longitude }}</div>
    <div>accuracy: {{ location?.coords?.accuracy }}</div>
    <pre>{{ itineraryStore.data }}</pre>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

pre {
  height: 50vh;
  overflow-y: scroll;
}
</style>
