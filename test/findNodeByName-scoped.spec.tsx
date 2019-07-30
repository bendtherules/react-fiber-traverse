import * as React from "react";

import { FiberNodeForComponentClass } from "../src/mocked-types";

// Import stuff from src
import { findNodeByComponentName } from "../src";
import { mountAndGetRootNode } from "./utils/mount-in-enzyme";
import getWrappedComponent from "./utils/getWrappedComponent";

// Import test helpers and sample components
import CDepth1 from "./sample-components/depth-1-simple";
import FnDepth1 from "./sample-components/depth-1-fn-simple";

describe("findNodeByComponentName", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("scoped", () => {
    it("should work for top-level class name with no child", () => {
      const WrappedC = getWrappedComponent(CDepth1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const foundOuterNode = findNodeByComponentName(rootNode, CDepth1.name);
      const foundInnerNode = findNodeByComponentName(
        foundOuterNode,
        "somename"
      ); // This will not be present

      expect(foundOuterNode).not.toBeFalsy();
      expect(foundInnerNode).toBeFalsy();
      expect(foundInnerNode).toBe(null);
    });

    it("should work for 2nd-level class with 3rd-level scoped class name", () => {
      class C1 extends React.Component {
        render() {
          return <C2 />;
        }
      }
      class C2 extends React.Component {
        render() {
          return (
            <div>
              C2 here
              <C3 />
            </div>
          );
        }
      }
      class C3 extends React.Component {
        render() {
          return <div>C3 here</div>;
        }
      }

      const WrappedC = getWrappedComponent(C1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const foundC2 = findNodeByComponentName(rootNode, C2.name);
      const foundC3 = findNodeByComponentName(foundC2, C3.name);

      // Shouldn't be null, or other falsy value
      expect(foundC3).not.toBeFalsy();
      expect((foundC3 as FiberNodeForComponentClass).stateNode).toBeInstanceOf(
        C3
      );
      expect((foundC3 as FiberNodeForComponentClass).type.name).toBe(C3.name);
      expect(
        (foundC3 as FiberNodeForComponentClass).stateNode
      ).not.toBeInstanceOf(C2);
      expect(
        (foundC3 as FiberNodeForComponentClass).stateNode
      ).not.toBeInstanceOf(WrappedC);
    });

    it("should work for top-level function name with no child", () => {
      const WrappedC = getWrappedComponent(FnDepth1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const foundFnDepth1 = findNodeByComponentName(rootNode, FnDepth1.name);
      const foundInner = findNodeByComponentName(foundFnDepth1, 'someName');

      expect(foundInner).toBeFalsy();
      expect(foundInner).toBe(null);
    });

    it("should work for 2nd-level function with 3rd-level scoped function name", () => {
      function Fn1() {
        return <Fn2 />;
      }
      function Fn2() {
        return <div>Fn2 here<Fn3/></div>;
      }
      function Fn3() {
        return <div>Fn3 here</div>;
      }

      const WrappedC = getWrappedComponent(Fn1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const foundFn2 = findNodeByComponentName(rootNode, Fn2.name);
      const foundFn3 = findNodeByComponentName(foundFn2, Fn3.name);

      // Shouldn't be null, or other falsy value
      expect(foundFn3).not.toBeFalsy();
      expect((foundFn3 as FiberNodeForComponentClass).stateNode).toBe(null);
      expect((foundFn3 as FiberNodeForComponentClass).type.name).toBe(Fn3.name);
    });
  });
});
