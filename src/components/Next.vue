<script setup>
import { computed, ref, watch } from 'vue'
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
  },
  answerOk: {
    type: Boolean,
    required: true
  }
})


const gameStore = useGameStore();

const game = ref({})
game.value = gameStore.getGame(props.itinerary.attributes.slug)

const answerOk = ref(props.answerOk)

watch(() => props.answerOk, (newvalue) => {
  answerOk.value = newvalue
})

</script>

<template>
  <div class="next mt-4 pt-5 zpb-5 mb-2 text-center">

    <RouterLink class="btn"
      :to="`/${itinerary.attributes.slug}/p/${props.index + 2}`">
      {{ answerOk || index === -1 ? 'CONTINUAR' : 'SALTAR REPTE' }}
      <img src="@/assets/images/button.svg" class="button-img" alt="" />
    </RouterLink>


  </div>
</template>

<style scoped>
.next {  
  background: #E0F0E5;
  padding-bottom: 94px;
}

a {
  letter-spacing: 1.5px;
}
</style>
