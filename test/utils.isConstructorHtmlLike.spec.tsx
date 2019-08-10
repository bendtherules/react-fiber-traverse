// import * as React from "react";

// Import stuff from src
import { isConstructorHtmlLike } from "../src/utils";
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

  describe("isConstructorHtmlLike", () => {
    it("should work for string", () => {
      const resultPositive = isConstructorHtmlLike("div");

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
    });

    it("should work for null", () => {
      const resultPositive = isConstructorHtmlLike(null);

      expect(resultPositive).not.toBeFalsy();
      expect(resultPositive).toBe(true);
    });

    it("should not work for any function", () => {
      const fn1 = function() {};

      const resultNegative = isConstructorHtmlLike(fn1 as any);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should not work for function components", () => {
      const fn1 = createFunctionComponent();

      const resultNegative = isConstructorHtmlLike(fn1);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should not work for any class", () => {
      const C1 = class {};

      const resultNegative = isConstructorHtmlLike(C1 as any);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });

    it("should not work for class components", () => {
      const C1 = createClassComponent("C1");

      const resultNegative = isConstructorHtmlLike(C1);

      expect(resultNegative).toBeFalsy();
      expect(resultNegative).toBe(false);
    });
  });
});
