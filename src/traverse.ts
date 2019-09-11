// import { isNodeSimple } from './utils';
import { FiberNode } from "./mocked-types";

/**
 * Traverse nodes recursively in depth-first manner, starting from a start node.
 *
 * This is the default and basic traversal function, which covers basic use cases.
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

/**
 * Traverse nodes recursively using generators.
 *
 * This is the advanced traverse function, which can be used used
 * to write other variants of traversal and find.
 *
 * Type signature for generator.next first argument is `{ skipChild?: boolean; skipSibling?: boolean } | void `
 * Throw any error into the generator to finish the generator and let it cleanup its internals.
 *
 * It allows inversion of control -
 * so, application code can decide to
 * 1. change order of traversal,
 * 2. skip some elements,
 * 3. cancel traversal mid-way.
 *
 * @example
 * ```js
 * // Basic use (for-of)
 *
 * const nodeIterator = traverseGenerator(rootNode);
 * for (const node of nodeIterator) {
 *  // do something with each node here
 * }
 * ```
 *
 * @example
 * ```js
 * // Breadth-first
 *
 * // note the order below
 * const nodeIterator = traverseGenerator(rootNode, ["self", "sibling", "child"]);
 * // rest - same as above
 * ```
 *
 * @example
 * ```js
 * // Get first 3 nodes and then stop the generator
 *
 * const nodeIterator = traverseGenerator(rootNode);
 *
 * var count = 0;
 * var next;
 * while (
 *    count < 3 &&
 *    !(next = nodeIterator.next()).done
 * ) {
 *    count++;
 *    const node = next.value;
 *    // do something with each node here
 * }
 *
 * // Finish generator, to prevent memory leak
 * nodeIterator.throw(new Error());
 * ```
 *
 */
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
      | { skipChild?: boolean; skipSibling?: boolean }
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
