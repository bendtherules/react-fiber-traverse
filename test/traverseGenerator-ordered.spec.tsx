import * as React from "react";

// Import stuff from src
import {
  FiberNodeForFunctionComponent,
  FiberNodeForComponentClass
} from "../src/mocked-types";
import { traverseGenerator } from "../src";

// Import test helpers and sample components
import { mountAndGetRootNode } from "./utils/mountInEnzyme";
import {
  createClassComponents,
  createFunctionComponents
} from "./utils/createComponent";
import CDepth1 from "./sample-components/depth-1-simple";

describe("traverseGenerator", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("basic", () => {
    it("order doesn't matter for 1 node if self is present - case 1", () => {
      const rootNode = mountAndGetRootNode(CDepth1, container);

      const nodeIterator = traverseGenerator(rootNode, {
        order: ["child", "sibling", "self"]
      });
      const nodes = [...nodeIterator];

      // Can't be zero, in any case
      expect(nodes.length).not.toBe(0);
      // Check that only one node is yielded
      expect(nodes.length).toBe(1);
    });

    it("order doesn't matter for 1 node if self is present - case 2", () => {
      const rootNode = mountAndGetRootNode(CDepth1, container);

      const nodeIterator = traverseGenerator(rootNode, {
        order: ["child", "self", "sibling"]
      });
      const nodes = [...nodeIterator];

      // Can't be zero, in any case
      expect(nodes.length).not.toBe(0);
      // Check that only one node is yielded
      expect(nodes.length).toBe(1);
    });

    it("order doesn't matter for 1 node if self is present - case 3", () => {
      const rootNode = mountAndGetRootNode(CDepth1, container);

      const nodeIterator = traverseGenerator(rootNode, {
        order: ["child", "self"]
      });
      const nodes = [...nodeIterator];

      // Can't be zero, in any case
      expect(nodes.length).not.toBe(0);
      // Check that only one node is yielded
      expect(nodes.length).toBe(1);
    });

    it("order doesn't matter for 1 node if self is present - case 4", () => {
      const rootNode = mountAndGetRootNode(CDepth1, container);

      const nodeIterator = traverseGenerator(rootNode, {
        order: ["self"]
      });
      const nodes = [...nodeIterator];

      // Can't be zero, in any case
      expect(nodes.length).not.toBe(0);
      // Check that only one node is yielded
      expect(nodes.length).toBe(1);
    });

    it("order doesn't matter for 1 node if self is present - case 6", () => {
      const rootNode = mountAndGetRootNode(CDepth1, container);

      const nodeIterator = traverseGenerator(rootNode, {
        order: ["sibling", "self"]
      });
      const nodes = [...nodeIterator];

      // Can't be zero, in any case
      expect(nodes.length).not.toBe(0);
      // Check that only one node is yielded
      expect(nodes.length).toBe(1);
    });

    it("order matters for 1 node if self is absent - case 1", () => {
      const rootNode = mountAndGetRootNode(CDepth1, container);

      const nodeIterator = traverseGenerator(rootNode, {
        order: ["child", "sibling"]
      });
      const nodes = [...nodeIterator];

      // Will be zero
      expect(nodes.length).toBe(0);
      // Check that no node is yielded
      expect(nodes.length).not.toBe(1);
    });

    it("order matters for 1 node if self is absent - case 2", () => {
      const rootNode = mountAndGetRootNode(CDepth1, container);

      const nodeIterator = traverseGenerator(rootNode, {
        order: ["sibling", "child"]
      });
      const nodes = [...nodeIterator];

      // Will be zero
      expect(nodes.length).toBe(0);
      // Check that no node is yielded
      expect(nodes.length).not.toBe(1);
    });

    it("order matters for 1 node if self is absent - case 3", () => {
      const rootNode = mountAndGetRootNode(CDepth1, container);

      const nodeIterator = traverseGenerator(rootNode, {
        order: ["sibling"]
      });
      const nodes = [...nodeIterator];

      // Will be zero
      expect(nodes.length).toBe(0);
      // Check that no node is yielded
      expect(nodes.length).not.toBe(1);
    });

    it("order matters for 1 node if self is absent - case 4", () => {
      const rootNode = mountAndGetRootNode(CDepth1, container);

      const nodeIterator = traverseGenerator(rootNode, {
        order: ["child"]
      });
      const nodes = [...nodeIterator];

      // Will be zero
      expect(nodes.length).toBe(0);
      // Check that no node is yielded
      expect(nodes.length).not.toBe(1);
    });

    it("should work for depth-first - class component", () => {
      const [C2, C3, C4, C5] = createClassComponents(["C2", "C3", "C4", "C5"]);
      class C1 extends React.Component {
        render() {
          return (
            <React.Fragment>
              <C2>
                <C3 />
              </C2>
              <C4>
                <C5 />
              </C4>
            </React.Fragment>
          );
        }
      }

      const rootNode = mountAndGetRootNode(C1, container);

      const nodeIterator = traverseGenerator(rootNode, {
        order: ["self", "child", "sibling"]
      });
      const nodes = [...nodeIterator];

      expect(nodes.length).toBe(5);
      // Check depth-based order (default order)
      expect(
        nodes.map(tmpNode => (tmpNode as FiberNodeForComponentClass).type)
      ).toEqual([C1, C2, C3, C4, C5]);
    });

    it("should work for depth-first - function component", () => {
      const [C2, C3, C4, C5] = createFunctionComponents([
        "C2",
        "C3",
        "C4",
        "C5"
      ]);
      const C1 = function() {
        return (
          <React.Fragment>
            <C2>
              <C3 />
            </C2>
            <C4>
              <C5 />
            </C4>
          </React.Fragment>
        );
      };

      const rootNode = mountAndGetRootNode(C1, container);

      const nodeIterator = traverseGenerator(rootNode, {
        order: ["self", "child", "sibling"]
      });
      const nodes = [...nodeIterator];

      expect(nodes.length).toBe(5);
      // Check depth-based order (default order)
      expect(
        nodes.map(tmpNode => (tmpNode as FiberNodeForFunctionComponent).type)
      ).toEqual([C1, C2, C3, C4, C5]);
    });

    it("should work for depth=3 breadth-first", () => {
      class C1 extends React.Component {
        render() {
          return (
            <React.Fragment>
              <C2>
                <C5 />
              </C2>
              <C3>
                <C4 />
              </C3>
            </React.Fragment>
          );
        }
      }
      function C2(props: { children?: any }) {
        return props.children || null;
      }
      function C3(props: { children?: any }) {
        return props.children || null;
      }
      function C4(props: { children?: any }) {
        return props.children || null;
      }
      function C5(props: { children?: any }) {
        return props.children || null;
      }

      const rootNode = mountAndGetRootNode(C1, container);

      const nodeIterator = traverseGenerator(rootNode, {
        order: ["self", "sibling", "child"]
      });
      const nodes = [...nodeIterator];

      expect(nodes.length).toBe(5);
      // Check depth-based order (default order)
      expect(
        nodes.map(tmpNode => (tmpNode as FiberNodeForFunctionComponent).type)
      ).toEqual([C1, C2, C3, C4, C5]);
    });

    // it("should work for depth=5 class", () => {
    //   const rootNode = mountAndGetRootNode(CDepth5, container);

    //   const nodeIterator = traverseGenerator(rootNode);
    //   const nodes = [...nodeIterator];

    //   expect(nodes.length).toBe(5);
    // });

    // it("should work for depth=1 function", () => {
    //   const WrappedC = getWrappedComponent(FnDepth1);
    //   const rootNode = mountAndGetRootNode(WrappedC, container)
    //     .child as FiberNodeForFunctionComponent;

    //   const nodeIterator = traverseGenerator(rootNode);
    //   const nodes = [...nodeIterator];

    //   // Can't be zero, in any case
    //   expect(nodes.length).not.toBe(0);
    //   // Check that only one node is yielded
    //   expect(nodes.length).toBe(1);
    //   // Check type of node
    //   expect((nodes[0] as FiberNodeForComponentClass).type).toBe(FnDepth1);
    // });

    // it("should work for depth=3 function", () => {
    //   function Fn1() {
    //     return <Fn2 />;
    //   }
    //   function Fn2() {
    //     return <div>Fn2 here</div>;
    //   }

    //   const WrappedC = getWrappedComponent(Fn1);
    //   const rootNode = mountAndGetRootNode(WrappedC, container)
    //     .child as FiberNodeForFunctionComponent;

    //   const nodeIterator = traverseGenerator(rootNode);
    //   const nodes = [...nodeIterator];

    //   // Check that only 3 nodes are yielded
    //   expect(nodes.length).toBe(3);
    //   // Check depth-based order (default order)
    //   expect((nodes[0] as FiberNodeForFunctionComponent).type).toBe(Fn1);
    //   expect((nodes[1] as FiberNodeForFunctionComponent).type).toBe(Fn2);
    // });

    // it("should work for depth=5 function", () => {
    //   function Fn1() {
    //     return (
    //       <header>
    //         <Fn2 />
    //         <button />
    //       </header>
    //     );
    //   }
    //   function Fn2() {
    //     return <div>Fn2 here</div>;
    //   }

    //   const WrappedC = getWrappedComponent(Fn1);
    //   const rootNode = mountAndGetRootNode(WrappedC, container)
    //     .child as FiberNodeForFunctionComponent;

    //   const nodeIterator = traverseGenerator(rootNode);
    //   const nodes = [...nodeIterator];

    //   expect(nodes.length).toBe(5);
    // });
  });
});
