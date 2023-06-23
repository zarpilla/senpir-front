<script setup>
import Picture from './Picture.vue'
import Audio from './Audio.vue'
import Next from './Next.vue'
import { computed, ref, watch } from 'vue'
import { useGameStore } from '../stores/game'
import { VueDraggableNext } from 'vue-draggable-next'
import DistanceCheck from './DistanceCheck.vue'
import Markdown from 'vue3-markdown-it';
import ActivityTitle from './ActivityTitle.vue'
import ItineraryMap from './ItineraryMap.vue'
import ActivityDone from './ActivityDone.vue'
import ActivityOption from './ActivityOption.vue'
import NameForm from './NameForm.vue'
import ItineraryClue from '../components/ItineraryClue.vue'

const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  },
  activity: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const gameStore = useGameStore();

const checked = ref(props.activity.options.map(o => false))

const answers = ref(props.activity.options.map(o => o.option_code || o.id))

const shuffleArray = (array) => {
  const array0 = [...array]
  let currentIndex = array.length, randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  if (array.every((val, idx) => val === array0[idx])) {
    shuffleArray(array)
  }

  return array;
}

const unsorted = ref([...shuffleArray([...props.activity.options])])

const unsortedAnswers = computed(() => (unsorted.value.map(o => o.option_code || o.id)))

const answerOk = computed(() => answers.value.every((val, idx) => val === unsortedAnswers.value[idx]))

const onMoveCallback = (evt, originalEvent) => {
  if (answerOk.value) {
    return false
  }
}

watch(answerOk, (newValue) => {
  if (newValue) {
    gameStore.answer(props.itinerary.attributes.slug, props.index, props.activity.answer_code || "-")
    // gameStore.setPoint('result-' + props.activity.id)
  }
})

watch(() => props.activity.options, (newValue) => {
  if (newValue) {
    console.log('newValue', newValue, props.activity.options)
    unsorted.value = [...shuffleArray([...props.activity.options])]
    // checked.value = props.activity.options.map(o => false)
    answers.value = props.activity.options.map(o => o.option_code || o.id)
  }
})
</script>

<template>
  <div>
    <ItineraryMap :itinerary="itinerary" v-if="!answerOk && index < itinerary.attributes.activities.length - 1" :num="index + 1"></ItineraryMap>

    <div class="activity container" :class="!answerOk ? 'pb-activity' : 'z'">

      <div class="text-center" v-if="index === itinerary.attributes.activities.length - 1 && !answerOk">
        <img v-if="index === itinerary.attributes.activities.length - 1" src="@/assets/images/agla-group.svg" class="mt-4 mb-3" alt="" />  
      </div>

      <ActivityTitle v-if="!answerOk" :last="index === itinerary.attributes.activities.length - 1" :activity="activity" :index="index"></ActivityTitle>

      <Picture class="mt-5 mb-5" v-if="index === itinerary.attributes.activities.length - 1 && !answerOk" :image="itinerary.attributes.character"></Picture>
      

      <div class="question mb-5 pb-2" v-if="!answerOk">

        <DistanceCheck :coords1="{ latitude: activity.latitude, longitude: activity.longitude }"></DistanceCheck>

        <Picture :image="activity.image"></Picture>

        <div class="text-center">
          <Audio class="mt-3 mb-3" :audio="activity.audio"></Audio>
        </div>

        <Markdown v-if="activity.description" :source="activity.description" />



        <div class="text-center">
          <div class="text-center squirel">
            <img src="@/assets/images/squirel.svg" class="mt-4 mb-3" alt="" />
          </div>
          <div class="text-center squirel-text mb-3" v-if="index !== itinerary.attributes.activities.length - 1">
            JOC DE PISTES
          </div>
          <div class="text-center help-text mb-3 w-75 mr-auto ml-auto" v-if="activity.help_text">
            {{ activity.help_text }}
          </div>
          <div class="text-center help-text mb-3 w-75 mr-auto ml-auto" v-else>
            Cliqueu i arrossegueu per ordenar-les
          </div>
          <img src="@/assets/images/arrow-green.svg" class="mt-1 mb-3" alt="" />
        </div>

        <div class="activity-options mt-2 mb-2" v-if="checked">

          <VueDraggableNext class="activity-options" v-model="unsorted" :move="onMoveCallback">
            <transition-group>
              <div v-for="(element, i) in unsorted" :key="element.id" class="activity-option mb-4">

                <ActivityOption :index="i" :option="element"></ActivityOption>
              </div>
            </transition-group>
          </VueDraggableNext>
        </div>

        <!-- <pre>{{ activity }}</pre> -->
      </div>

      <div v-if="answerOk" class="answer-ok">
        <ActivityDone :itinerary="itinerary" :last="index === itinerary.attributes.activities.length - 1" :index="index" :activity="activity"></ActivityDone>
      </div>

    </div>

    <NameForm v-if="answerOk && index === itinerary.attributes.activities.length - 1"></NameForm>

    <Next v-if="answerOk && !(index === itinerary.attributes.activities.length - 1)" :itinerary="itinerary" :index="index"></Next>

    <ItineraryClue v-if="index < itinerary.attributes.activities.length - 1 || (index === itinerary.attributes.activities.length - 1 && !answerOk)" :itinerary="itinerary"></ItineraryClue>

  </div>
</template>

<style scoped>
.correct {
  background: rgba(0, 255, 0, 0.1);
}

.squirel-text {
  color: var(--senpir-verd, #49A986);
  text-align: center;

  /* Títols/Subtítol Joc */
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.help-text {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
}

.mr-auto {
  margin-right: auto;
}

.ml-auto {
  margin-left: auto;
}

.overlay-true {
  background: #E0F0E5;
  opacity: 0.9;
  width: 100%;
  height: 100%;
  position: absolute;
}

.overlay-false {
  background: #E0A166;
  opacity: 0.9;
  width: 100%;
  height: 100%;
  position: absolute;

}

.activity-option {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
}

.tryagain {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.answer-ok h1 {
  color: var(--senpir-verd, #49A986);
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  line-height: 32px;
}

.answer-content {
  border-bottom: 1px solid #003842;
}

.enigma h2 {
  text-transform: uppercase;
  color: var(--senpir-verd, #49A986);
  text-align: center;

  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.answer-code {
  border-radius: 15px;
  padding: 1.5rem 0;
}

.circle {
  background: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50px;

  text-align: center;

  /* Títols/Números */
  font-size: 30px;
  font-weight: 600;
  line-height: 50px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.option-with-name-large {
  background-color: #E0F0E5;
  padding: 16px;
}

.option-with-name-large h3 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  padding-bottom: 10px;
}
.pb-activity{
  padding-bottom: 6rem!important;
}
</style>
