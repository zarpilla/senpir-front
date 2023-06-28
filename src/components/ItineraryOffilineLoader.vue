<script setup>

import Picture from './Picture.vue'
import Audio from './Audio.vue'


const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  }
})

console.log('offline loader')

</script>

<template>
  <div class="itinerary-loader" v-if="itinerary">    
    
    <div>
      <Picture class="mt-2" :image="itinerary.attributes.image"></Picture>
      <Picture class="mt-2" :image="itinerary.attributes.map"></Picture>
      <Picture class="mt-2" :image="itinerary.attributes.character"></Picture>
      <Audio class="mt-2" :audio="itinerary.attributes.audio"></Audio>
      <Picture class="mt-2" :image="itinerary.attributes.gpx"></Picture>
    </div>
    
    <div class="activities" v-for="(activity, i) in itinerary.attributes.activities" :key="activity.id">
      <Picture :image="activity.image"></Picture>
      <Audio :audio="activity.audio"></Audio>
      <template v-for="(option, i) in activity.options">
        <Picture :image="option.image"></Picture>
        <Audio :audio="option.audio"></Audio>
      </template>
      <Picture :image="activity.answer_image"></Picture>
      <Audio :audio="activity.answer_audio"></Audio>
    </div>
    
    <div>      
      <Picture class="mt-2" :image="itinerary.attributes.answer_image"></Picture>
      <Audio :audio="itinerary.attributes.answer_audio"></Audio>          
    </div>
    
    <img src="/favicon.png" class="h0" alt="" />
    <img src="@/assets/images/agla-enigma.svg" class="h0" alt="" />
    <img src="@/assets/images/agla-group.svg" class="h0" alt="" />
    <img src="@/assets/images/agla.svg" class="h0" alt="" />    
    <img src="@/assets/images/arrow-down.svg" class="h0" alt="" />
    <img src="@/assets/images/arrow-green.svg" class="h0" alt="" />
    <img src="@/assets/images/arrow.svg" class="h0" alt="" />
    <img src="@/assets/images/boot.svg" class="h0" alt="" />
    <img src="@/assets/images/button.svg" class="h0" alt="" />
    <img src="@/assets/images/ok.svg" class="h0" alt="" />
    <img src="@/assets/images/perfect.svg" class="h0" alt="" />
    <img src="@/assets/images/squirel.svg" class="h0" alt="" />
    <img src="@/assets/images/tryagain.svg" class="h0" alt="" />
    <img src="@/assets/images/walking.svg" class="h0" alt="" />
    <img src="@/assets/images/brujula.svg" class="h0" alt="" />
    <img src="@/assets/images/flor.svg" class="h0" alt="" />
    <img src="@/assets/images/download.svg" class="h0" alt="" />
    <img src="@/assets/images/sound.svg" class="h0" alt="" />
    <img src="@/assets/images/ear.svg" class="h0" alt="" />
    <img src="@/assets/images/distance.svg" class="h0" alt="" />
    <img src="@/assets/images/flag.svg" class="h0" alt="" />
    <img src="@/assets/images/arrow-right.svg" class="h0" alt="" />
    <img src="@/assets/images/mapa-pirineus.png" class="h0" alt="" />
    <img src="@/assets/images/location.svg" class="h0" alt="" />
    
    
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
