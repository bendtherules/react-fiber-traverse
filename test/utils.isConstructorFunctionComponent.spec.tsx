// import * as React from "react";

// Import stuff from src
import { isConstructorFunctionComponent } from "../src/utils";
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

  describe("isConstructorFunctionComponent", () => {
    it("should work for any function - current limitation", () => {
      const fn1 = function() {};

      const resultPositive = isConstructorFunctionComponent(fn1 as any);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
    });

    it("should work for function components", () => {
      const fn1 = createFunctionComponent();

      const resultPositive = isConstructorFunctionComponent(fn1);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
    });

    it("should not work for string", () => {
      const resultNegative = isConstructorFunctionComponent("div");

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should not work for null", () => {
      const resultNegative = isConstructorFunctionComponent(null);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should work for any class - current limitation", () => {
      const C1 = class {};

      const resultPositive = isConstructorFunctionComponent(C1 as any);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
    });

    it("should not work for class components", () => {
      const C1 = createClassComponent("C1");

      const resultNegative = isConstructorFunctionComponent(C1);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });
  });
});
