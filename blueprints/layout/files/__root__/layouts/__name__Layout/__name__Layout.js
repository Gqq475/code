import React, { PropTypes } from 'react'
import classes from './<%= pascalEntityName %>.scss'

function <%= pascalEntityName %> (props) {
  return (
    <div className=classes['<%= snakeEntityName %>-layout']>

    </div>
  )
}

<%= pascalEntityName %>.propTypes = {
  props: PropTypes.object
}

export default <%= pascalEntityName %>
