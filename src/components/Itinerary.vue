<script setup>
import { ref, onMounted, computed } from 'vue'
import { useGameStore } from '../stores/game'
import { useLocationStore } from '../stores/location'
import Picture from './Picture.vue'
import Audio from './Audio.vue'
import Markdown from 'vue3-markdown-it';


const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  },
  mid: {
    type: Boolean,
    required: false
  },
  end: {
    type: Boolean,
    required: false
  }
})

// const itineraryStore = useItineraryStore();
const locationStore = useLocationStore();

const gameStore = useGameStore();


// itineraryStore.loadItinerary().then(itinerary => {
//   if (!gameStore.started) {    
//     gameStore.start(itineraryStore.slug, itinerary.id)  
//     gameStore.startActivities(itinerary.attributes.activities)        
//   }


// })



const location = ref({})

// const itinerary = computed(() => itineraryStore.data && itinerary ? itinerary.attributes : null)

const optionsPosition = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 10000,
};

const successPosition = (pos) => {

  // console.log('successPosition', pos)
  // if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
  //   console.log("Congratulations, you reached the target");
  //   navigator.geolocation.clearWatch(id);
  // }

  location.value = pos
  //
  if (pos.coords.latitude && pos.coords.longitude) {
    locationStore.setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
  }
}

const errorPosition = (err) => {
  console.error(`Please enable your GPS position feature. ERROR(${err.code}): ${err.message}`);
}

// const canFinish = computed(() => gameStore.canFinish || gameStore.answers[gameStore.answers.length - 1] !== '')

onMounted(() => {
  if (navigator.geolocation) {

    setInterval(() => {
      navigator.geolocation.getCurrentPosition(successPosition, errorPosition, optionsPosition);
    }, 3 * 1000)

  } else {
    console.warn("Geolocation API is not supported in your browser.");
  }

})

</script>

<template>
  <div v-if="itinerary">

    <!-- <Timer :activities="itinerary.attributes.activities"></Timer> -->

    <div class="step-0" v-show="!props.end">

      <div class="container mb-5">

        <Picture class="mt-4 mb-4" :image="itinerary.attributes.character"></Picture>

        <div class="text-center">
          <Audio class="mt-4 mb-4" :audio="itinerary.attributes.audio"></Audio>
        </div>

        <Markdown v-if="itinerary.attributes.description"
          :source="itinerary.attributes.description" />
        <Picture class="mt-4 mb-4 rounded" :image="itinerary.attributes.image"></Picture>
        <Markdown v-if="itinerary.attributes.description_more"
          :source="itinerary.attributes.description_more" />
        <div class="text">
          Resoleu els reptes que trobareu a cada fita. Cada prova encertada rebreu una pista i amb aquesta hareu de
          resoldre
          l’enigma final.
          <br />
          <b>Som-hi!!!
          </b>
        </div>
        
      </div>

    </div>


  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

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

.mb-2 {
  margin-bottom: 2rem;
}

.is-flex {
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

.debug {
  background: #eee;
  margin-bottom: 20px;
}
</style>
