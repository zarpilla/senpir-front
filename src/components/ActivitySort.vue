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
import ItineraryAll from './ItineraryAll.vue'
import ItineraryNav from './ItineraryNav.vue'
import ActivityDone from './ActivityDone.vue'
import ActivityOption from './ActivityOption.vue'
import NameForm from './NameForm.vue'
import ItineraryClue from '../components/ItineraryClue.vue'
import Timer from '../components/Timer.vue'

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

const timerEnd = ref(!props.activity.timer)

const end = () => {
  timerEnd.value = true
}

const answerOk = computed(() => answers.value.every((val, idx) => val === unsortedAnswers.value[idx]) && props.activity && timerEnd.value)

// const answerOk = ref(false)

const last = computed(() => props.index === props.itinerary.attributes.activities.length - 1)


const onMoveCallback = (evt, originalEvent) => {

  // answerOk.value = answers.value.every((val, idx) => val === unsortedAnswers.value[idx])

  if (answerOk.value) {
    return false
  }
}

const findOrderColor = (answerId, i) => {
  const idx = answers.value.findIndex(v => v === answerId)
  return idx >= 0 ? idx : i
}

watch(answerOk, (newValue) => {
  if (newValue) {
    gameStore.answer(props.itinerary.attributes.slug, props.index, props.activity.answer_code || "-")
    window.scrollTo(0, 0);
  }
})

watch(() => props.activity.options, (newValue) => {
  if (newValue) {
    // answerOk.value = false
    unsorted.value = [...shuffleArray([...props.activity.options])]
    answers.value = props.activity.options.map(o => o.option_code || o.id)
  }
})

watch(() => props.activity.id, (newValue) => {
  timerEnd.value = !props.activity.timer
})

// watch(() => props.activity.id, (newValue) => {
//   answerOk.value = false
//   if (newValue) {
//     checked.value = props.activity.options.map(o => false)
//     answers.value = props.activity.options.map(o => o.answer)
//   }
// })

</script>

<template>
  <div class="activity-outter" :class="!answerOk ? 'mt-4 pt-2' : 'pt-2'">

    <div class="text-center" v-if="last && !answerOk">
      <img v-if="last" src="@/assets/images/agla-group.svg" class="mt-3 mb-2" alt="" />
    </div>

    <Timer @end="end" :activity="activity"></Timer>

    <ItineraryNav v-if="!answerOk && !last" :itinerary="itinerary" :num="index + 1"></ItineraryNav>

    <ActivityTitle v-if="!answerOk" :last="last" :activity="activity" :index="index"></ActivityTitle>

    <DistanceCheck v-if="!answerOk && !last" :coords1="{ latitude: activity.latitude, longitude: activity.longitude }"></DistanceCheck>

    <Picture class="mt-4 mb-3 w-100-img" v-if="!answerOk && !last" :image="itinerary.attributes.map"></Picture>

    <div class="activity container pt-3 pb-3" :class="!answerOk ? 'pb-activity' : 'z'">



      <Picture class="mt-5 mb-5" v-if="last && !answerOk" :image="itinerary.attributes.character"></Picture>


      <div class="question" v-if="!answerOk">


        <div class="text-center">
          <Audio class="pb-4" :audio="activity.audio"></Audio>
        </div>

        <Picture class="mb-3 rounded w-100-img" :image="activity.image"></Picture>

        <Markdown v-if="activity.description" :source="activity.description" />
        <div v-else-if="last && !answerOk" :source="activity.description" class="mb-4">
          <h2>Per últim, si voleu col·leccionar {{ itinerary.attributes.character_name }}...</h2>
          Haureu de descobrir la nostra paraula secreta amb les pistes que heu anat recol·lectant al llarg de les 5 fites de l’Itinerari.
        </div>


        <div class="text-center">
          <div class="text-center squirel">
            <img src="@/assets/images/squirel.svg" class="mt-4 mb-3" alt="" />
          </div>
          <div class="text-center squirel-text mb-3" v-if="!last">
            JOC DE PISTES
          </div>
          <div class="text-center help-text mb-3 w-75 mr-auto ml-auto" v-if="activity.help_text">
            <Markdown v-if="activity.help_text" :source="activity.help_text" />
          </div>
          <div class="text-center help-text mb-3 w-75 mr-auto ml-auto" v-else>
            <span v-if="!last">Cliqueu i arrossegueu per ordenar-les</span>
            <span v-else>Cliqueu i arrossegueu les lletres per descobrir la nostra paraula secreta</span>
          </div>
          <img src="@/assets/images/arrow-green.svg" class="mt-1 mb-3" alt="" />
        </div>

        <div class="activity-options mt-2 zmb-2" :class="!last ? 'mb-2' : 'mb-6'" v-if="checked">
          <VueDraggableNext class="activity-options" v-model="unsorted" :move="onMoveCallback">
            <transition-group>
              <div v-for="(element, i) in unsorted" :key="element.id" class="activity-option mb-3">
                <ActivityOption :last="last" :index="findOrderColor(element.option_code || element.id, i)"
                  :option="element"></ActivityOption>
              </div>
            </transition-group>
          </VueDraggableNext>
        </div>

        <!-- <pre>{{ activity }}</pre> -->
      </div>

      <div v-if="answerOk" class="answer-ok">
        <ActivityDone :itinerary="itinerary" :last="last" :index="index" :activity="activity" :done="true"></ActivityDone>
      </div>

    </div>

    <NameForm :itinerary-id="itinerary.id" v-if="answerOk && last"></NameForm>

    <Next v-if="!last" :itinerary="itinerary" :index="index" :answer-ok="answerOk"></Next>

    <ItineraryClue v-if="!last || (last && !answerOk)" :itinerary="itinerary"></ItineraryClue>

    <!-- <div class="mt-5" v-if="last && answerOk">
      <ItineraryAll :back="false" :slug="itinerary.attributes.slug" v-if="last && answerOk"></ItineraryAll>
    </div> -->
    

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
  z-index: 2;
}

.overlay-false {
  background: #E0A166;
  opacity: 0.9;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
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

/* .pb-activity{
  padding-bottom: 6rem!important;
} */
.mb-6 {
  margin-bottom: 5rem !important;
}
</style>
