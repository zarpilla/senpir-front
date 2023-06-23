<script setup>
import Itinerary from '../components/Itinerary.vue'
import ItineraryClue from '../components/ItineraryClue.vue'
import ItineraryMap from '../components/ItineraryMap.vue'
import ItineraryHeader from '../components/ItineraryHeader.vue'
import { watch, ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useItineraryStore } from '@/stores/itinerary'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute()

const itineraryStore = useItineraryStore()
const gameStore = useGameStore()

const props = defineProps({
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
  console.log('load')
  itineraryStore.loadItinerary(route.params.slug).then(it => {
    console.log('load it', it)
    itinerary.value = it
    gameStore.start(it).then(() => {
      game.value = gameStore.getGame(route.params.slug)
      console.log('load game', game.value)
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
    <ItineraryHeader :itinerary="itinerary"></ItineraryHeader>
    <Itinerary :itinerary="itinerary" :mid="mid" :end="end"></Itinerary>
    <ItineraryMap :itinerary="itinerary" :start="true"></ItineraryMap>
    <ItineraryClue :itinerary="itinerary"></ItineraryClue>
  </div>
</template>

<style></style>
