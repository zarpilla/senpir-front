<script setup>
import Picture from './Picture.vue'


const props = defineProps({
  itinerary: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div v-if="itinerary">

    <div class="step-0" v-show="!props.end">

      <div class="container mb-5">

        <div class="row">
          <div class="col-12 col-md-12 pt-md-5">

            <div class="col-12 col-md-12 pt-md-5 text-center">

              <Picture class="mt-4 mb-4 rounded" :image="itinerary.attributes.image"></Picture>

              <div class="text mt-5">
                Us proposem uns itineraris per a tota la família que, a través de jocs i reptes, ens ajudaran a conèixer i cuidar la biodiversitat dels Pirineus.
                <br />
                Us animeu?
              </div>
              <div class="text-zstart mt-4">
                SENPIR, és un projecte que fomenta la descoberta dels valors dels espais naturals i el seu respecte, cercant l’equilibri entre les activitats de lleure a la natura i la seva conservació.
Els Pirineus són un món sensorial, ple de sensacions i sensualitat. Desperta els sentits, els sentiments i la sensibilitat a les persones que s’hi apropen. I si volem que tothom continuï gaudint dels seus espais naturals ens cal seny i un bon senderi.

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
