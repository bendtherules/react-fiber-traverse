import * as React from "react";

import { FiberNodeForComponentClass } from "../src/mocked-types";

// Import stuff from src
import { findNodeByComponentRef } from "../src";
import { mountAndGetRootNode } from "./utils/mount-in-enzyme";
import getWrappedComponent from "./utils/getWrappedComponent";

// Import test helpers and sample components

describe("findNodeByComponentRef", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("basic", () => {
    it("should work for 2nd-level class", () => {
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

      const found = findNodeByComponentRef(rootNode, C2Ref.current);

      // Shouldn't be null, or other falsy value
      expect(found).not.toBeFalsy();
      expect((found as FiberNodeForComponentClass).stateNode).toBeInstanceOf(
        C2
      );
      expect((found as FiberNodeForComponentClass).type.name).toBe(C2.name);
      expect(
        (found as FiberNodeForComponentClass).stateNode
      ).not.toBeInstanceOf(C1);
      expect(
        (found as FiberNodeForComponentClass).stateNode
      ).not.toBeInstanceOf(WrappedC);
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

      const found = findNodeByComponentRef(rootNode, C2Ref.current);

      // Shouldn't be null, or other falsy value
      expect(found).not.toBeFalsy();
      expect((found as FiberNodeForComponentClass).stateNode).toBeInstanceOf(
        C2
      );
      expect((found as FiberNodeForComponentClass).type.name).toBe(C2.name);
      expect(
        (found as FiberNodeForComponentClass).stateNode
      ).not.toBeInstanceOf(C1);
      expect(
        (found as FiberNodeForComponentClass).stateNode
      ).not.toBeInstanceOf(WrappedC);
    });
  });
});
