<script setup>
import Picture from './Picture.vue'
import Audio from './Audio.vue'
import DistanceCheck from './DistanceCheck.vue'
import ItineraryMap from './ItineraryMap.vue'

import Next from './Next.vue'
import { computed, ref, watch } from 'vue'
import { useGameStore } from '../stores/game'
import Markdown from 'vue3-markdown-it';
import ActivityTitle from './ActivityTitle.vue'
import ActivityDone from './ActivityDone.vue'
import ActivityOption from './ActivityOption.vue'
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

const answers = ref(props.activity.options.map(o => o.answer))

const answerOk = computed(() => answers.value.every((val, idx) => val === checked.value[idx]))

const answerOkCount = computed(() => props.activity.options.filter(o => o.answer).length)

const checkOption = (i) => {
  if (answerOk.value === false) {
    checked.value[i] = !checked.value[i]
  }
}

watch(answerOk, (newValue) => {
  if (newValue) {
    gameStore.answer(props.itinerary.attributes.slug, props.index, props.activity.answer_code || "-")
  }
})

watch(() => props.activity.id, (newValue) => {
  if (newValue) {
    checked.value = props.activity.options.map(o => false)
    answers.value = props.activity.options.map(o => o.answer)
  }
})
</script>

<template>
  <div>
    <ItineraryMap v-if="!answerOk" :itinerary="itinerary" :num="index + 1"></ItineraryMap>

    <div class="activity container" :class="!answerOk ? 'pb-activity' : 'z'">

      <ActivityTitle v-if="!answerOk" :activity="activity" :index="index"></ActivityTitle>

      <div class="question mb-5 pb-2" v-if="!answerOk">

        <DistanceCheck :coords1="{ latitude: activity.latitude, longitude: activity.longitude }"></DistanceCheck>

        <Audio :audio="activity.audio"></Audio>

        <Picture :image="activity.image"></Picture>

        <Markdown v-if="activity.description" :source="activity.description" />

        <div class="text-center">
          <div class="text-center squirel">
            <img src="@/assets/images/squirel.svg" class="mt-4 mb-3" alt="" />
          </div>
          <div class="text-center squirel-text mb-3">
            JOC DE PISTES
          </div>
          <div class="text-center help-text mb-3 w-75 mr-auto ml-auto" v-if="activity.help_text">
            {{ activity.help_text }}
          </div>
          <div class="text-center help-text mb-3 w-75 mr-auto ml-auto" v-else>
            <span v-if="answerOkCount === 1">Troba la opció correcta</span>
            <span v-else>Troba les opcions correctes</span>
            
          </div>
          <img src="@/assets/images/arrow-green.svg" class="mt-1 mb-3" alt="" />
        </div>

        <div class="activity-options mt-2 mb-2" v-if="checked">
          <div class="activity-option mb-4" :class="checked[i] ? 'active' : 'x'" v-for="(option, i) in activity.options"
            :key="option.id" @click="checkOption(i)">
            <div class="overlay-true" v-if="checked[i] && option.answer">
              <img src="@/assets/images/agla-group.svg" class="tryagain" alt="" />
            </div>
            <div class="overlay-false text-center" v-if="checked[i] && !option.answer">
              <img src="@/assets/images/tryagain.svg" class="tryagain" alt="" />
            </div>

            <ActivityOption :index="i" :option="option"></ActivityOption>

          </div>
        </div>
      </div>

      <div v-if="answerOk" class="answer-ok">
        <ActivityDone :itinerary="itinerary" :index="index" :activity="activity"></ActivityDone>
      </div>

    </div>

    <Next v-if="answerOk" :itinerary="itinerary" :index="index"></Next>

    <ItineraryClue :itinerary="itinerary"></ItineraryClue>

  </div>
</template>

<style scoped>
/* .active {
  border: 3px solid orange;
} */

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

.option-with-name-large{
  background-color: #E0F0E5;
  padding: 16px;
}
.option-with-name-large h3{
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
