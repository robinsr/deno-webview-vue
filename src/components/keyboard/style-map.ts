type StyleProps = {
  [propName: string]: string | number;
}

interface StyleMap {
  var(varName: string, value: string | number): StyleMap;
  add(propName: string, value: string | number): StyleMap;
  all(props: StyleProps): StyleMap;
  get(): { [prop: string]: string | number }
}

export const styleMap = (name?: string): StyleMap => {
  let styles = {};

  if (name) {
    name = name[0].toUpperCase() + name.substring(1);
    styles = { [`--is${name}`]: 1 };
  }

  return {
    add(propName: string, value: string | number): StyleMap {
      styles = { ...styles, [propName]: value };
      return this;
    },
    var(varName: string, value: string | number): StyleMap {
      styles = { ...styles, [`--${varName}`]: value };
      return this;
    },
    all(props: StyleProps): StyleMap {
      styles = { ...styles, ...props };
      return this;
    },
    get() {
      return styles;
    }
  }
}
