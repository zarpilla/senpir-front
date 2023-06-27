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
  }
})

</script>

<template>
  <div v-if="itinerary">

    <!-- <Timer :activities="itinerary.attributes.activities"></Timer> -->

    <div class="step-0" v-show="!props.end">

      <div class="container mb-5">

        <div class="row">
          <div class="col-12 col-md-6 pt-md-5">

            <div class="col-12 col-md-6 pt-md-5">

              <Picture class="mt-4 mb-4 rounded" :image="itinerary.attributes.image"></Picture>

              <div class="text mt-5">
                Esteu a punt de començar un dels itineraris SENPIR. Us proposem un seguit de jocs i reptes per a tota la
                família durant el camí.
                <br /><br />
                Us animeu?
              </div>
              <div class="text-center">
                <img src="@/assets/images/arrow-green.svg" class="mt-3 mb-0" alt="" />
              </div>

            </div>



          </div>

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

.text {
  text-align: center;

  /* Text/Big */
  font-size: 21px;
  font-weight: 600;
  line-height: 24px;
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
