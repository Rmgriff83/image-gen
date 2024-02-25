<template>
  <div class="input-box">
    <form action="">
      <label for="image-prompt">Input Prompt</label>
      <br>
      <input id="image-prompt" name="image-prompt" type="text" v-model="prompt">
      <br>
      <button type="submit" @click.prevent="generateImage()">Submit</button>
    </form>
  </div>
</template>

<script>
import { defineComponent,ref } from 'vue';
import { global } from '@/stores/global.js'
export default defineComponent({
  
  setup(){

    const prompt = ref('');
    const globalStore = global();

    async function generateImage(){
        globalStore.loading = true;

        const apiKey = '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'; // Replace with your OpenAI API key
        const apiUrl = 'https://api.openai.com/v1/images/generations'; // OpenAI Image API URL

        const requestBody = {
            prompt: prompt.value,
            n: 1, // Number of images to generate
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        const responseData = await response.json();
        globalStore.loading = false;
        
        return this.$emit('imageReceived', responseData.data[0].url);
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
