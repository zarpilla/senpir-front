<script setup>
import Itinerary from '../components/Itinerary.vue'
import ItineraryClue from '../components/ItineraryClue.vue'
import ItineraryGPS from '../components/ItineraryGPS.vue'
import ItineraryHeader from '../components/ItineraryHeader.vue'
import ItineraryHeaderStart from '../components/ItineraryHeaderStart.vue'

import { watch, ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useItineraryStore } from '@/stores/itinerary'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute()

const itineraryStore = useItineraryStore()
const gameStore = useGameStore()

const props = defineProps({
  start: {
    type: Boolean,
    required: false
  },
  mid: {
    type: Boolean,
    required: false
  },
  end: {
    type: Boolean,
    required: false
  }
})

// onMounted(async () => {
//   await router.isReady();
// });

const itinerary = ref(null)
const game = ref(null)

const load = () => {
  itineraryStore.loadItinerary(route.params.slug).then(it => {
    itinerary.value = it
    gameStore.start(it, true).then(() => {
      game.value = gameStore.getGame(route.params.slug)
    })    
  })
}

load()


watch(() => route.params.slug, (newValue) => {
  if (newValue) {
    load()
  }
})

</script>
<template>
  <div v-if="itinerary && game">
    <ItineraryGPS></ItineraryGPS>
    <ItineraryHeader v-if="!start" :itinerary="itinerary"></ItineraryHeader>
    <ItineraryHeaderStart v-if="start" :itinerary="itinerary"></ItineraryHeaderStart>
    <Itinerary :itinerary="itinerary" :mid="mid" :end="end"></Itinerary>
    <ItineraryClue :itinerary="itinerary"></ItineraryClue>
  </div>
</template>

<style></style>
