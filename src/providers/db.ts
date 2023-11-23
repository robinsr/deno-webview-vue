

export interface DBHotKey {
  id?: number;
  label: string;
  shortcut: string;
}

export interface DBApp {
  id?: number;
  name: string;
}

export class HotKeysDB  {
  apps!: [];
  hotkeys!: []

  constructor() {

  }
}

export const db = new HotKeysDB();
