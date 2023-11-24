<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '@/store/data-store.ts';
import { useViewStore } from '@/store/view-store.ts';

import LeftDrawer from "./LeftDrawer.vue";
import UIIcon from './components/UIIcon.vue';

const dataStore = useDataStore();
const viewStore = useViewStore();


type Provide<T> = T | (() => T);

type MenuItem = {
  label: string;
  path: string;
  icon?: string;
  shortcut?: string[];
  togglable?: Provide<boolean>;
  toggled?: Provide<boolean>;
  disabled?: Provide<boolean>;
  onClick?: (e: PointerEvent) => void;
  submenu?: MenuItem[];
}

type MenuItemGroup = {
  label: string;
  id: string;
  items: MenuItem[][];
}

const $menuItems: MenuItemGroup[] = [
  {
    label: 'File',
    id: 'file',
    items: [
      [
        { label: 'New', shortcut: ['⌃N'], path: '#/file/new' },
        {
          label: 'Open',
          shortcut: ['⌘O'],
          path: '#/file/open',
          submenu: dataStore.appList.map(app => ({
            label: app.name,
            path: `#/file/open/app/${app.id}`,
            onClick(e) {
              dataStore.setSelectedApp(app.id);
            }
          }))
        },
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
        {
          label: 'Show key inlays',
          path: '#/view/show-key-inlays',
          togglable: true,
          //toggled: computed(() => viewStore.kbMode === 'inlay'),
          toggled: viewStore.kbMode === 'inlay',
          onClick(e) {
            const value = (e.target as HTMLButtonElement).value;
            console.log(this, value);

            viewStore.$patch({
              kbMode: viewStore.kbMode !== 'inlay' ? 'inlay' : 'regular'
            });
          }
        },
      ]
    ]
  },
];

const onMenuItemClick = (e: PointerEvent, menuItem: MenuItem) => {
  console.log(e, menuItem);
  if (menuItem.onClick) {
    menuItem.onClick.bind(menuItem)(e);
  }
}


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
          <template v-for="($item, $i) in $items">
            <x-menuitem
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

              <x-menu v-if="$item.submenu">
                <template v-for="$subitem in $item.submenu">
                  <x-menuitem
                    @click.stop="e => onMenuItemClick(e, $subitem)">
                    <x-label>{{ $subitem.label }}</x-label>
                  </x-menuitem>
                </template>
              </x-menu>

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