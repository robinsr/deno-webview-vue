import { defineStore } from 'pinia';
import { ref } from 'vue';


const fonts = [ 'symbols', 'system', 'helvetica', 'user' ] as const;
type SymbolFonts = typeof fonts;
type SymbolFont = SymbolFonts[number];


type ThemeOptions = {
  useDarkMode: boolean;
  kbdFont: SymbolFont;
  keycapFont: SymbolFont;
  cssVars: {
    [prop: string]: string | number | null;
  }
}

const defaultThemeOpts: ThemeOptions = {
  useDarkMode: true,
  kbdFont: 'symbols',
  keycapFont: 'helvetica',
  cssVars: {}
}


export const useStore = defineStore('app-store',() => {
  const debug = ref(false);
  const theme = ref<ThemeOptions>(defaultThemeOpts);

  const toggleDarkMode = () => {
    theme.value.useDarkMode = !theme.value.useDarkMode;
  };

  const toggleDebug = () => {
    debug.value = !debug.value;
  };

  const addCssVar = (propName: string, value?: string | number) => {
    const { cssVars } = theme.value;

    if (propName in cssVars) {
      return;
    }

    cssVars[propName] = value || null;
  }

  const updateCssVar = (propName: string, value: string | number) => {
    const { cssVars } = theme.value;
    if (propName in cssVars) {
      theme.value.cssVars[propName] = value;
    }
  }

  const changeFont = (font: SymbolFont) => {
    theme.value.kbdFont = font;
  }

  return {
    debug, theme,
    toggleDarkMode, toggleDebug, addCssVar, updateCssVar, changeFont
  }
});
