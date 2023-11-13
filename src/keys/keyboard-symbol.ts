
export type SymbolOpts = {
  hasLR: boolean;
  code: string;
}
export type KeyType = 'alpha' | 'mod' | 'arrow' | 'fn' | 'numpad';

export type KeyDisplay = {
  cap: string;
  kbd: string;
}

export type KeySym = {
  name: string;
  display: KeyDisplay;
  id: string;
  idVariants: string[];
  forms: string[];
  code?: string;
  hasLR: boolean;
}

const stringFmt = (tmpl: string, params: Record<string, string>): string => {
  return Object.entries(params).reduce((result, [ key, val ]) => {
    return result.replace(`{${key}}`, val);
  }, tmpl);
}

const SymbolDefaults: SymbolOpts = {
  hasLR: false,
  code: '',
};


export default class KeyboardSymbol {
  name: string;
  display: KeyDisplay;
  id: string;
  forms: string[];
  code = '';
  hasLR = false;

  constructor(name: string, capDisplay: string, alts: string, _opts: Partial<SymbolOpts> = {}) {
    const opts: SymbolOpts = { ...SymbolDefaults, ..._opts };

    this.name = name;
    this.id = name.length === 1 ? name : `{${name}}`;

    this.display = {
      cap: stringFmt(capDisplay, { name, code: opts.code }),
      kbd: stringFmt(capDisplay, { name, code: opts.code }),
    };

    this.forms = [ this.name, this.id, ...alts.split(' ') ];

    if (opts.code) {
      this.code = opts.code;
      this.display.kbd = opts.code;
      this.forms = [ ...this.forms, opts.code ];
    }

    if (opts.hasLR) {
      this.hasLR = true;
      this.forms = [ ...this.forms, this.leftId, this.rightId ];
    }
  }

  get idVariants(): string[] {
    return this.hasLR ? [ this.id, this.leftId, this.rightId ] : [ this.id ];
  }

  get leftId(): string {
    return this.hasLR ? `{${this.name}left}` : this.id;
  }

  get rightId(): string {
    return this.hasLR ? `{${this.name}right}` : this.id;
  }

  matches(symbol: string): boolean {
    return this.forms.includes(symbol);
  }

  toJS(): KeySym {
    return this;
  }

  toString() {
    return this.id;
  }
}
