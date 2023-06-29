<script setup>
import ItineraryAll from '../components/ItineraryAll.vue'
import ItineraryMap from '../components/ItineraryMap.vue'
import ItineraryHeader from '../components/ItineraryHeader.vue'
import { watch, ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useItineraryStore } from '@/stores/itinerary'
import { useRouter, useRoute } from 'vue-router'
import ItineraryStart from '../components/ItineraryStart.vue'
import ItineraryOffilineLoader from '../components/ItineraryOffilineLoader.vue'

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
  },
  view: {
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
  const slug = route.params.slug2 ? route.params.slug2 : route.params.slug

  itineraryStore.loadItinerary(slug).then(it => {
    itinerary.value = it
    gameStore.start(it, !props.view).then(() => {
      game.value = gameStore.getGame(slug)
    })
  })
}

load()


watch(() => route.params.slug, (newValue) => {
  if (newValue) {
    load()
  }
})

watch(() => route.params.slug2, (newValue) => {
  load()
})

</script>
<template>
  <div v-if="itinerary && game">
    <itinerary-offiline-loader :itinerary="itinerary"></itinerary-offiline-loader>

    <ItineraryHeader :itinerary="itinerary"></ItineraryHeader>
    <ItineraryStart :itinerary="itinerary" :mid="mid" :end="end"></ItineraryStart>
    <ItineraryMap :view="view" :itinerary="itinerary" :start="true"></ItineraryMap>
    <ItineraryAll :back="false" :slug="route.params.slug"></ItineraryAll>
  </div>
</template>

<style></style>
