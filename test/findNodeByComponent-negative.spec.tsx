import * as React from "react";

// Import stuff from src
import { findNodeByComponent } from "../src";
import { mountAndGetRootNode } from "./utils/mountInEnzyme";
import getWrappedComponent from "./utils/getWrappedComponent";

// Import test helpers and sample components
import CDepth1 from "./sample-components/depth-1-simple";
import FnDepth1 from "./sample-components/depth-1-fn-simple";
import { createClassComponent } from "./utils/createComponent";

describe("findNodeByComponent", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("missing", () => {
    it("should not work for top-level class with same component name", () => {
      const WrappedC = getWrappedComponent(CDepth1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const FakeCDepth1 = createClassComponent(CDepth1.name);
      const found = findNodeByComponent(rootNode, FakeCDepth1);

      expect(found).toBeFalsy();
      expect(found).toBe(null);
    });

    it("should not work for top-level class with different component name", () => {
      const WrappedC = getWrappedComponent(CDepth1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const FakeCDepth1 = createClassComponent("randomname");
      const found = findNodeByComponent(rootNode, FakeCDepth1);

      expect(found).toBeFalsy();
      expect(found).toBe(null);
    });

    it("should not work for 2nd-level class with same component name", () => {
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

      const FakeC2 = createClassComponent(C2.name);
      const found = findNodeByComponent(rootNode, FakeC2);

      expect(found).toBeFalsy();
      expect(found).toBe(null);
    });

    it("should not work for 2nd-level class with different component name", () => {
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

      const FakeC2 = createClassComponent("randomName");
      const found = findNodeByComponent(rootNode, FakeC2);

      expect(found).toBeFalsy();
      expect(found).toBe(null);
    });

    it("should not work for top-level function with same function name", () => {
      const WrappedC = getWrappedComponent(FnDepth1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const FakeFnDepth1 = createClassComponent(FnDepth1.name);
      const found = findNodeByComponent(rootNode, FakeFnDepth1);

      expect(found).toBeFalsy();
      expect(found).toBe(null);
    });

    it("should not work for top-level function with different function name", () => {
      const WrappedC = getWrappedComponent(FnDepth1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const FakeFnDepth1 = createClassComponent("randomName");
      const found = findNodeByComponent(rootNode, FakeFnDepth1);

      expect(found).toBeFalsy();
      expect(found).toBe(null);
    });

    it("should not work for 2nd-level function with same function name", () => {
      function Fn1() {
        return <Fn2 />;
      }
      function Fn2() {
        return <div>Fn2 here</div>;
      }

      const WrappedC = getWrappedComponent(Fn1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const FakeFn2 = createClassComponent(Fn2.name);
      const found = findNodeByComponent(rootNode, FakeFn2);

      expect(found).toBeFalsy();
      expect(found).toBe(null);
    });

    it("should not work for 2nd-level function with different function name", () => {
      function Fn1() {
        return <Fn2 />;
      }
      function Fn2() {
        return <div>Fn2 here</div>;
      }

      const WrappedC = getWrappedComponent(Fn1);
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const FakeFn2 = createClassComponent("randomName");
      const found = findNodeByComponent(rootNode, FakeFn2);

      expect(found).toBeFalsy();
      expect(found).toBe(null);
    });

    it("should not work for 5th-level function with same or diff fn name", () => {
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

      const FakeFn2Same = createClassComponent(Fn2.name);
      const FakeFn2Diff = createClassComponent("randomname");
      const foundSame = findNodeByComponent(rootNode, FakeFn2Same);
      const foundDiff = findNodeByComponent(rootNode, FakeFn2Diff);

      expect(foundSame).toBeFalsy();
      expect(foundSame).toBe(null);
      expect(foundDiff).toBeFalsy();
      expect(foundDiff).toBe(null);
    });
  });
});
