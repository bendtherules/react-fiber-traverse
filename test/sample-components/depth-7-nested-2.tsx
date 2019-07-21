// import * as PropTypes from "prop-types";
import * as React from "react";

class CDepth7Nested2 extends React.Component {
  render() {
    const someValue = 5;

    return (
      <div className="abc" data-test={[1, 2, 3, 4, someValue]}>
        <CDepth4></CDepth4>
      </div>
    );
  }
}

class CDepth4 extends React.Component {
  render() {
    return (
      <div>
        <button></button>
        <CDepth1></CDepth1>
      </div>
    );
  }
}

class CDepth1 extends React.Component {
  render() {
    return <div></div>;
  }
}

export default CDepth7Nested2;
