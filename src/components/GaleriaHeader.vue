<script setup>
const props = defineProps({
})

</script>

<template>
  <div class="container text-center">
    <div class="text-center squirel">
      <img src="@/assets/images/flor.svg" class="mt-4 mb-3" alt="" />
    </div>
    <div class="text-center squirel-text mb-3">
      <h1>Galeria <br>dels Pirineus</h1>
      <div class="separa mt-4 mb-3"></div>
    </div>
    <div class="help-text mt-4 mb-2">
      Felicitats, ja heu aconseguit tots aquests personatges!
    </div>

    <img src="@/assets/images/arrow-green.svg" class="mt-1 mb-3" alt="" />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;

  /* Títols/Títol H1 */
  font-size: 30px;
  font-weight: 600;
  line-height: 32px;
}

.separa {
  width: 12vw;
  height: 0px;
  /* Senpir_verd */
  border: 2px solid #49A986;
  margin: auto;
}

.help-text {
  text-align: center;

  /* Text/Big */
  font-size: 21px;
  font-weight: 600;
  line-height: 24px;
}
</style>
