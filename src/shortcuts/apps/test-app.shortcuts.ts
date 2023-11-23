import { ShortcutGroup } from '../ShortcutApp.ts';

const TestApp: ShortcutGroup = {
  name: 'Default App',
  groupings: [{
    name: 'Basic',
    items: [
      { label: 'Single K', keys: 'k' },
      { label: 'Single J', keys: 'j' },
      { label: 'Just Kidding', keys: 'j k' },
      { label: 'Cmd J', keys: '⌘ j' },
      { label: 'Cmd Capital-J', keys: '⌘ J' },
      { label: 'Cmd Shift K', keys: '⌘ ⇧ k' },
      { label: 'Cmd Alt L', keys: '⌘ ⌥ L' },
      { label: 'Cmd Ctrl M', keys: '⌘ ⌃ M' },
      { label: 'Cmd Ctrl Alt N', keys: '⌘ ⌃ ⌥ N' },
      { label: 'Cmd Ctrl Alt Shift O', keys: '⌘ ⌃ ⌥ ⇧ o' }
    ]
  }, {
    name: 'Function',
    items: [
      { label: 'Func k', keys: 'fn k' },
      { label: 'F1-key', keys: 'f1' },
      { label: 'Shift the F1-key', keys: '⇧ f1' },
      { label: 'F2-key - cap', keys: 'F2' },
      { label: 'Shift f4', keys: '⇧ f4' },
      { label: 'Shift f5 - alt', keys: 'shift+f5'},
    ],
  }, {
    name: 'Controls',
    items: [
      { label: 'Shift delete', keys: '⇧ ⌫' },
      { label: 'f13', keys: 'f13' },
      { label: 'f14', keys: 'f14' },
      { label: 'Shift page-up', keys: '⇧ {pageup}' },
      { label: 'Shift page-down', keys: '⇧ pagedown' },
      { label: 'Forward Delete', keys: '⌘ ⇧ ⌦' },
      { label: 'Home', keys: '⌘ {home}' },
      { label: 'Forward Delete', keys: '⌘ ⇧ ⌦' },
    ],
  }, {
    name: 'Arrows',
    items: [
      { label: 'Cmd Ctrl Up-Literal', keys: '⌘ ⌃ ↑' },
      { label: 'Cmd Ctrl Up-Expression', keys: '⌘ ⌃ {arrowup}' },
      { label: 'Cmd Ctrl Up-Literal', keys: '⌘ ⌃ {arrowleft}' },
      { label: 'Cmd Ctrl Up-Literal', keys: '⇧ ⌃ {arrowright}' },
      { label: 'Cmd Ctrl Up-Literal', keys: '⌘ ⌃ {arrowdown}' },
      { label: 'Cmd Ctrl Up-Literal', keys: '⇧ ⌃ {arrowleft} {arrowright}' },
    ],
  }, {
    name: 'NumPad',
    items: [
      { label: 'Shift Num Five', keys: '⇧ {numpad5}' }
    ]
  }, {
    name: 'Macros',
    items: [
      { label: 'Cmd K L', keys: '⌘ K L' },
      { label: 'Cmd K plus L', keys: '⌘ K + L' },
      { label: 'Cmd K plus Cmd L', keys: '⌘ K + ⌘ L' },
      { label: 'Super K L', keys: 'super K L' },
      { label: 'Super plus K plus L', keys: 'super+K+L' },
    ]
  }]
}

export default TestApp;
