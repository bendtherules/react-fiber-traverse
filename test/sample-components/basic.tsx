// import * as PropTypes from "prop-types";
import * as React from "react";

interface Props {
  text: string;
}

class C extends React.Component<Props> {
  render() {
    return <p>{this.props.text}</p>;
  }
}

// C.propTypes = {
//   text: PropTypes.string.isRequired
// };

export default C;
