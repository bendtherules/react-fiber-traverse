import { FiberNode } from "./mocked-types";
import { isNodeNotHtmlLike } from "./utils";

/**
 * Find node by component name, till first match.
 *
 * Matches against class and function name, doesn't match html-like nodes.
 * Returns null if no match is found.
 *
 * @note Highest chance of collision, least data access needed.
 * Different components with same name will collide.
 * Needs access to component name.
 *
 * @example
 * // returns FiberNode for first usage of 'AccordionMenu'
 * findNodeByComponentName(startNode, "AccordionMenu");
 *
 */
function findNodeByComponentName(
  node: FiberNode | null,
  expectedName: string
): FiberNode | null {
  if (node === null) {
    return null;
  }

  if (isNodeNotHtmlLike(node) && node.type.name === expectedName) {
    return node;
  }

  {
    const returnVal = findNodeByComponentName(node.child, expectedName);
    if (returnVal !== null) {
      return returnVal;
    }
  }
  {
    const returnVal = findNodeByComponentName(node.sibling, expectedName);
    if (returnVal !== null) {
      return returnVal;
    }
  }

  return null;
}

/**
 * Find node by component (i.e. class or function by reference), till first match.
 *
 * Matches against class and function by reference.
 * Returns null if no match is found.
 *
 * @note Medium chance of collision, medium data access needed.
 * This is safer than findNodeByComponentName, as different components with the same name won't collide.
 * But, two instances of the same component will still collide.
 * Needs access to component class or function.
 *
 * @example
 * // returns FiberNode for first usage of AccordionMenu
 * findNodeByComponent(startNode, AccordionMenu);
 *
 */
function findNodeByComponent(
  node: FiberNode | null,
  expectedClassOrFunction: React.ComponentType
): FiberNode | null {
  if (node === null) {
    return null;
  }

  if (isNodeNotHtmlLike(node) && node.type === expectedClassOrFunction) {
    return node;
  }

  {
    const returnVal = findNodeByComponent(node.child, expectedClassOrFunction);
    if (returnVal !== null) {
      return returnVal;
    }
  }
  {
    const returnVal = findNodeByComponent(
      node.sibling,
      expectedClassOrFunction
    );
    if (returnVal !== null) {
      return returnVal;
    }
  }

  return null;
}

/**
 * Find node by component instance ref, till first match.
 *
 * Matches against class instances by reference.
 * Returns null if no match is found.
 *
 * @note  Least chance of collision, maximum data access needed.
 * Needs access to component instance (through React ref usually).
 *
 * @example
 * // menuRef=createRef(); <AccordionMenu ref={menuRef}>
 * findNodeByComponentRef(startNode, menuRef.current);
 *
 */
function findNodeByComponentRef(
  node: FiberNode | null,
  expectedClassInstance: React.Component
): FiberNode | null {
  if (node === null) {
    return null;
  }

  if (isNodeNotHtmlLike(node) && node.stateNode === expectedClassInstance) {
    return node;
  }

  {
    const returnVal = findNodeByComponentRef(node.child, expectedClassInstance);
    if (returnVal !== null) {
      return returnVal;
    }
  }
  {
    const returnVal = findNodeByComponentRef(
      node.sibling,
      expectedClassInstance
    );
    if (returnVal !== null) {
      return returnVal;
    }
  }

  return null;
}

export { findNodeByComponentName, findNodeByComponent, findNodeByComponentRef };
