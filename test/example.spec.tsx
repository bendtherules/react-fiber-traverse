import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import C from "./sample-components/basic";

describe("Component", () => {
  let container: HTMLDivElement;
  let wrapper: ReactWrapper;

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("should render correctly", () => {
    const rootRef = React.createRef<C>();

    rootRef.current && rootRef.current

    wrapper = mount(<C text="text" ref={rootRef} />, { attachTo: container });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
