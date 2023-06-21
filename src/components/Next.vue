<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import { useItineraryStore } from '../stores/itinerary'
import { RouterLink } from 'vue-router'

const gameStore = useGameStore();
const itineraryStore = useItineraryStore();



const canFinish = computed(() => gameStore.canFinish || gameStore.answers[gameStore.answers.length - 1] !== '')
</script>

<template>
  <div class="next">

    <RouterLink :to="canFinish ? `/${itineraryStore.slug}/final` : `/${itineraryStore.slug}/mid`">
      {{ canFinish ? 'ACABA' : 'SEGUEIX' }}
    </RouterLink>

  </div>
</template>

<style scoped>
</style>
