// import * as React from "react";

// Import stuff from src
import { doesElementContainRootFiberNode } from "../src/utils";

// Import test helpers and sample components
import { mountAndGetRootNode } from "./utils/mountInEnzyme";
import { createFunctionComponent } from "./utils/createComponent";

describe("traverse", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    try {
      document.body.removeChild(container);
    } catch (error) {
      if (!(error instanceof DOMException)) {
        throw error;
      }
    }
  });

  describe("doesElementContainRootFiberNode", () => {
    it("should work for direct element", () => {
      const fn1 = createFunctionComponent("fn1");
      const containerInner = container.appendChild(
        document.createElement("span")
      );
      mountAndGetRootNode(fn1, containerInner);

      const resultPositive = doesElementContainRootFiberNode(containerInner);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
    });

    it("should not work for parent element", () => {
      const fn1 = createFunctionComponent("fn1");
      const containerInner = container.appendChild(
        document.createElement("span")
      );
      mountAndGetRootNode(fn1, containerInner);

      const resultNegative = doesElementContainRootFiberNode(container);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should not work for child element", () => {
      const fn1 = createFunctionComponent("fn1");
      const containerInner = container.appendChild(
        document.createElement("span")
      );
      mountAndGetRootNode(fn1, container);

      const resultNegative = doesElementContainRootFiberNode(containerInner);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should work for body", () => {
      const fn1 = createFunctionComponent("fn1");
      mountAndGetRootNode(fn1, document.body);

      const resultPositive = doesElementContainRootFiberNode(document.body);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
    });
  });
});
