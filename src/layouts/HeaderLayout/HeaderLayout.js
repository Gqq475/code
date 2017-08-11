import React, { PropTypes } from 'react'
import classes from './HeaderLayout.scss'
import Navbar from 'components/Navbar'

function Header (props) {
  return (
    <div id='qmsHeader' className={classes['header-layout']}>
      <Navbar {...props} />
    </div>
  )
}

Header.propTypes = {
  props: PropTypes.object
}

export default Header
