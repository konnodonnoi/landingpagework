import React from 'react'
import PropTypes from 'prop-types'

const message = ({ msg }) => {
  return (
    <div className="alert alert-primary" role="alert">
    {msg}
  </div>
  

  )
}

message.propTypes = {
msg: PropTypes.string.isRequired
}

export default message;