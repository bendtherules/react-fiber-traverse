// import { isNodeSimple } from './utils';
import { FiberNode } from "./mocked-types";

/**
 * Traverse nodes recursively in depth-first manner, starting from a start node.
 *
 * This is the default and basic traversal method, which covers basic use cases.
 * You can't do advanced things like change the order of traversal, skip or cancel traversal after any node, etc.
 * For more advanced usecases, see {@link traverseGenerator}
 *
 * @example
 * ```js
 * // calls fn for each node inside startNode
 * traverse(startNode, fn);
 * ```
 *
 */
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
  node: FiberNode,
  {
    order = ["self", "child", "sibling"]
  }: { order?: Array<"self" | "child" | "sibling"> } = {}
): IterableIterator<FiberNode> {
  let skipChild = false,
    skipSibling = false;

  function* traverseSelf() {
    const controlInput:
      | { skipChild: boolean; skipSibling: boolean }
      | undefined = yield node;

    if (controlInput !== undefined) {
      ({ skipChild = skipChild, skipSibling = skipSibling } = controlInput);
    }
  }

  function* traverseChild() {
    if (!skipChild && node.child !== null) {
      const nextNode = node.child;
      yield* traverseGenerator(nextNode, { order });
    }
  }

  function* traverseSibling() {
    if (!skipSibling && node.sibling !== null) {
      const nextNode = node.sibling;
      yield* traverseGenerator(nextNode, { order });
    }
  }

  const traverseMap = {
    self: traverseSelf,
    child: traverseChild,
    sibling: traverseSibling
  };

  // For each item mentioned in order, find generator functions to run
  const orderedGenerators = order
    .map(step => traverseMap[step])
    .filter(tmp => tmp !== undefined);

  // Now run each generator till end
  for (const eachGen of orderedGenerators) {
    yield* eachGen();
  }
}

export { traverse, traverseGenerator };
