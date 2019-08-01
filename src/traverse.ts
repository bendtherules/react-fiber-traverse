// import { isNodeSimple } from './utils';
import { FiberNode } from "./mocked-types";

function traverse(node: FiberNode, fn: (node: FiberNode) => any) {
  fn.call(null, node);

  if (node.child !== null) {
    traverse(node.child, fn);
  }
  if (node.sibling !== null) {
    traverse(node.sibling, fn);
  }
}

function* traverseGenerator(
  node: FiberNode
  // {
  //   order = "pre"
  // }: { order: "in" | "pre" | "post" }
): IterableIterator<FiberNode> {
  const { skipChild, skipSibling } = yield node;

  if (!skipChild && node.child !== null) {
    const nextNode = node.child;
    yield* traverseGenerator(nextNode);
  }

  if (!skipSibling && node.sibling !== null) {
    const nextNode = node.sibling;
    yield* traverseGenerator(nextNode);
  }
}

export { traverse, traverseGenerator };
