<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useGameStore } from '../stores/game'
import { RouterLink } from 'vue-router'



const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  }
})


const gameStore = useGameStore();

const showInfo = ref(false)

const game = ref(null)
game.value = gameStore.getGame(props.itinerary.attributes.slug)

const balls = ref(game.value.answers.filter((a, i) => i < game.value.answers.length - 1))


watch(showInfo, (newValue) => {
  game.value = gameStore.getGame(props.itinerary.attributes.slug)
})


</script>

<template>
  <div class="text-center" v-if="itinerary && game">

    <div class="trigger">

      <Transition>

        <div class="info" v-show="showInfo">

          <img src="@/assets/images/agla-group.svg" class="mt-4 mb-3" alt="" />
          <h1 class="pb-3">Pistes<br>aconseguides</h1>

          <div class="d-flex mb-2 pb-4 justify-content-center bordered-t">
            <div class="ball-outter mt-2" v-for="(a, i) in balls" :key="i">              

              <svg class="mt-1 mb-3" :class="game.answers[i] !== '' ? `fill-color-${i}` : 'fill-default'" width="21"
                height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.7793 2.57173L18.6054 0.419561C18.4532 0.267387 18.2358 0.180431 18.0184 0.20217C17.801 0.223909 17.6054 0.332604 17.475 0.506517L15.7793 2.89782L14.8445 1.96304C13.6706 0.810865 12.1271 0.158691 10.4749 0.158691C8.82277 0.158691 7.2793 0.810865 6.10538 1.96304L5.45321 2.61521C4.99669 3.07173 4.82278 3.72391 4.95321 4.3326L3.45321 5.8326C1.75756 7.55 0.779297 9.91956 0.779297 12.3543L0.822775 19.4196C0.822775 19.8326 1.1706 20.1587 1.58364 20.1587H8.62712C11.0836 20.1587 13.3663 19.2022 15.1054 17.4848L16.6271 15.963C16.7576 15.9848 16.9097 16.0065 17.0402 16.0065C17.5402 16.0065 17.9967 15.8109 18.3445 15.463L18.9967 14.8109C21.4097 12.3978 21.4097 8.48478 18.9967 6.07173L18.2793 5.39782L20.6706 3.70217C20.8445 3.57173 20.9749 3.37608 20.9967 3.15869C21.0184 2.9413 20.9315 2.72391 20.7793 2.57173ZM14.0184 16.4196C12.5836 17.8761 10.6489 18.6587 8.60538 18.6587H2.32278L2.30104 12.3543C2.30104 10.3326 3.10538 8.3326 4.54017 6.89782L5.84451 5.59347L15.3445 15.0935L14.0184 16.4196ZM17.1923 4.3326L16.8445 3.98478L18.1706 2.11521L19.0619 3.00652L17.1923 4.3326Z"
                  fill="#E0F0E5" />
              </svg>

              <RouterLink @click="showInfo = !showInfo" class="ball p-2" :class="game.answers[i] !== '' ? `bg-color-${i}` : 'bg-default'"
                :to="`/${itinerary.attributes.slug}/p/${i + 1}`">{{ i + 1 }}
              </RouterLink>
              <div class="answer mt-2" :class="game.answers[i].length > 1 ? 'small-text' : 'z'">{{ game.answers[i] }}</div>
              <div v-if="i < balls.length - 1" class="ball-row"></div>
            </div>
          </div>
        </div>
      </Transition>
      <div class="bar" @click="showInfo = !showInfo">
        <img src="@/assets/images/agla.svg" class="mt-3 mb-3" alt="" />
        <span class="text">PISTES ACONSEGUIDES</span>
        <img v-if="!showInfo" src="@/assets/images/arrow.svg" class="mt-2 mb-2" alt="" />
        <img v-if="showInfo" src="@/assets/images/arrow-down.svg" class="mt-2 mb-2" alt="" />
      </div>

    </div>





  </div>
</template>

<style scoped>
.trigger {
  background: #003842;
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
  letter-spacing: 1.5px;
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
}

.answer {
  height: 30px;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  margin-top: 6px;
}

.answer.small-text{
  font-size: 12px;
}


.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}</style>
