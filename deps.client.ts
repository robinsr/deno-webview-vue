import * as corejs from "https://esm.sh/v133/core-js@3.33.2/es2022/actual.mjs"

console.log(corejs)

import KeyboardKey, { DEFAULT_OPTS } from '@keys/keyboard-key.ts';

const key = new KeyboardKey('TestDenoImportMap', DEFAULT_OPTS);

const iOpts = { colors: true, getters: true, showHidden: true }

console.log(Deno.inspect(key, iOpts));
console.log(Deno.inspect(Object.getPrototypeOf(key), iOpts));

