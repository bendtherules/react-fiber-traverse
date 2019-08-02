import * as React from "react";

// Import stuff from src
import { traverse } from "../src";

// Import test helpers and sample components
import { mountAndGetRootNode } from "./utils/mount-in-enzyme";
import CDepth1 from "./sample-components/depth-1-simple";
import CDepth2 from "./sample-components/depth-2-simple";
import CDepth5 from "./sample-components/depth-5-simple";
import FnDepth1 from "./sample-components/depth-1-fn-simple";
import getWrappedComponent from "./utils/getWrappedComponent";
import { FiberNodeForFunctionComponent } from "../src/mocked-types";

describe("traverse", () => {
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
      const mockCallback = jest.fn();

      traverse(rootNode, mockCallback);

      // Can't be zero, in any case
      expect(mockCallback.mock.calls.length).not.toBe(0);
      expect(mockCallback.mock.calls.length).toBe(1);
    });

    it("should work for depth=2 class", () => {
      const rootNode = mountAndGetRootNode(CDepth2, container);
      const mockCallback = jest.fn();

      traverse(rootNode, mockCallback);

      expect(mockCallback.mock.calls.length).toBe(2);
    });

    it("should work for depth=5 class", () => {
      const rootNode = mountAndGetRootNode(CDepth5, container);
      const mockCallback = jest.fn();

      traverse(rootNode, mockCallback);

      expect(mockCallback.mock.calls.length).toBe(5);
    });

    it("should work for depth=1 function", () => {
      const WrappedC = getWrappedComponent(FnDepth1);
      const rootNode = mountAndGetRootNode(WrappedC, container)
        .child as FiberNodeForFunctionComponent;
      const mockCallback = jest.fn();

      traverse(rootNode, mockCallback);

      expect(mockCallback.mock.calls.length).not.toBe(0);
      expect(mockCallback.mock.calls.length).toBe(1);
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
      const mockCallback = jest.fn();

      traverse(rootNode, mockCallback);

      expect(mockCallback.mock.calls.length).toBe(3);
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
      const mockCallback = jest.fn();

      traverse(rootNode, mockCallback);

      expect(mockCallback.mock.calls.length).toBe(5);
    });
  });
});
