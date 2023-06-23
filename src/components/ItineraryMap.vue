<script setup>
import { ref, onMounted, computed } from 'vue'
import { useItineraryStore } from '../stores/itinerary'
import { useGameStore } from '../stores/game'
import { useLocationStore } from '../stores/location'
import { RouterLink } from 'vue-router'

import Picture from './Picture.vue'
import ItineraryNav from '../components/ItineraryNav.vue'


const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  },
  start: {
    type: Boolean,
    required: false
  },
  mid: {
    type: Boolean,
    required: false
  },
  end: {
    type: Boolean,
    required: false
  },
  num: {
    type: Number,
    required: false
  }
  
})


</script>

<template>
  <div class="itinerary-map-info w-25-md mx-auto" v-if="itinerary">

    <!-- <Timer :activities="itinerary.attributes.activities"></Timer> -->

    <Picture class="itinerary-map" :image="itinerary.attributes.map"></Picture>

    <div class="map-info">
      <div class="map-info-card p-3 text-center">
        <img src="@/assets/images/boot.svg" class="boot mt-3 mb-2" alt="" />

        <h1>
          <RouterLink class="lnk" :to="`/${itinerary.attributes.slug}/inici`">
            {{ itinerary.attributes.name }}
          </RouterLink>
        </h1>
        
        <div v-if="!start" class="bordered-bottom pt-2 pb-2 mb-4">
        </div>

        <div v-if="start" class="container text-center bordered mt-4 pt-3 mb-4 pb-3">
          <div class="row align-items-start">
            <div class="col">
              <b>Distància</b>
              <div>{{ itinerary.attributes.distance || '3 Km' }}</div>
            </div>
            <div class="col">
              <b>Dificultat</b>
              <div>{{ itinerary.attributes.difficulty || 'Baixa' }}</div>
            </div>
            <div class="col">
              <b>Desnivell</b>
              <div>{{ itinerary.attributes.unevenness || '130 m' }}</div>
            </div>
          </div>
        </div>

        <ItineraryNav :itinerary="itinerary" :num="num"></ItineraryNav>

      </div>

      <div class="text-center mt-5 mb-5" v-if="start">
        <RouterLink class="btn" :to="`/${itinerary.attributes.slug}/p/1`">
          Començar
          <img src="@/assets/images/button.svg" class="button-img" alt="" />
        </RouterLink>
      </div>


    </div>

  </div>
</template>

<style>
.itinerary-map img {
  width: 100%;
}

h1 a {
  color: #003842;
  text-decoration: none;
  font-weight: 600;
}
</style>
<style scoped>
h1 {
  font-weight: 600;
}
.map-info {
  background: #E0F0E5;
  padding-bottom: 60px;
}

.map-info-card {
  background: #FFFFFF;
  box-shadow: 1px 3px 10px 2px rgba(0, 0, 0, 0.1);
  margin: -30px 20px 0 20px;
  position: relative;
}

h1 a {
  font-weight: 600;
  font-size: 30px;
  line-height: 32px;
}

b {
  font-weight: 600;
}

.bordered {
  border-top: 1px solid #003842;
  border-bottom: 1px solid #003842;
  font-size: 14px;
}
.bordered-bottom{
  border-bottom: 1px solid #003842;
}


@media (min-width: 1024px) {
.w-25-md {
  width: 25%;
}
}
</style>