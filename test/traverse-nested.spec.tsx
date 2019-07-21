// import * as React from "react";

// Import stuff from src
import { traverse } from "../src";

// Import test helpers and sample components
import { mountAndGetRootNode } from "./utils/mount-in-enzyme";
import CDepth2Nested1 from "./sample-components/depth-2-nested-1";
import CDepth3Nested1 from "./sample-components/depth-3-nested-1";
import CDepth7Nested2 from "./sample-components/depth-7-nested-2";

describe("traverse", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("nested", () => {
    it("should work for depth=2 with level of nesting=1", () => {
      const rootNode = mountAndGetRootNode(CDepth2Nested1, container);
      const mockCallback = jest.fn();

      traverse(rootNode, mockCallback);

      expect(mockCallback.mock.calls.length).toBe(2);
    });

    it("should work for depth=3 with level of nesting=1", () => {
      const rootNode = mountAndGetRootNode(CDepth3Nested1, container);
      const mockCallback = jest.fn();

      traverse(rootNode, mockCallback);

      // Shouldn't count just component depth, should include string nodes
      expect(mockCallback.mock.calls.length).not.toBe(2);
      expect(mockCallback.mock.calls.length).toBe(3);
    });

    it("should work for depth=7 with level of nesting=2", () => {
      const rootNode = mountAndGetRootNode(CDepth7Nested2, container);
      const mockCallback = jest.fn();

      traverse(rootNode, mockCallback);

      expect(mockCallback.mock.calls.length).toBe(7);
    });
  });
});
