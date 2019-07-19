import * as PropTypes from 'prop-types'
import * as React from 'react'

interface Props {
  text: string
}

const C: React.SFC<Props> = ({ text }) => <p>{text}</p>

C.propTypes = {
  text: PropTypes.string.isRequired
}

export default C
