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
    Estas a punt de començar un dels itineraris SENPIR, on participaras en un seguit d'activitats, jocs o reptes durant
    tot el camí.

    <!-- Durant l'itinerari pot ser que no tinguis cobertura, però l'aplicació web funcionarà igualment un cop hagis començat i descarregat les dades de l'itinerari. Si a més, actives el GPS al teu telèfon, podràs saber si et trobes a prop dels punts on hi ha el reptes!
    Al finalitzar, un cop tornis a tenir cobertura, podràs accedir al "Saló de la fama" per veure el personatge que hauràs aconseguit.        
    <div class="privacy">
      Fem servir tecnologies similars a les galetes per a poder mantenir l'estat del joc durant tot el camí i que aquesta aplicació web pugui funcionar sense cobertura. No guardem dades que puguin identificar-te, no fem seguiment de les teves coordenades GPS ni fem servir galetes publicitàries de tercers.
    </div> -->
    <br>
    <b>Som-hi?</b>
    <br />
    <br />

    <div class="row it-cont pt-3" v-for="itinerary in itineraries">
      <div class="col col-md-4">
      <RouterLink class="it-link" :to="`/${itinerary.attributes.slug}/inici`">
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
