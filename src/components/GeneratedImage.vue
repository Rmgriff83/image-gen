<template>
  <div v-if="!globalStore.loading">
    <div v-if="imageArray.length > 0">
      <v-carousel
      height="600"
      :model-value="startIndex"
      >
        <v-carousel-item v-for="image in imageArray" :key="image.prompt">
          <v-img
            :src=image.src
            aspect-ratio="16/9"
          >
          </v-img>
        </v-carousel-item>
      </v-carousel>
      <br>
      <v-btn
      @click="deleteImages()">
        Delete Images
      </v-btn>
    </div>
    <p v-else>Input text prompt to generate an image</p>
  </div>
  <p v-else>
      <v-progress-circular model-value="20" indeterminate></v-progress-circular>
  </p>
  <div :class="errors ? 'error-box active' : 'error-box'">
    <p>
      {{ errors }}
    </p>
  </div>
  <div :class="notifications ? 'error-box active' : 'error-box'">
    <p v-for="notification in notifications" :key="notification">
      {{ notifications }}
    </p>
  </div>
</template>

<script>
import { computed,onMounted } from 'vue';
import { global } from '@/stores/global';
import { images } from '@/stores/images';

export default {
  props:{
    src:String
  },
    setup(){
      const globalStore = global();
      const imagesStore = images();

      const errors = computed( () => {
        if ( globalStore.errors.length > 0 && globalStore.errors[0] ){
          return globalStore.errors[0];
        } else {
          return false;
        }
      });

      const notifications = computed( () => {
        if ( globalStore.notifications.length > 0 && globalStore.notifications[0] ){
          return globalStore.notifications;
        } else {
          return false;
        }
      });

      let imageArray = computed( () => {
        return imagesStore.imageArray;
      });

      let startIndex = computed( () => {
        return imagesStore.imageArray.length - 1;
      });

      //delete all images
      function deleteImages(){
        imagesStore.actions.deleteImages();
      }

      onMounted( () => {
        setInterval( () => {
          imageArray.value.forEach(image => {
            if ( (Date.now() - image.created) >= 719000) {//720000 something weird with the timestamp...Images are unauthenticated after 2 hrs
              globalStore.notifications.push(image.prompt + ' should be deleted.');
              imagesStore.actions.deleteImage(image.src);

              setTimeout( () => {
                globalStore.notifications = [];
              }, 2050);
            }
          });
        }, 15000);
      });

      return{
        globalStore,
        errors,
        notifications,
        imageArray,
        startIndex,
        deleteImages
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  .active{
    visibility: visible !important;
    bottom:10px;
    z-index: 10;
  }
</style>
