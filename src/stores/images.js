import { defineStore } from "pinia";
import { ref } from "vue";

export const images = defineStore("images", () => {
  let imageArray = ref(JSON.parse(localStorage.getItem("images")) || []);
  let startIndex = ref(imageArray.value.length);

  const actions = {
    addImage(src, prompt) {
      imageArray.value.push({
        prompt: prompt,
        src: src,
        created: Date.now(),
      });
      localStorage.setItem("images", JSON.stringify(imageArray.value));
      imageArray.value = JSON.parse(localStorage.getItem("images"));
      startIndex = JSON.parse(localStorage.getItem("images")).length;
    },
  };

  return {
    actions,
    imageArray,
    startIndex,
  };
});
