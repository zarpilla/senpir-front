<script setup>
import Picture from './Picture.vue'
import Audio from './Audio.vue'
import Markdown from 'vue3-markdown-it';


const props = defineProps({
  option: {
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
  done: {
    type: Boolean,
    required: false
  }
})

</script>

<template>
  <div>
    
    <div v-if="option.name && option.name.length < 3" class="option-with-name text-center pt-4 pb-4"
      :class="`bg-color-${index}`">
      <div class="circle ml-auto mr-auto">
        {{ option.name }}
      </div>      
      <Picture :overlay="option.image_overlay" :cover="option.image_cover" :index="index" class="w-100-img rounded" :image="option.image"></Picture>
      <Audio :audio="option.audio"></Audio>
      <Markdown v-if="option.description" :source="option.description" />
    </div>
    <div v-else-if="option.name && option.name.length >= 3"
      class="option-with-name-large text-center pt-4 pb-4" :class="option.image_bg ? `bg-color-${index}`: 'z'">
      <h3 class="mb-0 zpb-0" :class="last ? 'pb-0 last-h3' : 'z'" v-if="option.name">{{ option.name }}</h3>
      <Picture :overlay="option.image_overlay" :cover="option.image_cover" :index="index" class="w-100-img rounded" :image="option.image"></Picture>
      <Audio :audio="option.audio"></Audio>
      <Markdown v-if="option.description" :source="option.description" />
    </div>    
    <div v-else-if="done && option.answer_name" class="option-with-name-large text-center pt-4 pb-4"
    :class="option.image_bg ? `bg-color-${index}`: 'z'">
    <h3 class="mb-0 zpb-0" :class="last ? 'pb-0 last-h3' : 'z'">{{ option.answer_name }}</h3>
      <Picture :overlay="option.image_overlay" :cover="option.image_cover" :index="index" class="w-100-img rounded" :image="option.image"></Picture>
      <Audio :audio="option.audio"></Audio>
      <Markdown v-if="option.description" :source="option.description" />
    </div>
    <div v-else-if="!option.name && option.image && option.image.data && option.image.data.id" class="'option-without-name'" :class="option.image_bg   ? `bg-color-${index}`: 'z'">
      <h3 v-if="done && option.answer_name" class="mb-0 zpb-0" :class="last ? 'pb-0 last-h3' : 'z'" >{{ option.answer_name }}</h3>
      <Picture :overlay="option.image_overlay" :cover="option.image_cover" :index="index" class="w-100-img rounded" :image="option.image"></Picture>
      <Audio :audio="option.audio"></Audio>
      <Markdown v-if="option.description" :source="option.description" />
    </div>
    
    <div v-else
      class="option-with-name-large text-center pt-4 pb-4">
      <Picture :overlay="option.image_overlay" :cover="option.image_cover" :index="index" class="w-100-img rounded" :image="option.image"></Picture>
      <Audio :audio="option.audio"></Audio>
      <Markdown v-if="option.description" :source="option.description" />
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
.option-with-name-large h3.last-h3{
  font-size: 30px;
  font-weight: 600;
  line-height: 50px;
  letter-spacing: 1.5px;
  padding-bottom: 5px;
}
</style>
