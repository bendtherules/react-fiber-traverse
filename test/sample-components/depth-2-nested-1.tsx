// import * as PropTypes from "prop-types";
import * as React from "react";

class CDepth2Nested1 extends React.Component {
  render() {
    return <CDepth0></CDepth0>;
  }
}

class CDepth0 extends React.Component {
  render() {
    return null;
  }
}

export default CDepth2Nested1;
