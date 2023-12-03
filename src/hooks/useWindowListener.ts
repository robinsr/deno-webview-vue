import { onMounted, onUnmounted } from 'vue';
import hotkeys from 'hotkeys-js';

type KBEventHandler = (e: KeyboardEvent) => void;
type HandlerFn = (e: object) => void;


export const logKey = (handler: string, e: KeyboardEvent) => {
  const { type, key, code } = e;
  console.debug(handler, { type, key, code }, e);
}


export const isKbEvent = (e: object): e is KeyboardEvent => {
  return e instanceof KeyboardEvent;
}


const hotKeyConfig = { keyup: true, keydown: true }

export const useHotKey = (
  shortcut: string, handlerFn: KBEventHandler, config = hotKeyConfig) => {
  onMounted(() => {
    hotkeys(shortcut, config, handlerFn);
  });

  onUnmounted(() => {
    hotkeys.unbind(shortcut);
  });
}


export const useWindowListener = (eventType: string, handlerFn: HandlerFn) => {
  onMounted(() => {
    self.addEventListener(eventType, handlerFn);
  });

  onUnmounted(() => {
    self.removeEventListener(eventType, handlerFn);
  });
}
