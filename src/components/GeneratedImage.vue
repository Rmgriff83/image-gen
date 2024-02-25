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
  <div :class="errors ? 'error-box active' : 'error-box'">
    <p>
      {{ errors }}
    </p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { global } from '@/stores/global';

export default {
  props:{
    src:String
  },
  setup(){
    const globalStore = global();

    const errors = computed( () => {
      if ( globalStore.errors.length > 0 && globalStore.errors[0] ){
        return globalStore.errors[0];
      } else {
        return false;
      }
    })

      return{
        globalStore,
        errors
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
  .error-box{
    visibility: hidden;
    position:fixed;
    bottom:-50px;
    left:10px;
    padding:10px 15px;
    background:darkorange;
    color:black;
    font-weight: bold;
    border-radius:6px;
    transition: all .15s ease-in-out;
  }
  .error-box.active{
    visibility: visible !important;
    bottom:10px;
  }
</style>
