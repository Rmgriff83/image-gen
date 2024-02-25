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
import axios from 'axios';

export default defineComponent({
  
  setup(){

    const prompt = ref('');
    const globalStore = global();

    async function generateImage(input){

        if ( input === '' ) {
          globalStore.errors.push('Please enter a prompt.');
          return;
        }

        if ( input.includes('<') || input.includes('>') || input.includes('$') || input.includes('#') ) {
          globalStore.errors.push('Disallowed character included in prompt.')
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
            this.$emit('imageReceived', res.data.data[0].url);
            globalStore.loading = false;
          } else {
            globalStore.errors.push('There has been an unexpected error.')
            globalStore.loading = false;
          }
        }).catch( (e) => {
          let error = e.toJSON();

          if ( error.status === 400 ) {
            globalStore.errors.push('Sorry, this request is against OpenAi\'s content policy.');
          } else {
            globalStore.errors.push('There was an error when processing your request. Please try again later.')
          }
          globalStore.loading = false;
        })

        
        // return this.$emit('imageReceived', responseData.data[0].url);
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
