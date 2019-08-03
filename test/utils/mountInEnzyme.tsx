import * as React from "react";
import { mount } from "enzyme";
import { FiberNode, FiberNodeForComponentClass } from "../../src/mocked-types";
import {
  isConstructorFunctionComponent
} from "../../src/utils";
import getWrappedComponent from "./getWrappedComponent";

export class RootNodeNotFoundError extends Error {
  static message = `Couldn't find root node. This might occur if render has become async`;
  constructor() {
    super(RootNodeNotFoundError.message);
    this.name = "RootNodeNotFoundError";
  }
}

export function mountAndGetRootNode(
  SomeComponent: React.ComponentType,
  container: HTMLElement
): FiberNode {
  const rootRef = React.createRef<React.Component>();

  let ToMount = undefined;
  // Wrap function components in ComponentClass to be able to set ref
  if (isConstructorFunctionComponent(SomeComponent)) {
    ToMount = getWrappedComponent(SomeComponent);
  } else {
    ToMount = SomeComponent;
  }

  // TODO: later make this async as mount might be async and hence next steps will fail
  mount(<ToMount ref={rootRef} />, { attachTo: container });

  if (rootRef.current === null) {
    throw new RootNodeNotFoundError();
  }

  const rootNode = ((rootRef.current as any)._reactInternalFiber as FiberNode)
    .child;

  if (rootNode === null) {
    throw new RootNodeNotFoundError();
  }

  // Unwrap function components to return expected root node
  if (isConstructorFunctionComponent(SomeComponent)) {
    return (rootNode as FiberNodeForComponentClass).child as FiberNode;
  } else {
    return rootNode;
  }
}
