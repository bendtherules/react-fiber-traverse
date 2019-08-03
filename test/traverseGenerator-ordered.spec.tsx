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
  });
});
