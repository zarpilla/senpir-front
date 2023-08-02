<script setup>
import { ref, onMounted, computed } from 'vue'
import { useGameStore } from '../stores/game'
import { useLocationStore } from '../stores/location'
import Picture from './Picture.vue'
import Audio from './Audio.vue'
import Markdown from 'vue3-markdown-it';
import Next from './Next.vue'

const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  },
  start: {
    type: Boolean,
    required: false
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


</script>

<template>
  <div v-if="itinerary">

    <div class="step-0" v-show="!props.end">

      <div class="container mb-5">

        <div class="row">
          <div class="col-12 col-md-12 pt-md-5">

            <Picture class="mt-4 mb-4" :image="itinerary.attributes.character"></Picture>

            <div class="text-center">
              <Audio class="mt-4 mb-4" :audio="itinerary.attributes.audio"></Audio>
            </div>
          </div>
          <div class="col-12 col-md-12 pt-md-5">

            <Markdown v-if="itinerary.attributes.description" :source="itinerary.attributes.description" />
            <Markdown v-if="itinerary.attributes.description_more" :source="itinerary.attributes.description_more" />

          </div>

        </div>

      </div>

    </div>

    <Next :itinerary="itinerary" :index="-1" :answer-ok="false"></Next>

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
