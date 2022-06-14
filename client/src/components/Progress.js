import React from 'react'
import PropTypes from 'prop-types'

const progress = ({ percentage }) => {
  return (
    <div className="progress">
  <div className="progress-bar progress-bar-striped" 
  role="progressbar" style={{ width: `${percentage}%`}} >
      {percentage}%
  </div>
  
</div>
  )
}

progress.propTypes = {
    percentage: PropTypes.number.isRequired,
}

export default progress