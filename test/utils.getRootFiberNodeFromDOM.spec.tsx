// import * as React from "react";

// Import stuff from src
import { getRootFiberNodeFromDOM } from "../src/utils";

// Import test helpers and sample components
import { mountAndGetRootNode } from "./utils/mountInEnzyme";
import { createClassComponent } from "./utils/createComponent";

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

  describe("getRootFiberNodeFromDOM", () => {
    it("should work for direct element", () => {
      const C1 = createClassComponent("C1");
      const containerInner = container.appendChild(
        document.createElement("span")
      );
      mountAndGetRootNode(C1, containerInner);

      const resultPositive = getRootFiberNodeFromDOM(containerInner);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).not.toBe(null);
      expect((resultPositive as any).child.child.type).toBe(C1);
    });

    it("should work for parent element", () => {
      const C1 = createClassComponent("C1");
      const containerInner = container.appendChild(
        document.createElement("span")
      );
      mountAndGetRootNode(C1, containerInner);

      const resultPositive = getRootFiberNodeFromDOM(container);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).not.toBe(null);
      expect((resultPositive as any).child.child.type).toBe(C1);
    });

    it("should not work for child element", () => {
      const C1 = createClassComponent("C1");
      const containerInner = container.appendChild(
        document.createElement("span")
      );
      mountAndGetRootNode(C1, container);

      const resultNegative = getRootFiberNodeFromDOM(containerInner);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(null);
    });

    it("should work for body", () => {
      const C1 = createClassComponent("C1");
      mountAndGetRootNode(C1, document.body);

      const resultPositive = getRootFiberNodeFromDOM(document.body);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).not.toBe(null);
      expect((resultPositive as any).child.child.type).toBe(C1);
    });
  });
});
