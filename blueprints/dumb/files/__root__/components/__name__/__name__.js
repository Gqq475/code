import React from 'react'
import classes from './<%= pascalEntityName %>.scss'

type Props = {

};
export class <%= pascalEntityName %> extends React.Component {
  props: Props;

  render () {
    return (
      <div className={classes['<%= pascalEntityName%>-container']}>
      </div>
    )
  }
}

export default <%= pascalEntityName %>
