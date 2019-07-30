import { FiberNode } from "./mocked-types";
import { isNodeNotHtmlLike } from "./utils";

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
    const returnVal = findNodeByComponent(node.sibling, expectedClassOrFunction);
    if (returnVal !== null) {
      return returnVal;
    }
  }

  return null;
}

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
    const returnVal = findNodeByComponentRef(node.sibling, expectedClassInstance);
    if (returnVal !== null) {
      return returnVal;
    }
  }

  return null;
}

export { findNodeByComponentName, findNodeByComponent, findNodeByComponentRef };
