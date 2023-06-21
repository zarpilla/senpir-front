<script setup>
import Itinerary from '../components/Itinerary.vue'
import ItineraryHeader from '../components/ItineraryHeader.vue'
import ItineraryNav from '../components/ItineraryNav.vue'

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

</script>
<template>
  <ItineraryHeader></ItineraryHeader>
  <ItineraryNav></ItineraryNav>
  <Itinerary :mid="mid" :end="end"></Itinerary>
</template>

<style>
</style>
