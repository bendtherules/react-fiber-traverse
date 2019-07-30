import * as React from "react";

import { FiberNodeForComponentClass } from "../src/mocked-types";

// Import stuff from src
import { findNodeByComponent } from "../src";
import { mountAndGetRootNode } from "./utils/mount-in-enzyme";
import getWrappedComponent from "./utils/getWrappedComponent";

// Import test helpers and sample components
import CDepth1 from "./sample-components/depth-1-simple";
import FnDepth1 from "./sample-components/depth-1-fn-simple";

describe("findNodeByComponent", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("basic", () => {
    it("should work for top-level class", () => {
      const WrappedC = getWrappedComponent(CDepth1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const found = findNodeByComponent(rootNode, CDepth1);

      expect(found).not.toBeFalsy();
      expect((found as FiberNodeForComponentClass).stateNode).toBeInstanceOf(
        CDepth1
      );
    });

    it("should work for 2nd-level class", () => {
      class C1 extends React.Component {
        render() {
          return <C2 />;
        }
      }
      class C2 extends React.Component {
        render() {
          return <div>C2 here</div>;
        }
      }
      const WrappedC = getWrappedComponent(C1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const found = findNodeByComponent(rootNode, C2);

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

    it("should work for top-level function", () => {
      const WrappedC = getWrappedComponent(FnDepth1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const found = findNodeByComponent(rootNode, FnDepth1);

      expect(found).not.toBeFalsy();
      expect((found as FiberNodeForComponentClass).type).toBe(FnDepth1);
      expect((found as FiberNodeForComponentClass).stateNode).toBe(null);
    });

    it("should work for 2nd-level function", () => {
      function Fn1() {
        return <Fn2 />;
      }
      function Fn2() {
        return <div>Fn2 here</div>;
      }

      const WrappedC = getWrappedComponent(Fn1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const found = findNodeByComponent(rootNode, Fn2);

      // Shouldn't be null, or other falsy value
      expect(found).not.toBeFalsy();
      expect((found as FiberNodeForComponentClass).stateNode).toBe(null);
      expect((found as FiberNodeForComponentClass).type.name).toBe(Fn2.name);
    });

    it("should work for 5th-level function", () => {
      function Fn1() {
        return (
          <div>
            <div>
              <span></span>
              <Fn2></Fn2>
            </div>
          </div>
        );
      }

      function Fn2() {
        return <a href="google.com">Fn2 here</a>;
      }

      const WrappedC = getWrappedComponent(Fn1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const found = findNodeByComponent(rootNode, Fn2);

      // Shouldn't be null, or other falsy value
      expect(found).not.toBeFalsy();
      expect((found as FiberNodeForComponentClass).stateNode).toBe(null);
      expect((found as FiberNodeForComponentClass).type.name).toBe(Fn2.name);
    });
  });
});
