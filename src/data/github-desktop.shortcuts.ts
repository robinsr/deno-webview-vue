import { ShortcutGroup } from '../shortcuts/ShortcutApp.ts';

const GithubDesktop: ShortcutGroup = {
  name: "GitHub Desktop",
  groupings: [
    {
      name: "default",
      items: [
        { label: "Settings…", keys: "⌘ ," },
        { label: "Hide GitHub Desktop", keys: "⌘ H" },
        { label: "Hide Others", keys: "⌥ ⌘ H" },
        { label: "Quit GitHub Desktop", keys: "⌘ Q" },
        { label: "Quit and Keep Windows", keys: "⌥ ⌘ Q" }
      ]
    },
    {
      name: "File",
      items: [
        { label: "New Repository…", keys: "⌘ N" },
        { label: "Add Local Repository…", keys: "⌘ O" },
        { label: "Clone Repository…", keys: "⇧ ⌘ O" }
      ]
    },
    {
      name: "Edit",
      items: [
        { label: "Undo", keys: "⌘ Z" },
        { label: "Redo", keys: "⇧ ⌘ Z" },
        { label: "Cut", keys: "⌘ X" },
        { label: "Copy", keys: "⌘ C" },
        { label: "Paste", keys: "⌘ V" },
        { label: "Select All", keys: "⌘ A" },
        { label: "Find", keys: "⌘ F" },
        { label: "Emoji &; Symbols", keys: "fn E" }
      ]
    },
    {
      name: "View",
      items: [
        { label: "Show Changes", keys: "⌘ 1" },
        { label: "Show History", keys: "⌘ 2" },
        { label: "Show Repository List", keys: "⌘ T" },
        { label: "Show Branches List", keys: "⌘ B" },
        { label: "Go to Summary", keys: "⌘ G" },
        { label: "Toggle Full Screen", keys: "fn F " },
        { label: "Reset Zoom", keys: "⌘ 0" },
        { label: "Zoom In", keys: "⌘ =" },
        { label: "Zoom Out", keys: "⌘ -" },
        { label: "Reload", keys: "⌥ ⌘ R" },
        { label: "Toggle Developer Tools", keys: "⌥ ⌘ I" }
      ]
    },
    {
      name: "Repository",
      items: [
        { label: "Push", keys: "⌘ P" },
        { label: "Pull", keys: "⇧ ⌘ P" },
        { label: "Fetch", keys: "⇧ ⌘ T" },
        { label: "Remove…", keys: "⌘ ⌫" },
        { label: "Open in Terminal", keys: "⌃ `" },
        { label: "Show in Finder", keys: "⇧ ⌘ F" },
        { label: "Open in Sublime Text", keys: "⇧ ⌘ A" }
      ]
    },
    {
      name: "Branch",
      items: [
        { label: "New Branch…", keys: "⇧ ⌘ N" },
        { label: "Discard All Changes…", keys: "⇧ ⌘ ⌫" },
        { label: "Stash All Changes", keys: "⇧ ⌘ S" },
        { label: "Compare to Branch", keys: "⇧ ⌘ B" },
        { label: "Merge into Current Branch…", keys: "⇧ ⌘ M" },
        {
          label: "Squash and Merge into Current Branch…",
          keys: "⇧ ⌘ H"
        },
        { label: "Rebase Current Branch…", keys: "⇧ ⌘ E" }
      ]
    },
    {
      name: "Window",
      items: [
        { label: "Minimize", keys: "⌘ M" },
        { label: "Minimize All", keys: "⌥ ⌘ M" },
        { label: "Close Window", keys: "⌘ W" },
        { label: "Close All", keys: "⌥ ⌘ W" }
      ]
    },
    {
      name: "Screenshots",
      items: [
        { label: "Take Screenshot", keys: "⇧ ⌘ 5" },
        { label: "Save Screenshot", keys: "⇧ ⌘ 3" },
        { label: "Copy Screenshot", keys: "⌃ ⇧ ⌘ 3" },
        { label: "Save Screenshot (Selection)", keys: "⇧ ⌘ 4" },
        { label: "Copy Screenshot (Selection)", keys: "⌃ ⇧ ⌘ 4" }
      ]
    }
  ]
}

export default GithubDesktop;