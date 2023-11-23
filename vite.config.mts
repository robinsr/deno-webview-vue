import vite, { defineConfig } from 'npm:vite@^4.4.11';
import { default as vuePlugin } from 'npm:@vitejs/plugin-vue@^4.4.0';
import  { importAssertionsPlugin }  from 'npm:rollup-plugin-import-assert@3.0.1';

import 'npm:vue@^3.3.4';
import 'npm:vue-router@4';
import 'npm:simple-keyboard@3.7.26';
import 'npm:lucide-vue-next@0.292.0';
import '@utils/num.ts';
import '@utils/text.ts';
import '@keys/symbol.ts';
import 'lodash';
import "corejs"
import 'nanoid';
import 'npm:lokijs@1.5.12';
import 'npm:pinia@2.1.7';

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

let viteAliases = Object.entries(importMap.imports)
  .filter(([k, v]) => !v.startsWith('npm'))
  .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

console.log(viteAliases);

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
    //importAssertionsPlugin(),
    vuePlugin(vueStuff),
  ],
  resolve: {
    alias: viteAliases,
  },
  server: {
    headers: {
      'Server-Name': 'Vite-Server',
      'Server-Cwd': Deno.cwd()
    },
    // proxy: {
    //   '/api': 'http://localhost:5183'
    // }
  }
});
