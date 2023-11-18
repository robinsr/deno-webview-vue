<script setup lang="ts">
import { ref } from 'vue';
import LeftDrawer from "./LeftDrawer.vue";
import UIIcon from './layout/UIIcon.vue';

type MenuItem = {
  label: string;
  path: string;
  icon?: string;
  shortcut?: string[];
  togglable?: boolean;
  toggled?: boolean;
  disabled?: boolean;
}

type MenuItemGroup = {
  label: string;
  id: string;
  items: MenuItem[][];
}

const $menuItems = ref<MenuItemGroup[]>([
  {
    label: 'File',
    id: 'file',
    items: [
      [
        { label: 'New', shortcut: ['⌃N'], path: '#/file/new' },
        { label: 'Open', shortcut: ['⌘O'], path: '#/file/open' },
      ], [
        { label: 'Save', shortcut: ['⌅', 'S'], path: '#/file/save', icon: 'save' },
        { label: 'Save as...', shortcut: ['Alt','Shift','S'], path: '#/file/save-as' },
      ]
    ]
  }, {
    label: 'Edit',
    id: 'edit',
    items: [
      [
        { label: 'Undo', shortcut: ['⌘Z'], path: '#/edit/undo' },
        { label: 'Redo', shortcut: ['⌘⇧Z'], path: '#/edit/redo' },
      ], [
        { label: 'Cut', shortcut: ['⌅S'], path: '#/edit/cut', icon: 'cut' },
        { label: 'Copy', shortcut: ['⌘C'], path: '#/edit/copy' },
        { label: 'Paste', shortcut: ['⌘V'], path: '#/edit/paste' },
      ]
    ]
  }, {
    label: 'View',
    id: 'view',
    items: [
      [
        { label: 'Show ruler', path: '#/view/ruler', togglable: true, toggled: true },
        { label: 'Show spelling suggestions', path: '#/view/redo', togglable: true, toggled: false },
      ]
    ]
  },
]);


</script>

<template>
  <x-menubar>
    <LeftDrawer>
      <!-- TODO: Add Slots Content  -->
    </LeftDrawer>

    <x-menuitem v-for="($menu, $mi) in $menuItems">
      <x-label :id="'menuitem-' + $mi" :data-menu-id="$menu.id">{{ $menu.label }}</x-label>

      <x-menu>
        <template v-for="$items in $menu.items">
          <template v-for="($item, $i) in $items" >
            <x-menuitem
                @click.stop.prevent
                :data-menu-path="$item.path"
                :togglable="$item.togglable"
                :toggled="$item.toggled">

              <template v-if="$item.icon">
                <UIIcon :icon="$item.icon"/>
              </template>

              <x-label>{{ $item.label }}</x-label>

              <template v-if="$item.shortcut">
                <x-shortcut :value="$item.shortcut"></x-shortcut>
              </template>

            </x-menuitem>

            <hr v-if="$i === $items.length - 1"/>

          </template>
        </template>
      </x-menu>
    </x-menuitem>
  </x-menubar>
</template>

<style scoped>

</style>