// import * as React from "react";

// Import stuff from src
import { traverseGenerator } from "../src";

// Import test helpers and sample components
import { mountAndGetRootNode } from "./utils/mount-in-enzyme";
import CDepth1 from "./sample-components/depth-1-simple";
import CDepth2 from "./sample-components/depth-2-simple";
import CDepth5 from "./sample-components/depth-5-simple";
import {
  FiberNodeForComponentClass,
  FiberNodeForInstrinsicElement
} from "../src/mocked-types";

describe("traverse", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("basic", () => {
    it("should work for depth=1", () => {
      const rootNode = mountAndGetRootNode(CDepth1, container);

      const nodeIterator = traverseGenerator(rootNode);
      const nodes = [...nodeIterator];

      // Can't be zero, in any case
      expect(nodes.length).not.toBe(0);
      expect(nodes.length).toBe(1);
    });

    it("should work for depth=2", () => {
      const rootNode = mountAndGetRootNode(CDepth2, container);

      const nodeIterator = traverseGenerator(rootNode);
      const nodes = [...nodeIterator];

      expect(nodes.length).toBe(2);
      expect((nodes[0] as FiberNodeForComponentClass).type).toBe(CDepth2);
      expect((nodes[1] as FiberNodeForInstrinsicElement).type).toBe("div");
    });

    it("should work for depth=5", () => {
      const rootNode = mountAndGetRootNode(CDepth5, container);

      const nodeIterator = traverseGenerator(rootNode);
      const nodes = [...nodeIterator];

      expect(nodes.length).toBe(5);
    });
  });
});
