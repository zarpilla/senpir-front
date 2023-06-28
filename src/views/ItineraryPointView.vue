<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useItineraryStore } from '../stores/itinerary'
import { useGameStore } from '../stores/game'
import { computed, ref, watch } from 'vue'
import Activity from '../components/Activity.vue'
import ActivitySort from '../components/ActivitySort.vue'
import ItineraryGPS from '../components/ItineraryGPS.vue'

const router = useRouter();
const route = useRoute()

const itineraryStore = useItineraryStore();
const gameStore = useGameStore();


const num = ref(1)
num.value = parseInt(route.params.num)


const itinerary = ref(null)
const game = ref(null)
const activity = ref(null)

const load = () => {
  itineraryStore.loadItinerary(route.params.slug).then(it => {
    itinerary.value = it
    gameStore.start(it, true).then(() => {
      game.value = gameStore.getGame(route.params.slug)

      activity.value = itinerary.value.attributes.activities[num.value - 1]

    })    
  })
}

load()





// itineraryStore.loadItinerary(route.params.slug).then(it => {
//   itinerary.value = it

//   gameStore.start(it)
//   game.value = gameStore.getGame(route.params.slug)

//   activity.value = itinerary.value.attributes.activities[num.value - 1]

//   // if (!gameStore.started) {    
//   //   gameStore.start(route.params.slug, itinerary.value.id)
//   //   gameStore.startActivities(route.params.slug, itinerary.value.attributes.activities)
//   // }
//   // else {
//   //   activity.value = itinerary.value.attributes.activities[num.value - 1]
//   // }


// })




watch(() => route.params.slug, (newValue) => {
  if (newValue) {
    load()
  }
})


// if (gameStore.started) {
//   activity.value = itinerary.value.attributes.activities[num.value - 1]
// }


watch(() => route.params.num, (newValue) => {
  if (newValue) {
    activity.value = itinerary.value.attributes.activities[newValue - 1]
    num.value = parseInt(route.params.num)
  }
})

watch(() => gameStore.started, (newValue) => {
  if (newValue) {
    activity.value = itinerary.value.attributes.activities[num.value - 1]
  }
})
</script>
<template>
  <div v-if="itinerary && game">
    <ItineraryGPS></ItineraryGPS>
    <ActivitySort :itinerary="itinerary" v-if="game.started && activity && activity.id && activity.type === 'sort'"
      :activity="activity" :index="num - 1"></ActivitySort>
    <Activity :itinerary="itinerary" v-if="game.started && activity && activity.id && activity.type !== 'sort'"
      :activity="activity" :index="num - 1"></Activity>

    
  </div>
</template>

<style>

.help-text ol li{
  text-align: left;
}

</style>
