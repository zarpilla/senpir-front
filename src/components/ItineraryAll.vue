<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useGameStore } from '../stores/game'
import { RouterLink } from 'vue-router'


const props = defineProps({
  slug: {
    type: String,
    required: true
  },
  back: {
    type: Boolean,
    required: false
  }
})


</script>

<template>
  <div class="text-center">

    <div class="trigger">
      <div class="bar">
        <RouterLink :to="back ? `/${slug}` : `/${slug}/routes`">
          <img src="@/assets/images/flag.svg" class="mt-3 mb-3" alt="" />
        <span class="text">{{ !back ? 'ITINERARIS SENPIR' : 'COMENÇAR ITINERARI' }}</span>
        <img v-if="!back" src="@/assets/images/arrow-right.svg" class="mt-2 mb-2" alt="" />
        <img v-if="back" src="@/assets/images/arrow-left.svg" class="mt-2 mb-2" alt="" />
        </RouterLink>
        
      </div>
    </div>

  </div>
</template>

<style scoped>
.trigger {
  background: #003842;
  background: var(--senpir-verd, #49A986);
  color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

.text {
  margin-left: 20px;
  margin-right: 20px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 0 10px;
  text-decoration: none!important;
  color: #fff 
}
a{
  text-decoration: none!important;
}

.info {
  background: #fff;
  color: #003842;
  box-shadow: 1px 3px 10px 2px rgba(0, 0, 0, 0.1);
}

h1 {
  font-weight: 600;
  font-size: 30px;
  line-height: 32px;
}


.ball {
  height: 30px;
  width: 30px;
  border-radius: 50px;
  background: #E0F0E5;
  display: block;
  margin: 0 8px;

  font-weight: 600;
  font-size: 20px;
  line-height: 17px;
  color: #003842;
  text-decoration: none;
  z-index: 10;
}

.ball-outter {
  position: relative;
}

.ball-row {
  width: 20px;
  height: 3px;
  background: #E0F0E5;
  position: absolute;
  right: -12px;
  top: 55px;
  z-index: 0;
}

.bordered-t {
  border-top: 1px solid #003842;
  margin: 0 12vw;
  padding-top: 1rem;
}

.bar {
  cursor: pointer;

  color: var(--senpir-verd-clar, #E0F0E5);
text-align: center;

/* Botó/Medium */
font-size: 14px;
font-weight: 600;
line-height: 17px;
letter-spacing: 1.5px;
text-transform: uppercase;
}

.answer {
  height: 30px;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  margin-top: 6px;
}


.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}</style>
