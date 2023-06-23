<script setup>
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { watch, onMounted } from 'vue'
defineProps({
  msg: {
    type: String,
    required: true
  }

  // $route.params.id
})
</script>

<template>
  <div class="header">

    <div class="d-flex flex-row p-3 pt-2 pb-2">
      <div class="col0 zp-2">
        <RouterLink to="/">
          <img src="@/assets/Logo_SENPIR_blanc.png" class="logo" alt="senpir" />
        </RouterLink>
      
    </div>    
    <div class="col1 zp-2">
      <h1 class="text-left br-white pr-2">{{ msg }}</h1>
    </div>

</div>
    
  </div>
</template>

<style scoped>
.header {
  background-color: #49A986;
}
.logo{
  margin: 0;
  padding-top: 4px;
  margin-right: 1rem;
}
h1 {
  font-style: normal;
font-weight: 600;
font-size: 10px;
line-height: 11px;
color: #FFFFFF;
padding-left: 1rem;
margin-top: 4px;
padding-top: 4px;
padding-bottom: 4px;
}
.br-white {
  border-left: 1px solid #fff;
}
/* .col0, .col1{
  width: 50%;
} */
.col1 {
  max-width: 140px;
}
</style>
