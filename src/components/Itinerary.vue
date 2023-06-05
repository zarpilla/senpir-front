<script setup>
import { ref, onMounted, computed } from 'vue'
import { useItineraryStore } from '../stores/itinerary'
import { useGameStore } from '../stores/game'
import { useLocationStore } from '../stores/location'

import Picture from './Picture.vue'
import Activity from './Activity.vue'
import Audio from './Audio.vue'
import ActivitySort from './ActivitySort.vue'

const itineraryStore = useItineraryStore();
const locationStore = useLocationStore();

const gameStore = useGameStore();


itineraryStore.loadItinerary().then(itinerary => {
  console.log('itinerary', itinerary)
  if (!gameStore.started) {
    gameStore.start(itineraryStore.slug, itineraryStore.data.value.attributes.activities)
  }
})



const location = ref({})

// const itinerary = computed(() => itineraryStore.data && itineraryStore.data.value ? itineraryStore.data.value.attributes : null)

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (loc) {

      location.value = loc

      if (loc.coords.latitude && loc.coords.longitude) {
        locationStore.setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude })
      }
      // console.log(loc.coords.latitude);
      // console.log(loc.coords.longitude);
      // console.log(loc.coords.accuracy);
      // console.log('loc', loc)

    },
      function error(msg) { alert('Please enable your GPS position feature.'); console.error('err', msg) },
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
  } else {
    alert("Geolocation API is not supported in your browser.");
  }

})

</script>

<template>
  <div class="greetings" v-if="itineraryStore.data && itineraryStore.data.value">
    <h1>{{ itineraryStore.data.value.attributes.name }}</h1>
    <div class="mt-2">{{ itineraryStore.data.value.short_description }}</div>
    <div class="mt-2">{{ itineraryStore.data.value.description }}</div>
    <div class="mt-2">latitude: {{ location?.coords?.latitude }}</div>
    <div>longitude: {{ location?.coords?.longitude }}</div>
    <div>accuracy: {{ location?.coords?.accuracy }}</div>

    <div>
      answers: {{ gameStore.answers }}
    </div>
    <div>
      canFinish: {{ gameStore.canFinish }}
    </div>

    <Picture class="mt-2" :image="itineraryStore.data.value.attributes.image"></Picture>
    <Picture class="mt-2" :image="itineraryStore.data.value.attributes.map"></Picture>
    <Audio class="mt-2" :audio="itineraryStore.data.value.attributes.audio"></Audio>

    <!-- <pre>{{ itineraryStore.data.value.attributes.audio }}</pre> -->
    

    <div class="activities" v-for="(activity, i) in itineraryStore.data.value.attributes.activities" :key="activity.id">
      <ActivitySort v-if="activity.type === 'sort'" :activity="activity" :index="i"></ActivitySort>
      <Activity v-else :activity="activity" :index="i"></Activity>
    </div>
    <h2>Final</h2>
    <div class="mt-2">{{ itineraryStore.data.value.attributes.answer_text }}</div>
    <Picture class="mt-2" :image="itineraryStore.data.value.attributes.answer_image"></Picture>
    <Audio :audio="itineraryStore.data.value.attributes.answer_audio"></Audio>    

    <!--     
    <pre class="mt-2">{{ itineraryStore.data.value }}</pre> -->



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
