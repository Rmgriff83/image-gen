<template>
  <h1>AI Image Generator</h1>
  <InputText v-on:imageReceived = "processImage"/>
  <br>
  <GeneratedImage :src="generatedImage.src"/>
</template>

<script>
import InputText from './components/InputText.vue';
import GeneratedImage from './components/GeneratedImage.vue';

export default {
  name: 'App',
  components: {
    InputText,
    GeneratedImage
  }
}
</script>

<script setup>
import { reactive } from 'vue';
  let generatedImage = reactive({src: ''});

  function processImage(value){
    generatedImage.src = value;
  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
