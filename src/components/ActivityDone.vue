<script setup>
import Picture from './Picture.vue'
import Audio from './Audio.vue'
import Markdown from 'vue3-markdown-it';


const props = defineProps({
  activity: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  last: {
    type: Boolean,
    required: false
  },
  itinerary: {
    type: Object,
    required: true
  },
})

</script>

<template>
  <div>
    <div class="answer-done zmb-5" v-if="!last">

      <div class="text-center mt-5">
        <img src="@/assets/images/ok.svg" class="ok" alt="" />
      </div>

      <h1 class="text-center mb-4">Enhorabona!</h1>

      <div class="answer-content pb-4">
        <Markdown class="answer-text" v-if="activity.answer_text" :source="activity.answer_text" />
        <Audio :audio="activity.answer_audio"></Audio>
        <Picture class="rounded" :image="activity.answer_image"></Picture>
      </div>
      <div class="enigma text-center w-75 mr-auto ml-auto">
        <img src="@/assets/images/agla-enigma.svg" class="mt-4 mb-3 zok" alt="" />
        <h2 v-if="activity.answer_code">Clau per al<br>repte final:</h2>
      </div>
      <div class="answer-code mt-4" :class="`bg-color-${index}`">
        <div class="zcircle mr-auto ml-auto text-center" :class="activity.answer_code.length > 1 ? 'circle-bg': 'circle'">
          {{ activity.answer_code }}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text-center mt-3 mb-3">
        <img src="@/assets/images/perfect.svg" class="ok" alt="" />
      </div>
      <h1 class="text-center mb-4">
        Perfecte,<br><span class="text-uppercase">{{ activity.answer_code }}</span>
      </h1>      
      <div class="zanswer-content pb-4">
        <Markdown class="answer-text" v-if="activity.answer_text" :source="activity.answer_text" />
        <Audio :audio="activity.answer_audio"></Audio>
        <Picture class="rounded mt-3" :image="activity.answer_image"></Picture>
      </div>      
      <div v-if="itinerary" class="zanswer-content pb-4">
        <Picture class="rounded mt-3" :image="itinerary.attributes.answer_image"></Picture>
        <Audio :audio="itinerary.attributes.answer_audio"></Audio>
        <Markdown class="answer-text" v-if="itinerary.attributes.answer_text" :source="itinerary.answer_text" />
      </div>      
    </div>    
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
  margin-bottom: 6rem;
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

.circle-bg {
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

.answer-done {
  margin-bottom: 40px;
}
</style>
