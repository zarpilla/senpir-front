<script setup>
import ItineraryAll from '../components/ItineraryAll.vue'
import { watch, ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useItineraryStore } from '@/stores/itinerary'
import { useRouter, useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'


const props = defineProps({
  showBack: {
    type: Boolean,
    required: false,
    default: true
  }
})

const itineraryStore = useItineraryStore()

const itineraries = ref([])

itineraryStore.loadItineraries().then(its => {
  itineraries.value = its
})

const route = useRoute();
const slug = ref("")
slug.value = route.params.slug

watch(() => route.params.slug, (newValue) => {
  if (newValue) {
    slug.value = route.params.slug
  }
})


</script>
<template>
  <div v-if="itineraries" class="bg">

    <img src="@/assets/images/image007-2.jpg" class="capsalera" alt="" />

    <img src="@/assets/images/mapa-pirineus.png" class="mapa mt-4" alt="" />

    <div class="container pb-5 text-center">



      <h1 class="mt-4 text-start">Us proposem uns itineraris per a tota la família que, a través de jocs i reptes, ens
        ajudaran a conèixer i cuidar la biodiversitat dels Pirineus.</h1>
      <div class="text-start">
        SENPIR, és un projecte que fomenta la descoberta dels valors dels espais naturals i el seu respecte, cercant
        l’equilibri entre les activitats de lleure a la natura i la seva conservació.
        Els Pirineus són un món sensorial, ple de sensacions i sensualitat. Desperta els sentits, els sentiments i la
        sensibilitat a les persones que s’hi apropen. I si volem que tothom continuï gaudint dels seus espais naturals ens
        cal seny i un bon senderi.
        <!-- Visteu senpir.org -->
      </div>

    </div>
    <div class="zpb-5 text-center">
      <div class="itineraries bg-green pt-4 pb-5">
        <div class="container">

          <img src="@/assets/images/walking.svg" class="walking mt-2 mb-2" alt="" />
          <h2 class="mb-4 mt-2">Itineraris<br>SENPIR</h2>
          <div class="separa mb-4"></div>

          <div class="character character-bb text-start mb-4" v-for="item in itineraries">
            <RouterLink class="to" :to="`/${route.params.slug}/view/${item.attributes.slug}`">
              <div class="d-flex head">
                <div class="circle number">
                  {{ item.attributes.order }}
                </div>
                <div class="name">
                  <h3 class="mb-1">{{ item.attributes.name }}</h3>
                  <div class="place city">
                    {{ item.attributes.city }}
                  </div>
                  <div class="place">
                    {{ item.attributes.place }}
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>

    </div>

    <ItineraryAll v-if="showBack" :back="true" :slug="slug"></ItineraryAll>

  </div>
</template>

<style scoped>
.bg-green {
  background: var(--senpir-verd-clar, #E0F0E5);
}

.character {
  border-radius: 15px;
  background: var(--senpir-blanc, #FFF);
  overflow: hidden;
}

.number {
  text-align: center;
  /* Botó/Números */
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
}

.to {
  text-decoration: none !important;
  ;
}

a .number {
  text-decoration: none !important;
  ;
  color: #003842;
}

.circle {
  border-radius: 35px;
  background: var(--senpir-lima, #ABD398);
  width: 35px;
  min-width: 35px;
  height: 35px;
  line-height: 35px;
  margin-right: 14px;
}

.head {
  padding: 16px;
}

h2 {
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  line-height: 32px;
  color: #003842;
}

.separa {
  width: 12vw;
  height: 0px;
  /* Senpir_verd */
  border: 2px solid #49A986;
  margin: auto;
}

h3 {
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  color: #003842;
}

.place {
  font-size: 14px;
  line-height: 17px;
  color: #003842;
}

.city {
  font-weight: 600;
}

h1 {
  color: var(--senpir-blau, #65B1AD);
  color: var(--senpir-verd, #49A986);
  color: var(--senpir-verd, #49A986);

  /* Text/Big */
  font-size: 21px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}

.capsalera,
.mapa {
  width: 100%;
}

.character-bb {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}</style>
