import { ShortcutGroup } from '../ShortcutApp.ts';

const SublimeHotkeys: ShortcutGroup = {
  name: "Sublime Text",
  groupings: [
    {
      name: "default",
      items: [
        { keys: "⌘ X", label: "Cut line" },
        { keys: "⌘ ↩", label: "Insert line after" },
        { keys: "⌘ ⇧ ↩", label: "Insert line before" },
        { keys: "⌘ ⌃ ↑", label: "Move line/selection up" },
        { keys: "⌘ ⌃ ↓", label: "Move line/selection down" },
        { keys: "⌘ L", label: "Select line - Repeat to select next lines" },
        { keys: "⌘ D", label: "Select word - Repeat select others occurrences" },
        { keys: "⌃ M", label: "Jump to closing parentheses Repeat to jump to opening parentheses" },
        { keys: "⌃ ⇧ M", label: "Select all contents of the current parentheses" },
        { keys: "⌘ K, ⌘ K", label: "Delete from cursor to end of line" },
        { keys: "⌘ K ⌫", label: "Delete from cursor to start of line" },
        { keys: "⌘ ]", label: "Indent current line(s)" },
        { keys: "⌘ [", label: "Un-indent current line(s)" },
        { keys: "⌘ ⇧ D", label: "Duplicate line(s)" },
        { keys: "⌘ J", label: "Join line below to the end of the current line" },
        { keys: "⌘ /", label: "Comment/un-comment current line" },
        { keys: "⌘ ⌥ /", label: "Block comment current selection" },
        { keys: "⌘ Y", label: "Redo, or repeat last keyboard shortcut command" },
        { keys: "⌘ ⇧ V", label: "Paste and indent correctly" },
        { keys: "⌃ Space", label: "Select next auto-complete suggestion" },
        { keys: "⌃ U", label: "Soft undo; jumps to your last change before undoing change when repeated" },
        { keys: "⌃ ⇧ Up", label: "Column selection up" },
        { keys: "⌃ ⇧ Down", label: "Column selection down" }
      ]
    }
  ]
}

export default SublimeHotkeys;
