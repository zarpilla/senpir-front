<script setup>
import ItineraryOffilineLoader from './ItineraryOffilineLoader.vue'


const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="container text-center" v-if="itinerary">

    <img src="@/assets/images/walking.svg" class="walking mt-4 mb-4" alt="" />
    <h1 class="mb-3">{{ itinerary.attributes.name }}</h1>
    <div class="separa mb-3"></div>    
    <div class="place">{{ itinerary.attributes.city }}</div>
    <div class="mb-2">{{ itinerary.attributes.place }}</div>
    
    <itinerary-offiline-loader :itinerary="itinerary"></itinerary-offiline-loader>

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

.place{
  font-weight: 600;
}
/* 
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
} */
</style>
