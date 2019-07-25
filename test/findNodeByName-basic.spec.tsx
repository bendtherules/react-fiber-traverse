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

  describe("basic", () => {
    it("should work for top-level class name", () => {
      const WrappedC = getWrappedComponent(CDepth1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const found = findNodeByComponentName(rootNode, CDepth1.name);

      expect(found).not.toBeFalsy();
      expect((found as FiberNodeForComponentClass).stateNode).toBeInstanceOf(
        CDepth1
      );
    });

    it("should work for 2nd-level class name", () => {
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

      const found = findNodeByComponentName(rootNode, C2.name);

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

    it("should work for top-level function name", () => {
      const WrappedC = getWrappedComponent(FnDepth1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const found = findNodeByComponentName(rootNode, FnDepth1.name);

      expect(found).not.toBeFalsy();
      expect((found as FiberNodeForComponentClass).type).toBe(FnDepth1);
      expect((found as FiberNodeForComponentClass).stateNode).toBe(null);
    });

    it("should work for 2nd-level function name", () => {
      function Fn1() {
        return <Fn2 />;
      }
      function Fn2() {
        return <div>Fn2 here</div>;
      }

      const WrappedC = getWrappedComponent(Fn1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const found = findNodeByComponentName(rootNode, Fn2.name);

      // Shouldn't be null, or other falsy value
      expect(found).not.toBeFalsy();
      expect((found as FiberNodeForComponentClass).stateNode).toBe(null);
      expect((found as FiberNodeForComponentClass).type.name).toBe(Fn2.name);
    });
  });
});
