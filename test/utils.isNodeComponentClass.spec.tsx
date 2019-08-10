// import * as React from "react";

// Import stuff from src
import { isNodeComponentClass } from "../src/utils";
import { mountAndGetRootNode } from "./utils/mountInEnzyme";
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

  describe("isNodeComponentClass", () => {
    it("should work for class component", () => {
      const C1 = createClassComponent("C1");
      const rootNode = mountAndGetRootNode(C1, container);

      const result = isNodeComponentClass(rootNode);

      expect(result).not.toBeFalsy();
      expect(result).toBe(true);
    });

    it("should not work for function component", () => {
      const fn1 = createFunctionComponent("fn1");
      const rootNode = mountAndGetRootNode(fn1, container);

      const result = isNodeComponentClass(rootNode);

      expect(result).toBeFalsy();
      expect(result).toBe(false);
    });

    it("should not work for html like component - div", () => {
      const rootNode = mountAndGetRootNode("div", container);

      const result = isNodeComponentClass(rootNode);

      expect(result).toBeFalsy();
      expect(result).toBe(false);
    });

    it("should not work for html like component - svg", () => {
      const rootNode = mountAndGetRootNode("svg", container);

      const result = isNodeComponentClass(rootNode);

      expect(result).toBeFalsy();
      expect(result).toBe(false);
    });
  });
});
