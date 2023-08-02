<script setup>
import { useItineraryStore } from '../stores/itinerary'
import { ref } from 'vue'
import Picture from './Picture.vue'

const itineraryStore = useItineraryStore()

const itineraries = ref([])

itineraryStore.loadItineraries().then(its => {
  itineraries.value = its
})
</script>

<template>
  <div class="welcome container mt-5">
    Esteu a punt de començar un dels itineraris SENPIR, on participareu en un seguit d'activitats, jocs o reptes durant
    tot el camí.
    
    <br>
    <b>Som-hi?</b>
    <br />
    <br />

    <div class="row it-cont pt-3" v-for="itinerary in itineraries">
      <div class="col col-md-12">
      <RouterLink class="it-link" :to="`/${itinerary.attributes.slug}`">
        {{ itinerary.attributes.name }}
        <Picture :cover="true" class="w-100-img mt-4 mb-4 rounded" :image="itinerary.attributes.image"></Picture>
      </RouterLink>
    </div>
    </div>

  </div>
</template>
<style scoped>
.it-link {
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  color: #003842;
  text-decoration: none;
}

.it-cont {
  border-top: 1px solid #003842;
}

@media (min-width: 1024px) {

}
</style>
