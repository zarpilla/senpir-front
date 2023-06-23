<script setup>
import { ref, watch } from 'vue'
import { useGameStore } from '../stores/game';
import query from '../utils/query'

const route = query.getSlugFromHash()

const gameStore = useGameStore()

const onLine = ref(navigator.onLine)

const username = ref("")



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


const send = () => {
  gameStore.finish(route, username.value)
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
        Escriu el teu nom i així apareixeràs al “saló de la fama”. Podràs veure els teus itineraris acabats o veure altres
        rutes que et falten!
      </div>
      <div v-if="!onLine || true">
        Atenció, no tens cobertura!
        Només podràs accedir al saló de la fama quan tinguis dades
      </div>

      <input class="mt-3 mb-3 w-100" type="text" placeholder="NOM" v-model="username" />
      <button class="w-100 mb-5" :disabled="!onLine || !username" @click="send">ENVIAR DADES I VEURE<br>SALÓ DE LA
        FAMA</button>

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
</style>
