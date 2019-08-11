import * as React from "react";

// Import stuff from src
import { FiberNodeForComponentClass, FiberNode } from "../src/mocked-types";
import { traverseGenerator } from "../src";

// Import test helpers and sample components
import { mountAndGetRootNode } from "./utils/mountInEnzyme";
import {
  createClassComponents
  // createFunctionComponents
} from "./utils/createComponent";

describe("traverseGenerator", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("skipped", () => {
    it("should traverse just top-level with skipChild", () => {
      const [C2, C3, C4, C5] = createClassComponents(["C2", "C3", "C4", "C5"]);
      class C1 extends React.Component {
        render() {
          return (
            <React.Fragment>
              <C2>
                <C3 />
              </C2>
              <C4>
                <C5 />
              </C4>
            </React.Fragment>
          );
        }
      }

      const rootNode = mountAndGetRootNode(C1, container);

      const nodeIterator = traverseGenerator(rootNode);

      // Consume generator
      let nodes: Array<FiberNode> = [];
      const genArgs = { skipChild: true };
      for (
        let result = nodeIterator.next();
        !result.done;
        result = nodeIterator.next(genArgs)
      ) {
        const currentNode = result.value;
        nodes.push(currentNode);
      }

      expect(nodes.length).toBe(1);
      expect(
        nodes.map(tmpNode => (tmpNode as FiberNodeForComponentClass).type)
      ).toEqual([C1]);
    });

    it("should traverse just first 2 levels with inner skipChild", () => {
      const [C2, C3, C4, C5] = createClassComponents(["C2", "C3", "C4", "C5"]);
      class C1 extends React.Component {
        render() {
          return (
            <React.Fragment>
              <C2>
                <C3 />
              </C2>
              <C4>
                <C5 />
              </C4>
            </React.Fragment>
          );
        }
      }

      const rootNode = mountAndGetRootNode(C1, container);

      const nodeIterator = traverseGenerator(rootNode);

      // Consume generator
      let nodes: Array<FiberNode> = [];
      const genArgs = { skipChild: true };
      for (
        let result = nodeIterator.next();
        !result.done;
        result = nodeIterator.next(nodes.length > 1 ? genArgs : undefined)
      ) {
        const currentNode = result.value;
        nodes.push(currentNode);
      }

      expect(nodes.length).toBe(3);
      expect(
        nodes.map(tmpNode => (tmpNode as FiberNodeForComponentClass).type)
      ).toEqual([C1, C2, C4]);
    });

    it("should traverse one branch correctly with skipSibling", () => {
      const [C2, C3, C4, C5] = createClassComponents(["C2", "C3", "C4", "C5"]);
      class C1 extends React.Component {
        render() {
          return (
            <React.Fragment>
              <C2>
                <C3 />
              </C2>
              <C4>
                <C5 />
              </C4>
            </React.Fragment>
          );
        }
      }

      const rootNode = mountAndGetRootNode(C1, container);

      const nodeIterator = traverseGenerator(rootNode);

      // Consume generator
      let nodes: Array<FiberNode> = [];
      const genArgs = { skipSibling: true };
      for (
        let result = nodeIterator.next();
        !result.done;
        result = nodeIterator.next(genArgs)
      ) {
        const currentNode = result.value;
        nodes.push(currentNode);
      }

      expect(nodes.length).toBe(3);
      expect(
        nodes.map(tmpNode => (tmpNode as FiberNodeForComponentClass).type)
      ).toEqual([C1, C2, C3]);
    });
  });
});
