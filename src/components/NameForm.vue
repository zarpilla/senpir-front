<script setup>
import { ref, watch } from 'vue'
import { useGameStore } from '../stores/game';

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
  gameStore.finish(username.value)
}


// watch(navigator.onLine, (newValue) => {
//     console.log('navigator.onLine newValue', newValue)
//     onLine.value = newValue
// })

</script>

<template>
  <div>    
    
    <div>
    <br>    
    <div>
      <br>
      <br>
      <h2>Saló de la fama</h2>
      Escriu el teu nom i així apareixeràs al saló de la fama. Podràs veure els teus itineraris acabats o veure altres rutes que et falten!
    </div>
    <div v-if="!onLine">
        Atenció, no tens cobertura!
        Només podràs accedir al saló de la fama quan tinguis dades        
    </div>
      <br>
      <label>EL TEU NOM: </label>
      <input type="text" v-model="username" />
      <button :disabled="!onLine || !username" @click="send">ENVIAR DADES I VEURE SALÓ DE LA FAMA</button>
      <br>
      <br>
      <!-- <a target="_blank" href="/salo-de-la-fama/">SALÓ DE LA FAMA</a>
      <br> -->
      <br>
      <br>
      <br>
    </div>
    
  </div>
</template>

<style scoped>
</style>
