<script setup>
import { ref, reactive } from 'vue'
import { useGameStore } from '../stores/game';
import query from '../utils/query'
import { useRouter, useRoute } from 'vue-router'

const route = query.getSlugFromHash()
const router = useRouter();

const gameStore = useGameStore()

const onLine = ref(navigator.onLine)

const username = ref("")

const form = reactive({
  username: ""
});

const props = defineProps({
  itineraryId: {
    type: Number,
    required: true
  }
})

const setOnline = () => {
  console.log('navigator.onLine true')
  onLine.value = true
}

const setOffline = () => {
  console.log('navigator.onLine false')
  onLine.value = false
}

window.addEventListener('online', setOnline)
window.addEventListener('offline', setOffline)


const send = async () => {
  await gameStore.finish(props.itineraryId, route, form.username)
  router.push('/' + route + '/galeria')
}


// watch(navigator.onLine, (newValue) => {
//     console.log('navigator.onLine newValue', newValue)
//     onLine.value = newValue
// })

</script>

<template>
  <div class="name-form container pt-5">
    <div>
      <div>
        Escriviu el vostre nom i així apareixereu a la <b>“Galeria dels Pirineus”</b>. Podreu veure els vostres itineraris acabats o veure altres
        rutes que us falten!
      </div>

      <input class="mt-3 mb-3 w-100" type="text" placeholder="NOM" v-model="form.username" />
      <div v-if="!onLine" class="mt-1 mb-3">
        Atenció, no teniu cobertura!
        Només podreu accedir a la <b>“Galeria dels Pirineus”</b> de la fama quan tingueu dades.
      </div>
      <button class="w-100 mb-5" :disabled="!onLine || !form.username" @click="send">ENVIAR DADES I VEURE LA<br>GALERIA DELS PIRINEUS</button>


    </div>

  </div>
</template>

<style scoped>
.name-form {
  background: #E0F0E5;
}

input {
  background: #fff;
  border-radius: 25px;
  border: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 1.5px;
  padding: 6px 26px;
  height: 46px;
}

input:focus-visible {
  border: 0 !important;
}

button {
  border: 0;
  background-color: #49A986;
  border-radius: 25px;
  text-align: center;
  color: var(--blanc, #FFF);
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 16px 26px;
}

button:hover {
  background: #003842;
}
</style>
