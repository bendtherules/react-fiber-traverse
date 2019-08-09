import * as React from "react";

// Import stuff from src
import { findNodeByComponentRef } from "../src";
import { mountAndGetRootNode } from "./utils/mountInEnzyme";
import getWrappedComponent from "./utils/getWrappedComponent";

class RandomClass extends React.Component {
  render() {
    return <div></div>;
  }
}

// Import test helpers and sample components

describe("findNodeByComponentRef", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("negative", () => {
    it("should not work for 2nd-level class", () => {
      const C2Ref = React.createRef<C2>();

      class C1 extends React.Component {
        render() {
          return <C2 ref={C2Ref} />;
        }
      }
      class C2 extends React.Component {
        render() {
          return <div>C2 here</div>;
        }
      }
      const WrappedC = getWrappedComponent(C1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      if (C2Ref.current === null) {
        throw new Error("Ref is not yet set");
      }

      const foundSame = findNodeByComponentRef(rootNode, new C2({}));
      const foundDiff = findNodeByComponentRef(rootNode, new RandomClass({}));

      expect(foundSame).toBeFalsy();
      expect(foundSame).toBe(null);
      expect(foundDiff).toBeFalsy();
      expect(foundDiff).toBe(null);
    });

    it("should work for 5th-level class", () => {
      const C2Ref = React.createRef<C2>();

      class C1 extends React.Component {
        render() {
          return (
            <div>
              <div>
                <span></span>
                <C2 ref={C2Ref}></C2>
              </div>
            </div>
          );
        }
      }

      class C2 extends React.Component {
        render() {
          return <a href="google.com">Fn2 here</a>;
        }
      }

      const WrappedC = getWrappedComponent(C1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      if (C2Ref.current === null) {
        throw new Error("Ref is not yet set");
      }

      const foundSame = findNodeByComponentRef(rootNode, new C2({}));
      const foundDiff = findNodeByComponentRef(rootNode, new RandomClass({}));

      expect(foundSame).toBeFalsy();
      expect(foundSame).toBe(null);
      expect(foundDiff).toBeFalsy();
      expect(foundDiff).toBe(null);
    });
  });
});
