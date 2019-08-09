import * as React from "react";

// Import stuff from src
import { isNodeHtmlLike, isNodeNotHtmlLike } from "../src/utils";
import { mountAndGetRootNode } from "./utils/mountInEnzyme";
import { FiberNodeForInstrinsicElement } from "../src/mocked-types";
import {
  createFunctionComponent,
  createClassComponent
} from "./utils/createComponent";

// Import test helpers and sample components

describe("utils", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("isNodeHtmlLike", () => {
    it("should work for div", () => {
      const rootNode = mountAndGetRootNode("div", container);

      const resultPositive = isNodeHtmlLike(rootNode);
      const resultNegative = isNodeNotHtmlLike(rootNode);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should work for svg root element", () => {
      const rootNode = mountAndGetRootNode("svg", container);

      const resultPositive = isNodeHtmlLike(rootNode);
      const resultNegative = isNodeNotHtmlLike(rootNode);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should work for svg inner elements", () => {
      function SomeSVG() {
        return (
          <svg>
            <circle cx={5} />
          </svg>
        );
      }
      const rootNode = mountAndGetRootNode(SomeSVG, container);

      expect(isNodeHtmlLike(rootNode)).toBeFalsy();

      const circleNode = (rootNode.child as FiberNodeForInstrinsicElement)
        .child as FiberNodeForInstrinsicElement;
      expect(circleNode).not.toBe(null);
      expect(circleNode.type).toBe("circle");

      const resultPositive = isNodeHtmlLike(circleNode);
      const resultNegative = isNodeNotHtmlLike(circleNode);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should not work for function component", () => {
      const fn1 = createFunctionComponent("fn1");
      const rootNode = mountAndGetRootNode(fn1, container);

      const resultPositive = isNodeNotHtmlLike(rootNode);
      const resultNegative = isNodeHtmlLike(rootNode);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should not work for class component", () => {
      const C1 = createClassComponent("C1");
      const rootNode = mountAndGetRootNode(C1, container);

      const resultPositive = isNodeNotHtmlLike(rootNode);
      const resultNegative = isNodeHtmlLike(rootNode);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });
  });
});
