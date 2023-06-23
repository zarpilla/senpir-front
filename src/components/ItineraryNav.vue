<script setup>
import { ref, onMounted, computed } from 'vue'
import { useItineraryStore } from '../stores/itinerary'
import { useGameStore } from '../stores/game'
import { useLocationStore } from '../stores/location'
import { RouterLink } from 'vue-router'


const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  },
  num: {
    type: Number,
    required: false
  }
  
})

const itineraryStore = useItineraryStore();
const locationStore = useLocationStore();

const gameStore = useGameStore();

const activities = props.itinerary.attributes.activities.filter((a, i) => i < props.itinerary.attributes.activities.length - 1)
</script>

<template>
  <div class="greetings" v-if="props.itinerary">

    <div class="d-flex mb-2 justify-content-center">

      <!-- <RouterLink class="pr-1" :disabled="gameStore.point == 'start'" :to="`/${itineraryStore.slug}/inici`">INICI</RouterLink> -->

      <div class="ball-outter" v-for="(a, i) in activities" :key="i">
        <RouterLink class="ball p-2" :class="i + 1 <= props.num || props.num === undefined ? `bg-color-${i}` : 'bg-disabled'" :to="`/${props.itinerary.attributes.slug}/p/${i + 1}`">{{ i + 1 }}
        </RouterLink>
        <div v-if="i < activities.length - 1" class="ball-row"></div>
      </div>

      <!-- <RouterLink class="pr-1" :disabled="gameStore.point == 'end'" :to="`/${itineraryStore.slug}/final`">FINAL</RouterLink> -->


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

.ball {
  height: 30px;
  width: 30px;
  border-radius: 50px;
  background: #F3C857;
  display: block;
  margin: 0 8px;

  font-weight: 600;
  font-size: 20px;
  line-height: 17px;
  color: #003842;
  text-decoration: none;
  z-index: 10;
}

.ball-outter {
  position: relative;
}

.ball-row {
  width: 20px;
  height: 3px;
  background: #E0F0E5;
  position: absolute;
  right: -12px;
  top: 14px;
  z-index: 0;
}
.bg-disabled{
  background-color: #E0F0E5!important;
}
</style>
