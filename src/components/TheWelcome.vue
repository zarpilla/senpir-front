<script setup>
import { useItineraryStore } from '../stores/itinerary'
import { ref } from 'vue'

const itineraryStore = useItineraryStore()

const itineraries = ref([])

itineraryStore.loadItineraries().then(its => {
  itineraries.value = its
})
</script>

<template>

  <div class="welcome">
    Estas a punt de començar un dels itineraris SENPIR, on participaras en un seguit d'activitats, jocs o reptes durant tot el camí. 
    Durant l'itinerari pot ser que no tinguis cobertura, però l'aplicació web funcionarà igualment un cop hagis començat i descarregat les dades de l'itinerari. Si a més, actives el GPS al teu telèfon, podràs saber si et trobes a prop dels punts on hi ha el reptes!
    Al finalitzar, un cop tornis a tenir cobertura, podràs accedir al "Saló de la fama" per veure el personatge que hauràs aconseguit.        
    <div class="privacy">
      Fem servir tecnologies similars a les galetes per a poder mantenir l'estat del joc durant tot el camí i que aquesta aplicació web pugui funcionar sense cobertura. No guardem dades que puguin identificar-te, no fem seguiment de les teves coordenades GPS ni fem servir galetes publicitàries de tercers.
    </div>

    Som-hi?
    <br />
    <br />
    
    <div v-for="itinerary in itineraries">
      <RouterLink :to="`/${itinerary.attributes.slug}/inici`">
        {{ itinerary.attributes.name }}
      </RouterLink>
      
    </div>
    
  </div>

</template>
<style scoped>
.welcome{
  margin: 2rem 0;
}
.privacy{
  margin: 2rem 0;
}

</style>
