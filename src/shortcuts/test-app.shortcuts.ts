const TestApp = {
  name: 'Default App',
  groups: {
    Basic: [
      { label: 'Cmd J', keys: '⌘ j' },
      { label: 'Cmd Capital-J', keys: '⌘ J' },
      { label: 'Cmd Shift K', keys: '⌘ ⇧ k' },
      { label: 'Cmd Alt L', keys: '⌘ ⌥ L' },
      { label: 'Cmd Ctrl M', keys: '⌘ ⌃ M' },
      { label: 'Cmd Ctrl Alt N', keys: '⌘ ⌃ ⌥ N' },
      { label: 'Cmd Ctrl Alt Shift O', keys: '⌘ ⌃ ⌥ ⇧ o' }
    ],
    Functions: [
      { label: 'Func k', keys: 'fn k' },
      { label: 'F1-key', keys: 'f1' },
      { label: 'F2-key - cap', keys: 'F2' },
      { label: 'Shift f4', keys: '⇧ f4' },
      { label: 'Shift f5 - alt', keys: 'shift+f5'},
    ],
    Controls: [
      { label: 'Shift delete', keys: '⇧ ⌫' },
      { label: 'f13', keys: 'f13' },
      { label: 'f14', keys: 'f14' },
      { label: 'Shift page-up', keys: '⇧ {pageup}' },
      { label: 'Shift page-down', keys: '⇧ pagedown' },
      { label: 'Forward Delete', keys: '⌘ ⇧ ⌦' },
      { label: 'Home', keys: '⌘ {home}' },
      { label: 'Forward Delete', keys: '⌘ ⇧ ⌦' },
    ],
    Arrows: [
      { label: 'Cmd Ctrl Up-Literal', keys: '⌘ ⌃ ↑' },
      { label: 'Cmd Ctrl Up-Expression', keys: '⌘ ⌃ {arrowup}' },
      { label: 'Cmd Ctrl Up-Literal', keys: '⌘ ⌃ {arrowleft}' },
      { label: 'Cmd Ctrl Up-Literal', keys: '⇧ ⌃ {arrowright}' },
      { label: 'Cmd Ctrl Up-Literal', keys: '⌘ ⌃ {arrowdown}' },
      { label: 'Cmd Ctrl Up-Literal', keys: '⇧ ⌃ {arrowleft} {arrowright}' },
    ],
    NumPad: [

    ],
    Macros: [
      { label: 'Cmd K L', keys: '⌘ K L' },
      { label: 'Cmd K plus L', keys: '⌘ K + L' },
      { label: 'Cmd K plus Cmd L', keys: '⌘ K + ⌘ L' },
      { label: 'Super K L', keys: 'super K L' },
      { label: 'Super plus K plus L', keys: 'super+K+L' },
    ]
  }
}

export default TestApp;
