<script setup>
import { ref, onMounted, computed } from 'vue'
import { useItineraryStore } from '../stores/itinerary'
import { useGameStore } from '../stores/game'
import { useLocationStore } from '../stores/location'

import Picture from './Picture.vue'
import Activity from './Activity.vue'
import Audio from './Audio.vue'
import ActivitySort from './ActivitySort.vue'


const itineraryStore = useItineraryStore();

</script>

<template>
  <div class="itinerary-loader" v-if="itineraryStore.data && itineraryStore.data.value">    
    
    <div>
      <Picture class="mt-2" :image="itineraryStore.data.value.attributes.image"></Picture>
      <Picture class="mt-2" :image="itineraryStore.data.value.attributes.map"></Picture>
      <Picture class="mt-2" :image="itineraryStore.data.value.attributes.character"></Picture>
      <Audio class="mt-2" :audio="itineraryStore.data.value.attributes.audio"></Audio>
    </div>
    
    <div class="activities" v-for="(activity, i) in itineraryStore.data.value.attributes.activities" :key="activity.id">
      <ActivitySort v-if="activity.type === 'sort'" :activity="activity" :index="i"></ActivitySort>
      <Activity v-else :activity="activity" :index="i"></Activity>
    </div>
    
    <div>      
      <Picture class="mt-2" :image="itineraryStore.data.value.attributes.answer_image"></Picture>
      <Audio :audio="itineraryStore.data.value.attributes.answer_audio"></Audio>          
    </div>
    
  </div>
</template>

<style scoped>
.itinerary-loader{
  font-size: 0;
  position: absolute;
  height: 0px;
  width: 0px;
  z-index: -1;
  overflow: hidden;
}
</style>
