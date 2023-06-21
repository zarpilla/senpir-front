<script setup>
import { ref, onMounted, computed } from 'vue'
import { useItineraryStore } from '../stores/itinerary'
import { useGameStore } from '../stores/game'
import { useLocationStore } from '../stores/location'
import { RouterLink } from 'vue-router'



const itineraryStore = useItineraryStore();
const locationStore = useLocationStore();

const gameStore = useGameStore();


</script>

<template>
  <div class="greetings" v-if="itineraryStore.data && itineraryStore.data.value">    

    <div class="is-flex mb-2">

      <RouterLink class="pr-1" :disabled="gameStore.point == 'start'" :to="`/${itineraryStore.slug}/inici`">INICI</RouterLink>
      
      <div v-for="(a, i) in itineraryStore.data.value.attributes.activities" :key="i">
        <RouterLink class="pr-1" :disabled="gameStore.point == 'start'" :to="`/${itineraryStore.slug}/p/${i+1}`">{{ i + 1 }}</RouterLink>        
      </div>

      <RouterLink class="pr-1" :disabled="gameStore.point == 'end'" :to="`/${itineraryStore.slug}/final`">FINAL</RouterLink>

      
    </div>


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
}
.pr-1{
  padding-right: 1rem
  }
</style>
