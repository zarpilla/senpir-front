<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import Picture from './Picture.vue'
import ItineraryNav from '../components/ItineraryNav.vue'
import gps from '../utils/gps'


const apiBase = import.meta.env.VITE_API_BASE;

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
  },
  view: {
    type: Boolean,
    required: false
  }  
})


const latLng = ref(props.itinerary.attributes.latitude ? gps.gpsUtil({ latitude: props.itinerary.attributes.latitude, longitude: props.itinerary.attributes.longitude }) : {}) 


</script>

<template>
  <div class="itinerary-map-info w-25-md mx-auto" v-if="itinerary">

    <!-- <Timer :activities="itinerary.attributes.activities"></Timer> -->

    <Picture class="itinerary-map" :image="itinerary.attributes.map"></Picture>

    <div class="map-info pb-5">
      <div class="map-info-card p-3 text-center">
        <!-- <img v-if="start" src="@/assets/images/boot.svg" class="boot mt-3 mb-2" alt="" /> -->

        <!-- <h1 class="pt-2">
          <RouterLink class="lnk" :to="`/${itinerary.attributes.slug}/inici`">
            {{ itinerary.attributes.name }}
          </RouterLink>
        </h1> -->
        
        <div v-if="!start" class="bordered-bottom pt-2 pb-2 mb-4">
        </div>

        
        
        <div v-if="start" class="container text-center bordered mt-2 zpt-3 mb-2 pb-2">
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

        <div class="d-flex justify-content-between mt-2">
          <div class="fites-row"></div>
          <div class="fites">FITES</div>
          <div class="fites-row"></div>
        </div>

        <ItineraryNav :view="view" :itinerary="itinerary" :num="num"></ItineraryNav>

        <div v-if="start && itinerary.attributes.latitude && itinerary.attributes.longitude" class="bordered-bottom pt-3 pb-2 mb-4">
        </div>

        <div v-if="start && itinerary.attributes.latitude && itinerary.attributes.longitude" class="container text-center">
          <div class="d-flex justify-content-center">
            <img src="@/assets/images/location.svg" class="location me-2" alt="" />
            <div class="text-start coords">
              {{ latLng.lat }},<br>{{ latLng.lng }}
            </div>
          </div>          
        </div>

        <div v-if="start" class="bordered-bottom pt-3 pb-2 mb-4">
        </div>
        
        <div v-if="start && itinerary.attributes.gpx && itinerary.attributes.gpx.data && itinerary.attributes.gpx.data.attributes && itinerary.attributes.gpx.data.attributes.url" class="container text-center">
          <a class="track pe-1" target="_blank" :href="`${apiBase}${itinerary.attributes.gpx.data.attributes.url}`">DESCARREGAR TRACK</a>
          <img src="@/assets/images/download.svg" class="zh0" alt="" />

        
        </div>

      </div>

      <div class="text-center mt-5 mb-5" v-if="start">
        <RouterLink class="btn btn-start" :to="`/${itinerary.attributes.slug}/inici`" v-if="!view">
          VOLEM COMENÇAR!
          <img src="@/assets/images/brujula.svg" class="button-img" alt="" />
        </RouterLink>

        <span class="btn btn-start btn-start-disabled" v-if="view">
          COMENÇAR!
          <img src="@/assets/images/brujula.svg" class="button-img" alt="" />
        </span>
        <div class="help mt-3 container" v-if="view">
          Atenció, no pots començar aquest itinerari per què no has entrat des del codi QR
        </div>
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
  /* border-top: 1px solid #003842;
  border-bottom: 1px solid #003842; */
  font-size: 14px;
}
.bordered-bottom{
  border-bottom: 1px solid #003842;
}
.btn-start-disabled {
  opacity: 0.5;

}

.fites{
  font-size: 14px;
font-weight: 600;
line-height: 17px;
letter-spacing: 1.5px;
text-transform: uppercase;
padding: 0 16px;
}
.fites-row{
  background: #003842;
  width: 100%;
  height: 1px;
  margin-top: 8px;
}

.track {
  font-size: 14px;
font-weight: 600;
line-height: 17px;
letter-spacing: 1.5px;
text-transform: uppercase;
text-decoration: underline;
color: #003842
}

.coords {
  
/* Text/Small */
font-size: 14px;
line-height: 17px;
}

@media (min-width: 1024px) {
.w-25-md {
  width: 25%;
}
}
</style>