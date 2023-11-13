import KeyboardSymbol, { KeySym } from './keyboard-symbol.ts';

const range = (start: number, stop: number, step = 1): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);



const nameCode = '{name} {code}';

export const SYMBOL_MAP: Record<string, KeyboardSymbol> = {
  'cmd': new KeyboardSymbol('meta', nameCode, 'command super', { hasLR: true, code: '⌘' }),
  'alt': new KeyboardSymbol('alt', nameCode, 'option', { hasLR: true, code: '⌥' }),
  'ctrl': new KeyboardSymbol('ctrl', nameCode, 'control CTRL Ctrl', { hasLR: true, code: '⌃' }),
  'shift': new KeyboardSymbol('shift', nameCode, 'SHIFT', { hasLR: true, code: '⇧' }),
  'tab': new KeyboardSymbol('tab', nameCode, '', { code: '⇥' }),
  'esc': new KeyboardSymbol('escape', nameCode, '', { code: '⎋' }),
  'enter': new KeyboardSymbol('enter', 'return {code}', 'return ↵', { code: '↵' }),
  'del': new KeyboardSymbol('backspace', 'delete {code}', 'delete', { code: '⌫' }),
  'fdel': new KeyboardSymbol('forwarddelete', '{code}', 'fdel', { code: '⌦' }),
  'arrowUp': new KeyboardSymbol('arrowup', '{code}', 'up UP Up arrowup', { code: '↑' }),
  'arrowDn': new KeyboardSymbol('arrowdown', '{code}', 'down DOWN Down arrowdown', { code: '↓' }),
  'arrowL': new KeyboardSymbol('arrowleft', '{code}', 'left LEFT Left arrowleft', { code: '←' }),
  'arrowR': new KeyboardSymbol('arrowright', '{code}', 'right RIGHT Right arrowright', { code: '→' }),
  'fn': new KeyboardSymbol('fn', '{name}', 'Fn'),
  'space': new KeyboardSymbol('space', '', 'Space'),
  'pageUp': new KeyboardSymbol('pageup', 'page up', 'page-up'),
  'pageDn': new KeyboardSymbol('pagedown', 'page down', 'page-down'),
  'home': new KeyboardSymbol('home', '{code}', 'Home', { code: '↖' }),
}

const fKeys = range(1,20)
  .map(num => `f${num}`)
  .map(key => new KeyboardSymbol(key, key, key.toUpperCase()));

const alphaKeys = range(97, 122)
  .map(num => String.fromCharCode(num))
  .map(alpha => new KeyboardSymbol(alpha, alpha, alpha.toUpperCase()));

const numPadKeys = range(0, 9)
  .map(num => new KeyboardSymbol(`numpad${num}`, '{name}', num.toString(10)));

const numRowKeys = '`~ 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) -_ =+'.split(' ');
const nonAlphaKeys = '[{ ]} \\| ;: \'\" ,< .> /?'.split(' ');


const charKeys = [ ...numRowKeys, ...nonAlphaKeys]
  .map(key => key.split(''))
  .map(([ key, shift ]) => new KeyboardSymbol(key, '{name}\n{code}', key, { code: shift }));

[ fKeys, alphaKeys, charKeys ].flatMap(i => i).forEach(key => SYMBOL_MAP[key.name] = key);

const SYMBOLS = Object.values(SYMBOL_MAP);

console.log(SYMBOLS.map(s => s.forms));

export const getDisplaySymbol = (symbol: string): KeySym => {
  const result = SYMBOLS.find(sym => sym.matches(symbol));
  //console.log(`Matching ${symbol} (${result? 'MATCH!' : ''}):`, result ? result.forms : null);
  return result || new KeyboardSymbol('NO_SYM', '\u22A0', '').toJS()
}

export const getSymbolForKey = (key: string): KeySym => {
  if (key.length > 1) {
    // non-single-char keys must match {[a-zA-Z0-9]}
    if (/^\{[a-zA-Z0-9]+}$/.test(key)) {
      //console.log('Valid key string:', key)
    } else {
      //console.error('Invalid key string:', key);
    }
  }

  const match = SYMBOLS.find(sym => sym.matches(key));

  if (match) {
    return match.toJS();
  }

  console.warn(`No KeyboardSymbol found for ${key}`);

  if (key.length === 1) {
    return new KeyboardSymbol(key.toLowerCase(), '{name}', key.toUpperCase()).toJS();
  }

  if (key.startsWith('{') && key.endsWith('}')) {
    return new KeyboardSymbol(key, '{name}', '').toJS();
  }

  return new KeyboardSymbol(`{${key}}`, '{name}', key).toJS();
}

export const mapKeySymbols = (keys: string): KeySym[] => {
  if (!keys) {
    return [];
  }

  const uniqKeys = Array.from(new Set(keys.split(/(\s|\+)/g)));

  return uniqKeys
    .filter(key => /[^[\s\+]/.test(key))
    .flatMap(getSymbolForKey)
}