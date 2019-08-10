// import * as React from "react";

// Import stuff from src
import { isConstructorComponentClass } from "../src/utils";
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

  describe("isConstructorComponentClass", () => {
    it("should work for class components", () => {
      const C1 = createClassComponent("C1");

      const resultPositive = isConstructorComponentClass(C1);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
    });

    it("should not work for any class", () => {
      const C1 = class {};

      const resultNegative = isConstructorComponentClass(C1 as any);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should not work for any function", () => {
      const fn1 = function() {};

      const resultNegative = isConstructorComponentClass(fn1 as any);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should not work for function components", () => {
      const fn1 = createFunctionComponent();

      const resultNegative = isConstructorComponentClass(fn1);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should not work for string", () => {
      const resultNegative = isConstructorComponentClass("div");

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should not work for null", () => {
      const resultNegative = isConstructorComponentClass(null);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });
  });
});
