<script setup>
import { computed, ref } from 'vue'
import { useGameStore } from '../stores/game'
import { useItineraryStore } from '../stores/itinerary'
import { RouterLink } from 'vue-router'

const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})


const gameStore = useGameStore();
// const itineraryStore = useItineraryStore();

const game = ref({})
game.value = gameStore.getGame(props.itinerary.attributes.slug)

// const canFinish = computed(() => game.value.answers[game.value.answers.length - 1] !== '')

const canFinish = computed(() => game.value.answers.every((val, idx) => val !== ""))

</script>

<template>
  <div class="next mt-4 pt-5 zpb-5 mb-2 text-center">

    <RouterLink class="btn"
      :to="`/${itinerary.attributes.slug}/p/${props.index + 2}`">
      {{ 'CONTINUAR' }}
      <img src="@/assets/images/button.svg" class="button-img" alt="" />
    </RouterLink>


  </div>
</template>

<style scoped>
.next {  
  background: #E0F0E5;
  padding-bottom: 94px;
}
</style>
