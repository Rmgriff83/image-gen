<template>
  <div class="img-box">
    <img v-if="!globalStore.loading" :src=src>
    <p v-else><v-progress-circular model-value="20" indeterminate></v-progress-circular></p>
    
  </div>
</template>

<script>
import { global } from '@/stores/global';

export default {
  props:{
    src:String
  },
  setup(){

    const globalStore = global();

      return{
        globalStore
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
