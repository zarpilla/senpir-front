<script setup>
import Itinerary from '../components/Itinerary.vue'
import ItineraryHeader from '../components/ItineraryHeader.vue'
import ItineraryNav from '../components/ItineraryNav.vue'
import { useRouter, useRoute } from 'vue-router'
import { useItineraryStore } from '../stores/itinerary'
import { useGameStore } from '../stores/game'
import { computed, ref, watch } from 'vue'
import Activity from '../components/Activity.vue'
import ActivitySort from '../components/ActivitySort.vue'

const router = useRouter();
const route = useRoute()

const itineraryStore = useItineraryStore();
const gameStore = useGameStore();

const num = ref(1)
num.value = parseInt(route.params.num)

const activity = ref(null)

if (gameStore.started) {
  activity.value = itineraryStore.data.value.attributes.activities[num.value - 1]
}


watch(() => route.params.num, (newValue) => {
  if (newValue) {
    activity.value = itineraryStore.data.value.attributes.activities[newValue - 1]
    num.value = parseInt(route.params.num)
    console.log('activity.value', activity.value) 
  }
})

watch(() => gameStore.started, (newValue) => {
  if (newValue) {
    console.log('watch', itineraryStore.data.value.attributes.activities[num.value - 1]);
    activity.value = itineraryStore.data.value.attributes.activities[num.value - 1]
    console.log('watch activity.value', activity.value)
  }
})
</script>
<template>
  <ItineraryHeader></ItineraryHeader>
  <ItineraryNav></ItineraryNav>

  <ActivitySort v-if="gameStore.started && activity && activity.id && activity.type === 'sort'" :activity="activity" :index="num - 1"></ActivitySort>
  <Activity v-if="gameStore.started && activity && activity.id && activity.type !== 'sort'" :activity="activity" :index="num - 1"></Activity>

</template>

<style>
</style>
