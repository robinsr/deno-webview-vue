<script setup lang="ts">
import { ref } from 'vue';
import UIIcon from './UIIcon.vue';
import { nanoid } from '@/utils/nanoid.ts';

export type Provide<T> = T | (() => T);

export type MenuItem = {
  label: string;
  path: string;
  icon?: string;
  shortcut?: string[];
  togglable?: Provide<boolean>;
  toggled?: Provide<boolean>;
  disabled?: Provide<boolean>;
  onClick?: (e: PointerEvent) => void;
  items?: MenuItem[][];
}


const props = defineProps<{
  menuItems: MenuItem;
}>();

const emit = defineEmits<{
  (e: 'itemClicked'): void
}>();

const $menu: MenuItem = props.menuItems;
const $menuRef = ref<Element>(null);

const onMenuItemClick = (e: PointerEvent, menuItem: MenuItem) => {
  console.debug('UIMenu item click:', e, menuItem);
  if (menuItem.onClick) {
    menuItem.onClick.bind(menuItem)(e);
  }

  $menuRef.value?.close();
  emit('itemClicked');
}

const close = () => {
  $menuRef.value?.close();
}

</script>

<template>
  <x-menu ref="$menuRef">
    <template v-for="$items in $menu.items">
      <template v-for="($item, $i) in $items">
        <x-menuitem
            :id="nanoid(10)"
            @click.self.stop="e => onMenuItemClick(e, $item)"
            :value="$item.toggled"
            :togglable="$item.togglable"
            :toggled="$item.toggled">

          <template v-if="$item.icon">
            <UIIcon :icon="$item.icon"/>
          </template>

          <x-label>{{ $item.label }}</x-label>

          <template v-if="$item.shortcut">
            <x-shortcut :value="$item.shortcut"></x-shortcut>
          </template>

          <template v-if="$item.items">
            <UIMenu :menu-items="$item" @item-clicked="close" />
          </template>

        </x-menuitem>
        <hr v-if="$i === $items.length - 1"/>
      </template>
    </template>
  </x-menu>
</template>
