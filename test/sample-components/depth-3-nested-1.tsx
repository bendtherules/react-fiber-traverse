// import * as PropTypes from "prop-types";
import * as React from "react";

class CDepth3Nested1 extends React.Component {
  render() {
    return (
      <div>
        <CDepth0></CDepth0>
      </div>
    );
  }
}

class CDepth0 extends React.Component {
  render() {
    return null;
  }
}

export default CDepth3Nested1;
