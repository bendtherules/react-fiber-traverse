import * as React from "react";
// import ReactDOM from "react-dom";
import { mount } from "enzyme";
import CDepth2 from "./sample-components/depth-2-simple";
import { traverse, FiberNode } from "../src";

describe("Basic traverse test", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("should render correctly", () => {
    const rootRef = React.createRef<CDepth2>();

    // ReactDOM.render(
    //   <C text="text" ref={rootRef} />,
    //   document.getElementById("container")
    // );
    mount(<CDepth2 ref={rootRef} />, { attachTo: container });

    const mockCallback = jest.fn();

    if (rootRef.current !== null) {
      traverse(
        (rootRef.current as any)._reactInternalFiber.child as FiberNode,
        mockCallback
      );
    }

    // The mock function is called twice
    expect(mockCallback.mock.calls.length).toBe(2);
  });
});
