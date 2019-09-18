import CSSwhat from "css-what";
import { traverseGenerator } from "./traverse";
import { FiberNode } from "./mocked-types";
import { isNodeNotHtmlLike } from "./utils";

function* matchGenerator(
  node: FiberNode,
  match: string | CSSwhat.Selector[][]
): IterableIterator<FiberNode> {
  // Either parse match string or allow parsed match object as it is
  let matchParsed: CSSwhat.Selector[][];
  if (typeof match === "string") {
    matchParsed = CSSwhat.parse(match);
  } else {
    matchParsed = match;
  }

  // If selector is a combination of multiple basic selectors (a, b),
  // pass them separately to matchGenerator and combine their results one after another
  const selectorsCount = matchParsed.length;
  if (selectorsCount > 1) {
    for (const selectorParsed of matchParsed) {
      yield* matchGenerator(node, [selectorParsed]);
    }

    return;
  }

  // For simple selector (matchParsed.length == 0), actual logic starts here
  {
    const parsedSelector = matchParsed[0];
    if (parsedSelector.length === 0) {
      return;
    }

    let currentMatchingNodes: FiberNode[] = [node];
    let currentMatchingSelectorPartIndex = 0;
    let currentMatchingSelectorPart: CSSwhat.Selector =
      parsedSelector[currentMatchingSelectorPartIndex];
    let lastRelationshipSelectorPart: CSSwhat.Selector | undefined = undefined;

    while (currentMatchingSelectorPartIndex < parsedSelector.length) {
      const nextMatchingNodes: FiberNode[] = [];

      for (const currentNode of currentMatchingNodes) {
        if (["tag"].includes(currentMatchingSelectorPart.type)) {
          const traverseIterator = traverseGenerator(currentNode);

          // Handle supported non-traversal parts here
          if (currentMatchingSelectorPart.type == "tag") {
            for (const tmpNode of traverseIterator) {
              if (
                isNodeNotHtmlLike(tmpNode) &&
                tmpNode.type.name === currentMatchingSelectorPart.name
              ) {
                nextMatchingNodes.push(tmpNode);
              }
            }
          }
          traverseIterator.throw &&
            traverseIterator.throw(new Error("cleanup"));
        } else if (["descendant"].includes(currentMatchingSelectorPart.type)) {
          // Handle traversal parts here
          lastRelationshipSelectorPart = currentMatchingSelectorPart;
        } else {
          // For unhandled parts
          lastRelationshipSelectorPart = undefined;
        }
      }

      currentMatchingNodes = nextMatchingNodes;
    }

    return;
  }
}

export { matchGenerator };
