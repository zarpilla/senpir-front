<script setup>
import Itinerary from '../components/Itinerary.vue'
import offline from "@/offline/index";

offline.get('/itinerary').then(() => {
  console.log('offline get')
})

</script>
<template>
  <Itinerary></Itinerary>
</template>

<style>
</style>
