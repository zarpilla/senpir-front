<script setup>
import GaleriaHeader from '../components/GaleriaHeader.vue'
import Picture from '../components/Picture.vue'
import { watch, ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useItineraryStore } from '@/stores/itinerary'
import { useRouter, useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import ItineraryAll from '../components/ItineraryAll.vue'


const router = useRouter();
const route = useRoute()

const itineraryStore = useItineraryStore()
const gameStore = useGameStore()

const props = defineProps({
})

const itinerary = ref(null)
const game = ref(null)

const gallery = ref([])

const load = () => {
  itineraryStore.loadItinerary(route.params.slug).then(it => {
    itinerary.value = it
    gameStore.start(it).then(() => {
      game.value = gameStore.getGame(route.params.slug)
    })
  })

  gameStore.loadGallery().then(g => {
    gallery.value = g
  })
}

load()


watch(() => route.params.slug, (newValue) => {
  if (newValue) {
    load()
  }
})

</script>
<template>
  <div v-if="itinerary && game" class="bg-green">

    <GaleriaHeader></GaleriaHeader>

    <div class="container pb-5 mb-3 text-center">
      <div class="character text-start mb-4" v-for="item in gallery">
        <div class="d-flex head">
          <div class="circle number">            
            {{ item.attributes.itinerary.data.attributes.order }}
          </div>
          <div class="name">
            <h2>{{ item.attributes.itinerary.data.attributes.character_name }}</h2>
            <div class="place">
              {{ item.attributes.itinerary.data.attributes.name }} ({{ item.attributes.itinerary.data.attributes.city }})
            </div>

          </div>
        </div>
        <Picture class="mt-2 w-100-img" :image="item.attributes.itinerary.data.attributes.character"></Picture>
      </div>

      <h1 class="mt-4">Us animeu a col·leccionar-los tots?</h1>
      <img src="@/assets/images/arrow-green.svg" class="mt-1 mb-3" alt="" />

      <div class="itineraries">
        <div class="character character-bb text-start mb-4" v-for="item in itineraryStore.itineraries">
          <RouterLink class="to" :to="`/${route.params.slug}/view/${item.attributes.slug}`">
          <div class="d-flex head">
            <div class="circle number">
              {{ item.attributes.order }}
            </div>
            <div class="name">
              <h2>{{ item.attributes.character_name }}</h2>
              <div class="place">
                {{ item.attributes.name }} ({{ item.attributes.city }})
                <div class="mt-2 text-bold">{{ item.attributes.place }}</div>              
              </div>

            </div>
          </div>
        </RouterLink>
        </div>
      </div>

    </div>

    <ItineraryAll :slug="itinerary.attributes.slug"></ItineraryAll>

    <!-- {{ gallery }} -->
    <!-- {{ itineraryStore.itineraries }} -->

    <!-- <ItineraryHeader :itinerary="itinerary"></ItineraryHeader>
    <ItineraryStart :itinerary="itinerary" :mid="mid" :end="end"></ItineraryStart>
    <ItineraryMap :itinerary="itinerary" :start="true"></ItineraryMap>
    <ItineraryClue :itinerary="itinerary"></ItineraryClue> -->
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

.to{
  text-decoration: none!important;;
}
a .number{
  text-decoration: none!important;;
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
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  color: #003842;
  text-transform: capitalize;
  margin-bottom: 0rem;
  text-decoration: none;
}

.place {
  font-size: 14px;
  line-height: 17px;
  color: #003842;
}

h1 {
  text-align: center;
  text-decoration: none;
  /* Text/Big */
  font-size: 21px;
  font-weight: 600;
  line-height: 24px;
}

.character-bb {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.text-bold{
  font-weight: bold;
}
</style>
