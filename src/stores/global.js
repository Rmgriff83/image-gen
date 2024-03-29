import { defineStore } from "pinia";
import { ref } from "vue";

export const global = defineStore("global", () => {
  const loading = ref(false);
  const errors = ref([]);
  const notifications = ref([]);

  return {
    loading,
    errors,
    notifications,
  };
});
