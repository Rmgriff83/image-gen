<template>
  <div class="input-box">
    <form action="">
      <label for="image-prompt">Input Prompt</label>
      <br>
      <input id="image-prompt" name="image-prompt" type="text" v-model="prompt">
      <br>
      <button type="submit" @click.prevent="generateImage(prompt)">Submit</button>
    </form>
  </div>
</template>

<script>
import { defineComponent,ref } from 'vue';
import { global } from '@/stores/global.js';
import { images } from '@/stores/images.js';
import axios from 'axios';

export default defineComponent({
  
  setup(){

    const prompt = ref('');
    const globalStore = global();
    const imageStore = images();

    async function generateImage(input){

        if ( input === '' ) {
          globalStore.errors.push('Please enter a prompt.');
          setTimeout( () => {
              globalStore.errors = [];
            }, 2050);
          return;
        }

        if ( input.includes('<') || input.includes('>') || input.includes('$') || input.includes('#') ) {
          globalStore.errors.push('Disallowed character included in prompt.');
          setTimeout( () => {
              globalStore.errors = [];
            }, 2050);
          return;
        }

        prompt.value = '';
        globalStore.errors = [];
        globalStore.loading = true;

        const apiKey = process.env.VUE_APP_API_KEY; // Replace with your OpenAI API key
        const apiUrl = process.env.VUE_APP_API_URL; // OpenAI Image API URL

        const requestBody = {
            prompt: input,
            n: 1, // Number of images to generate
        };

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        };

        await axios.post( apiUrl, JSON.stringify(requestBody), {
          headers: headers
        }).then( (res) => {
          if( res.data.data[0].url ) {
            imageStore.actions.addImage(res.data.data[0].url, requestBody.prompt);
            this.$emit('imageReceived', res.data.data[0].url);
            globalStore.loading = false;
          } else {
            globalStore.errors.push('There has been an unexpected error.')
            globalStore.loading = false;
          }
        }).catch( (e) => {
          let error = e.toJSON();

          if ( error ) {
            if ( error.status === 400 ) {
            globalStore.errors.push('Sorry, this request is against OpenAi\'s content policy.');
            setTimeout( () => {
              globalStore.errors = [];
            }, 2050);
          } else {
            globalStore.errors.push('There was an error when processing your request. Please try again later.');
            setTimeout( () => {
              globalStore.errors = [];
            }, 2050);
          }
          } else {
            globalStore.errors.push('You have encountered an unexpected error. Please try again later.');
            setTimeout( () => {
              globalStore.errors = [];
            }, 2050);
          }
          globalStore.loading = false;
        })
      }
      return{
        generateImage,
        prompt
      }
    }

  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
