<script setup>
import { ref, onMounted, computed } from 'vue'
import { useItineraryStore } from '../stores/itinerary'
import { useGameStore } from '../stores/game'
import { useLocationStore } from '../stores/location'

import Picture from './Picture.vue'
import ItineraryOffilineLoader from './ItineraryOffilineLoader.vue'


const itineraryStore = useItineraryStore();
const locationStore = useLocationStore();

const gameStore = useGameStore();


itineraryStore.loadItinerary().then(itinerary => {
  console.log('itinerary', itinerary)
  if (!gameStore.started) {    
    gameStore.start(itineraryStore.slug, itineraryStore.data.value.id)  
    gameStore.startActivities(itineraryStore.data.value.attributes.activities)        
  }
  
  
})



const location = ref({})

// const itinerary = computed(() => itineraryStore.data && itineraryStore.data.value ? itineraryStore.data.value.attributes : null)

const optionsPosition = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 10000,
};

const successPosition = (pos) => {
  
  // console.log('successPosition', pos)
  // if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
  //   console.log("Congratulations, you reached the target");
  //   navigator.geolocation.clearWatch(id);
  // }

  location.value = pos
  //
  if (pos.coords.latitude && pos.coords.longitude) {
    locationStore.setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
  }    
}

const errorPosition = (err) => {
  console.error(`Please enable your GPS position feature. ERROR(${err.code}): ${err.message}`);
}

const canFinish = computed(() => gameStore.canFinish || gameStore.answers[gameStore.answers.length - 1] !== '')

onMounted(() => {
  if (navigator.geolocation) {

    setInterval(() => {
      navigator.geolocation.getCurrentPosition(successPosition, errorPosition, optionsPosition);
    }, 3 * 1000)

  } else {
    console.warn("Geolocation API is not supported in your browser.");
  }

})

</script>

<template>
  <div class="greetings" v-if="itineraryStore.data && itineraryStore.data.value">    
    <h1>{{ itineraryStore.data.value.attributes.name }}</h1>
    <div>{{ itineraryStore.data.value.attributes.place }}</div>
    <div class="mb-2">{{ itineraryStore.data.value.attributes.city }}</div>
    <Picture class="mt-2" :image="itineraryStore.data.value.attributes.image"></Picture>
    
    <itinerary-offiline-loader></itinerary-offiline-loader>

    <div class="debug">
      latitude: {{ location?.coords?.latitude }}<br>
      longitude: {{ location?.coords?.longitude }}<br>
      accuracy: {{ location?.coords?.accuracy }}<br>
      answers: {{ gameStore.answers }}<br>
      canFinish: {{ canFinish }}<br>
      point: {{ gameStore.point }}
    </div>
    

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

.mt-2 {
  margin-top: 2rem;
}
.mb-2{
  margin-bottom: 2rem;
}
.is-flex{
  display: flex;
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
.debug{
  background: #eee;
  margin-bottom: 20px;
}
</style>
