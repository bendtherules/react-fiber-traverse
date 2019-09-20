import * as React from "react";

// Import stuff from src
import {
  // matchGenerator,
  matchAll
  // matchFirst
} from "../src";

import {
  FiberNodeForComponentClass
  // FiberNodeForInstrinsicElement,
  // FiberNodeForFunctionComponent
} from "../src/mocked-types";

// Import test helpers and sample components
import { mountAndGetRootNode } from "./utils/mountInEnzyme";
import {
  // createClassComponents,
  // createFunctionComponents,
  createClassComponent,
  createClassComponents
} from "./utils/createComponent";

describe("matchGenerator", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("basic", () => {
    it("should work for depth=1 class", () => {
      const C1 = createClassComponent("C1");
      function CRoot() {
        return <C1 />;
      }
      const rootNode = mountAndGetRootNode(CRoot, container);

      const nodes = matchAll(rootNode, "C1");

      // Can't be zero, in any case
      expect(nodes.length).not.toBe(0);
      // Check that only one node is yielded
      expect(nodes.length).toBe(1);
      // Check that type is correct
      expect((nodes[0] as FiberNodeForComponentClass).type).toBe(C1);
    });

    it("should work for depth=2 class", () => {
      const [C1, C2] = createClassComponents(["C1", "C2"]);
      function CRoot() {
        return (
          <C1>
            <C2 />
          </C1>
        );
      }
      const rootNode = mountAndGetRootNode(CRoot, container);

      const nodes = matchAll(rootNode, "C2");

      // Can't be zero, in any case
      expect(nodes.length).not.toBe(0);
      // Check that only one node is yielded
      expect(nodes.length).toBe(1);
      // Check that type is correct
      expect((nodes[0] as FiberNodeForComponentClass).type).toBe(C2);
      expect((nodes[0] as FiberNodeForComponentClass).type).not.toBe(C1);
    });

    it("should work for depth=2 class with descendant selector", () => {
      const [C1, C2] = createClassComponents(["C1", "C2"]);
      function CRoot() {
        return (
          <C1>
            <C2 />
          </C1>
        );
      }
      const rootNode = mountAndGetRootNode(CRoot, container);

      const nodes = matchAll(rootNode, "C1 C2");

      // Can't be zero, in any case
      expect(nodes.length).not.toBe(0);
      // Check that only one node is yielded
      expect(nodes.length).toBe(1);
      // Check that type is correct
      expect((nodes[0] as FiberNodeForComponentClass).type).toBe(C2);
      expect((nodes[0] as FiberNodeForComponentClass).type).not.toBe(C1);
    });
  });
});
