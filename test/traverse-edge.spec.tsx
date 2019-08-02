// import * as React from "react";

// Import stuff from src
import { traverse } from "../src";

// Import test helpers and sample components
import { mountAndGetRootNode } from "./utils/mountInEnzyme";

describe("traverse", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("edge cases", () => {
    it("should work for string nodes", () => {
      const rootNode = mountAndGetRootNode('div', container);
      const mockCallback = jest.fn();

      traverse(rootNode, mockCallback);

      // Can't be zero, in any case
      expect(mockCallback.mock.calls.length).not.toBe(0);
      expect(mockCallback.mock.calls.length).toBe(1);
    });
  });
});
