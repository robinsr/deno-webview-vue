<script setup lang="ts">
import { computed } from 'vue';
import { nanoid } from '@/utils/nanoid.ts';
import { useDataStore } from '@/store/data-store.ts';
import { useViewStore } from '@/store/view-store.ts';
import LeftDrawer from "./LeftDrawer.vue";
import UIMenu, { MenuItem } from './components/UIMenu.vue';

const dataStore = useDataStore();
const viewStore = useViewStore();

const $menuItems: MenuItem[] = [
  {
    label: 'File',
    path: '#/file',
    items: [
      [
        {
          label: 'New',
          shortcut: ['⌃N'],
          path: '#/file/new'
        },
        {
          label: 'Open',
          shortcut: ['⌘O'],
          path: '#/file/open',
          items: [ dataStore.appList.map(app => ({
            label: app.name,
            path: `#/file/open/app/${app.id}`,
            onClick(_e: PointerEvent) {
              dataStore.setSelectedApp(app.id);
          }
          }))]
        },
      ], [
        { label: 'Save', shortcut: ['⌅', 'S'], path: '#/file/save', icon: 'save' },
        { label: 'Save as...', shortcut: ['Alt','Shift','S'], path: '#/file/save-as' },
      ]
    ]
  }, {
    label: 'Edit',
    path: '#/edit',
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
    path: '#/view',
    items: [
      [
        {
          label: 'Show key inlays',
          path: '#/view/show-key-inlays',
          togglable: true,
          //toggled: computed(() => viewStore.kbMode === 'inlay'),
          toggled: viewStore.keyboard.settings.kbDisplay === 'inlay',
          onClick(_e: PointerEvent) {
            viewStore.setKeyboardMode();
          }
        },
        {
          label: 'Show keyboard sections',
          path: '#/view/show-key-sections',
          togglable: false,
          items: [ Object.values(viewStore.keyboard.spec.sections).map((s, i) => ({
            label: s.name,
            path: `#/view/show-key-inlays/${s.name}`,
            togglable: true,
            toggled: false,
            disabled: i === 0,
            onClick(_e: PointerEvent) {
              viewStore.toggleSection(s.name);
            }
          })) ]
        },
      ]
    ]
  },
];
</script>

<template>
  <x-menubar>
    <LeftDrawer>
      <!-- TODO: Add Slots Content  -->
    </LeftDrawer>
    <template v-for="($menu, $mi) in $menuItems" :key="nanoid">
      <x-menuitem :id="nanoid(10)">
        <x-label :key="$menu.path" :data-menu-id="$menu.id">
          {{ $menu.label }}
        </x-label>
        <UIMenu :menu-items="$menu" />
      </x-menuitem>
    </template>
  </x-menubar>
</template>
