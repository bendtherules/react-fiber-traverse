import * as React from "react";

/**
 * Crate single function component with optional name
 * @param name Optional name
 */
function createFunctionComponent(name?: string): React.FunctionComponent {
  const UnnamedFunctionComponent: React.FunctionComponent = function(props) {
    if (props.children !== undefined) {
      return <React.Fragment>{props.children}</React.Fragment>;
    } else {
      return null
    }
  };

  if (name !== undefined) {
    Object.defineProperty(UnnamedFunctionComponent, "name", { value: name });
    UnnamedFunctionComponent.displayName = name;
  }

  return UnnamedFunctionComponent;
}

/**
 * Crate single class component with optional name
 * @param name Optional name
 */
function createClassComponent(name?: string): React.ComponentClass {
  const UnnamedClassComponent: React.ComponentClass = class extends React.Component {
    render() {
      if (this.props.children !== undefined) {
        return this.props.children;
      } else {
        return null
      }
    }
  };

  if (name !== undefined) {
    Object.defineProperty(UnnamedClassComponent, "name", { value: name });
    UnnamedClassComponent.displayName = name;
  }

  return UnnamedClassComponent;
}

/**
 * Create n number of functionalComponents
 * given either count or array of names
 */
function createFunctionComponents(
  count: number
): Array<React.FunctionComponent>;
function createFunctionComponents(
  names: Array<string>
): Array<React.FunctionComponent>;
function createFunctionComponents(
  countOrNames: number | Array<string> = 1
): Array<React.FunctionComponent> {
  if (typeof countOrNames === "number") {
    const returnArr: Array<React.FunctionComponent> = [];
    for (let index = 0; index < countOrNames; index++) {
      const newComp = createFunctionComponent();
      returnArr.push(newComp);
    }

    return returnArr;
  } else if (Array.isArray(countOrNames)) {
    const returnArr: Array<React.FunctionComponent> = [];
    for (let index = 0; index < countOrNames.length; index++) {
      const compName = countOrNames[index];

      const newComp = createFunctionComponent(compName);

      returnArr.push(newComp);
    }

    // Handle other invalid inputs
    return returnArr;
  }

  throw new TypeError("Input is not valid");
}

/**
 * Create n number of classComponents
 * given either count or array of names
 */
function createClassComponents(count: number): Array<React.ComponentClass>;
function createClassComponents(
  names: Array<string>
): Array<React.ComponentClass>;
function createClassComponents(
  countOrNames: number | Array<string> = 1
): Array<React.ComponentClass> {
  if (typeof countOrNames === "number") {
    const returnArr: Array<React.ComponentClass> = [];
    for (let index = 0; index < countOrNames; index++) {
      const newComp = createClassComponent();
      returnArr.push(newComp);
    }

    return returnArr;
  } else if (Array.isArray(countOrNames)) {
    const returnArr: Array<React.ComponentClass> = [];
    for (let index = 0; index < countOrNames.length; index++) {
      const compName = countOrNames[index];

      const newComp = createClassComponent(compName);

      returnArr.push(newComp);
    }

    return returnArr;
  }
  
  // Handle other invalid inputs
  throw new TypeError("Input is not valid");
}

export {
  createFunctionComponent,
  createFunctionComponents,
  createClassComponent,
  createClassComponents
};
