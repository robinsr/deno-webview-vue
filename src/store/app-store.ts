import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useStore = defineStore('app-store',() => {
  const debug = ref(false);

  const theme = ref<{
    useDarkMode: boolean
  }>({
    useDarkMode: false
  });

  const toggleDarkMode = () => {
    theme.value.useDarkMode = !theme.value.useDarkMode;
  };

  const toggleDebug = () => {
    debug.value = !debug.value;
  };

  return {
    debug, theme,
    toggleDarkMode, toggleDebug
  }
});
