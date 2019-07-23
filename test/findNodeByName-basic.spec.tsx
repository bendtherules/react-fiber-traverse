import React from "react";

// Import stuff from src
import { findNodeByComponentName } from "../src";

// Import test helpers and sample components
import { mountAndGetRootNode } from "./utils/mount-in-enzyme";
import CDepth1 from "./sample-components/depth-1-simple";
import { FiberNodeForComponentClass } from "../src/mocked-types";

describe("findNodeByComponentName", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("basic", () => {
    it("should work for top-level name", () => {
      // TODO: Move this to a helper function
      class WrappedC extends React.Component {
        render() {
          return <CDepth1 />;
        }
      }
      const rootNode = mountAndGetRootNode(WrappedC, container);

      const found = findNodeByComponentName(rootNode, CDepth1.name);

      // Shouldn't be null, or other falsy value
      expect(found).not.toBeFalsy();
      expect((found as FiberNodeForComponentClass).stateNode).toBeInstanceOf(
        CDepth1
      );
    });
  });
});
