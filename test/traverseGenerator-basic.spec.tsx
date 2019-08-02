import * as React from "react";

// Import stuff from src
import {
  FiberNodeForComponentClass,
  FiberNodeForInstrinsicElement,
  FiberNodeForFunctionComponent
} from "../src/mocked-types";
import { traverseGenerator } from "../src";

// Import test helpers and sample components
import { mountAndGetRootNode } from "./utils/mount-in-enzyme";
import getWrappedComponent from './utils/getWrappedComponent';
import CDepth1 from "./sample-components/depth-1-simple";
import CDepth2 from "./sample-components/depth-2-simple";
import CDepth5 from "./sample-components/depth-5-simple";
import FnDepth1 from './sample-components/depth-1-fn-simple';

describe("traverseGenerator", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("basic", () => {
    it("should work for depth=1 class", () => {
      const rootNode = mountAndGetRootNode(CDepth1, container);

      const nodeIterator = traverseGenerator(rootNode);
      const nodes = [...nodeIterator];

      // Can't be zero, in any case
      expect(nodes.length).not.toBe(0);
      // Check that only one node is yielded
      expect(nodes.length).toBe(1);
    });

    it("should work for depth=2 class", () => {
      const rootNode = mountAndGetRootNode(CDepth2, container);

      const nodeIterator = traverseGenerator(rootNode);
      const nodes = [...nodeIterator];

      // Check that only 2 nodes are yielded
      expect(nodes.length).toBe(2);
      // Check depth-based order (default order)
      expect((nodes[0] as FiberNodeForComponentClass).type).toBe(CDepth2);
      expect((nodes[1] as FiberNodeForInstrinsicElement).type).toBe("div");
    });

    it("should work for depth=5 class", () => {
      const rootNode = mountAndGetRootNode(CDepth5, container);

      const nodeIterator = traverseGenerator(rootNode);
      const nodes = [...nodeIterator];

      expect(nodes.length).toBe(5);
    });

    it("should work for depth=1 function", () => {
      const WrappedC = getWrappedComponent(FnDepth1);
      const rootNode = mountAndGetRootNode(WrappedC, container)
        .child as FiberNodeForFunctionComponent;

      const nodeIterator = traverseGenerator(rootNode);
      const nodes = [...nodeIterator];

      // Can't be zero, in any case
      expect(nodes.length).not.toBe(0);
      // Check that only one node is yielded
      expect(nodes.length).toBe(1);
      // Check type of node
      expect((nodes[0] as FiberNodeForComponentClass).type).toBe(FnDepth1);
    });

    it("should work for depth=3 function", () => {
      function Fn1() {
        return <Fn2 />;
      }
      function Fn2() {
        return <div>Fn2 here</div>;
      }

      const WrappedC = getWrappedComponent(Fn1);
      const rootNode = mountAndGetRootNode(WrappedC, container)
        .child as FiberNodeForFunctionComponent;

      const nodeIterator = traverseGenerator(rootNode);
      const nodes = [...nodeIterator];

      // Check that only 3 nodes are yielded
      expect(nodes.length).toBe(3);
      // Check depth-based order (default order)
      expect((nodes[0] as FiberNodeForFunctionComponent).type).toBe(Fn1);
      expect((nodes[1] as FiberNodeForFunctionComponent).type).toBe(Fn2);
    });

    it("should work for depth=5 function", () => {
      function Fn1() {
        return (
          <header>
            <Fn2 />
            <button />
          </header>
        );
      }
      function Fn2() {
        return <div>Fn2 here</div>;
      }

      const WrappedC = getWrappedComponent(Fn1);
      const rootNode = mountAndGetRootNode(WrappedC, container)
        .child as FiberNodeForFunctionComponent;

      const nodeIterator = traverseGenerator(rootNode);
      const nodes = [...nodeIterator];

      expect(nodes.length).toBe(5);
    });
  });
});
