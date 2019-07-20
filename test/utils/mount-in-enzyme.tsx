import * as React from "react";
import { mount } from "enzyme";
import { FiberNode } from '../../src/mocked-types';

export class RootNodeNotFoundError extends Error {
  static message = `Couldn't find root node. This might occur if render has become async`
  constructor() {
    super(RootNodeNotFoundError.message);
    this.name = "RootNodeNotFoundError";
  }
}

export function mountAndGetRootNode(
  SomeComponentClass: typeof React.Component,
  container: HTMLElement
) {
  const rootRef = React.createRef<React.Component>();

  // TODO: later make this async as mount might be async and hence next steps will fail
  mount(<SomeComponentClass ref={rootRef} />, { attachTo: container });

  if (rootRef.current === null) {
    throw new RootNodeNotFoundError();
  }

  const rootNode = ((rootRef.current as any)._reactInternalFiber as FiberNode).child;

  if (rootNode === null) {
    throw new RootNodeNotFoundError();
  }

  return rootNode;
}
