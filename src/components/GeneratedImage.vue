<template>
  <div class="img-box">
    <v-img
     v-if="!globalStore.loading"
     aspect-ratio="16/9"
     max-height="600"
     :src=src>
    </v-img>
    <p v-else>
      <v-progress-circular model-value="20" indeterminate></v-progress-circular>
    </p>
  </div>
  <div>
    <p v-if="globalStore.errors.length > 0">
      {{ globalStore.errors[0] }}
    </p>
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
  .img-box{
    display: flex;
    justify-content: center;
  }
</style>
