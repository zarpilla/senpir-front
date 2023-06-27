<script setup>
import { ref, onMounted, computed } from 'vue'
import { useItineraryStore } from '../stores/itinerary'
import { useGameStore } from '../stores/game'
import { useLocationStore } from '../stores/location'
import ItineraryOffilineLoader from './ItineraryOffilineLoader.vue'
import query from '../utils/query'


const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  }
})

const route = query.getSlugFromHash()

// const itineraryStore = useItineraryStore();
const locationStore = useLocationStore();

const gameStore = useGameStore();


</script>

<template>
  <div class="container text-center">
    <div class="text-center squirel">
      <img src="@/assets/images/squirel.svg" class="mt-4 mb-3" alt="" />
    </div>
    <div class="text-center squirel-text mb-3">
      JOC DE PISTES
    </div>
    <div class="help-text mt-4 mb-2">
      Resoleu els reptes a cada fita i aconseguiu {{ itinerary.attributes.character_name || 'el personatge' }} per a la
      vostra col·lecció
    </div>

    <img src="@/assets/images/arrow-green.svg" class="mt-1 mb-3" alt="" />
  </div>

</template>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 30px;
  line-height: 32px;
}

.separa {
  width: 12vw;
  height: 0px;
  /* Senpir_verd */
  border: 2px solid #49A986;
  margin: auto;
}

.place {
  font-weight: 600;
}

.squirel-text {
  color: var(--senpir-verd, #49A986);
  text-align: center;

  /* Títols/Subtítol Joc */
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.help-text {
  text-align: center;

/* Text/Big */
font-size: 21px;
font-weight: 600;
line-height: 24px;
}
</style>
