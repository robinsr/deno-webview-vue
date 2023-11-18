import { defineConfig } from 'npm:vite@^4.4.11';
import { fileURLToPath } from 'https://deno.land/std@0.177.1/node/url.ts';
import { default as vuePlugin } from 'npm:@vitejs/plugin-vue@^4.4.0';
import 'npm:vue@^3.3.4';
import 'npm:vue-router@4';
import 'npm:simple-keyboard@3.7.26';
import 'npm:simple-keyboard-layouts@3.3.34';
import 'npm:lucide-vue-next@0.292.0';
import '@utils/num.ts';
import '@utils/text.ts';
import '@keys/symbol.ts';
import 'lodash';
import * as corejs from "corejs"
import 'nanoid';

type ImportMap = {
  imports: {
    [specifier: string]: string;
  },
  scopes?: {
    [specifier: string]: string;
  }
}

const decoder = new TextDecoder('utf-8');
const importMap = JSON.parse(decoder.decode(Deno.readFileSync('./import_map.json'))) as ImportMap;

console.log(importMap);

const vueStuff = {
  template: {
    compilerOptions: {
      // treat all tags with a dash as custom elements
      // isCustomElement: (tag: string) => tag.includes('-')
      // All Xel components start with x-
      isCustomElement: (tag: string) => tag.startsWith('x-')
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //importMaps([json]),
    vuePlugin(vueStuff)
  ],
  resolve: {
    alias: importMap.imports,
  },
  server: {
    headers: {
      'Server-Name': 'Vite-Server',
      'Server-Cwd': Deno.cwd()
    },
    proxy: {
      '/api': 'http://localhost:5183'
    }
  }
});
