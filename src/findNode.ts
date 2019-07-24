import { FiberNode } from "./mocked-types";
import { isNotHtmlLike } from "./utils";

function findNodeByComponentName(
  node: FiberNode | null,
  expectedName: string
): FiberNode | null {
  if (node === null) {
    return null;
  }

  if (isNotHtmlLike(node) && node.type.name === expectedName) {
    // console.debug("Found node " + node);
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

function findNodeByComponent(
  node: FiberNode | null,
  expectedClassOrFunction: React.ComponentType
): FiberNode | null {
  if (node === null) {
    return null;
  }

  if (isNotHtmlLike(node) && node.type === expectedClassOrFunction) {
    // console.debug("Found node " + node);
    return node;
  }

  {
    const returnVal = findNodeByComponent(node.child, expectedClassOrFunction);
    if (returnVal !== null) {
      return returnVal;
    }
  }
  {
    const returnVal = findNodeByComponent(node.sibling, expectedClassOrFunction);
    if (returnVal !== null) {
      return returnVal;
    }
  }

  return null;
}

function findNodeByComponentInstance(
  node: FiberNode | null,
  expectedClassInstance: React.Component
): FiberNode | null {
  if (node === null) {
    return null;
  }

  if (isNotHtmlLike(node) && node.stateNode === expectedClassInstance) {
    // console.debug("Found node " + node);
    return node;
  }

  {
    const returnVal = findNodeByComponentInstance(node.child, expectedClassInstance);
    if (returnVal !== null) {
      return returnVal;
    }
  }
  {
    const returnVal = findNodeByComponentInstance(node.sibling, expectedClassInstance);
    if (returnVal !== null) {
      return returnVal;
    }
  }

  return null;
}

export { findNodeByComponentName, findNodeByComponent, findNodeByComponentInstance };
