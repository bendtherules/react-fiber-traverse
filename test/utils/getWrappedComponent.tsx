import React from "react";

function getWrappedComponent(SomeComponent: React.ElementType) {
  class WrappedC extends React.Component {
    render() {
      return <SomeComponent />;
    }
  }
  return WrappedC;
}

export default getWrappedComponent;
