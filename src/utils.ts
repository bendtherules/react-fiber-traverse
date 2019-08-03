import * as React from "react";
import {
  FiberNode,
  FiberNodeisHTMLLike,
  FiberNodeForFunctionComponent,
  FiberNodeForComponentClass
} from "./mocked-types";

function isNodeHtmlLike(node: FiberNode): node is FiberNodeisHTMLLike {
  return typeof node.type === "string" || node.type === null;
}

function isNodeNotHtmlLike(
  node: FiberNode
): node is Exclude<FiberNode, FiberNodeisHTMLLike> {
  return !isNodeHtmlLike(node);
}

function isNodeFunctionComponent(
  node: FiberNode
): node is FiberNodeForFunctionComponent {
  return isNodeNotHtmlLike(node) && node.stateNode === null;
}

function isNodeComponentClass(
  node: FiberNode
): node is FiberNodeForComponentClass {
  return isNodeNotHtmlLike(node) && node.stateNode instanceof React.Component;
}

function isConstructorHtmlLike(
  ctr: React.ElementType
): ctr is Exclude<React.ElementType, React.ComponentType> {
  if (typeof ctr === "string" || ctr === null) {
    return true;
  }
  return false;
}

function isConstructorComponentClass(
  ctr: React.ElementType
): ctr is React.ComponentClass {
  if (isConstructorHtmlLike(ctr)) {
    return false;
  }

  if (
    ctr.prototype !== undefined &&
    (ctr.prototype as any) instanceof React.Component
  ) {
    return true;
  }

  return false;
}

function isConstructorFunctionComponent(
  ctr: React.ElementType
): ctr is React.FunctionComponent {
  return !isConstructorComponentClass(ctr);
}

export {
  isNodeHtmlLike,
  isNodeNotHtmlLike,
  isNodeFunctionComponent,
  isNodeComponentClass,
  isConstructorHtmlLike,
  isConstructorComponentClass,
  isConstructorFunctionComponent
};
