import { onMounted, onUnmounted } from 'vue';

type MediaQueryListener = (e: MediaQueryListEvent) => void;

export const useMediaQuery = (mediaQuery: string, mqlListener: MediaQueryListener) => {
  const mql = window.matchMedia(mediaQuery);

  onMounted(() => {
    mql.addEventListener("change", mqlListener);
  });

  onUnmounted(() => {
    mql.removeEventListener("change", mqlListener);
  });
}
