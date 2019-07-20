// import * as React from "react";

// Import stuff from src
import { traverse } from "../src";

// Import test helpers and sample components
import { mountAndGetRootNode } from "./utils/mount-in-enzyme";
import CDepth1 from "./sample-components/depth-1-simple";
import CDepth2 from "./sample-components/depth-2-simple";

describe("Basic traverse test", () => {
  let container: HTMLDivElement;
  
  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("should work for depth=1", () => {
    const rootNode = mountAndGetRootNode(CDepth1, container);
    const mockCallback = jest.fn();

    traverse(rootNode, mockCallback);

    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it("should work for depth=2", () => {
    const rootNode = mountAndGetRootNode(CDepth2, container);
    const mockCallback = jest.fn();

    traverse(rootNode, mockCallback);

    expect(mockCallback.mock.calls.length).toBe(2);
  });
});
