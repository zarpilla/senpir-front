<script setup>
import { ref, onMounted, computed } from 'vue'
import { useItineraryStore } from '../stores/itinerary'
import { useGameStore } from '../stores/game'
import { useLocationStore } from '../stores/location'
import ItineraryOffilineLoader from './ItineraryOffilineLoader.vue'
import query from '../utils/query'


const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  }
})

const route = query.getSlugFromHash()

// const itineraryStore = useItineraryStore();
const locationStore = useLocationStore();

const gameStore = useGameStore();

// const load = () => {
//   itineraryStore.loadItinerary().then(itinerary => {
//   console.log('itinerary', itinerary)
//   if (!gameStore.started) {
//     gameStore.start(route, itineraryStore.data.value.id)
//     gameStore.startActivities(route, itineraryStore.data.value.attributes.activities)
//   }


// })
// }

// load()



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

// const canFinish = computed(() => gameStore.canFinish || gameStore.answers[gameStore.answers.length - 1] !== '')

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
  <div class="container text-center" v-if="itinerary">

    <img src="@/assets/images/walking.svg" class="walking mt-4 mb-4" alt="" />
    <h1 class="mb-3">{{ itinerary.attributes.name }}</h1>
    <div class="separa mb-3"></div>
    <div class="place">{{ itinerary.attributes.place }}</div>
    <div class="mb-2">{{ itinerary.attributes.city }}</div>
    
    <itinerary-offiline-loader></itinerary-offiline-loader>

    <!-- <div class="debug">
      latitude: {{ location?.coords?.latitude }}<br>
      longitude: {{ location?.coords?.longitude }}<br>
      accuracy: {{ location?.coords?.accuracy }}<br>
      answers: {{ gameStore.answers }}<br>
      canFinish: {{ canFinish }}<br>
      point: {{ gameStore.point }}
    </div> -->


  </div>
</template>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 30px;
  line-height: 32px;
}

.separa {
  width: 12vw;
  height: 0px;
  /* Senpir_verd */
  border: 2px solid #49A986;
  margin: auto;
}

.place{
  font-weight: 600;
}
/* 
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
} */
</style>
