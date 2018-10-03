import React, { Component } from 'react'
import AppBar from './AppBar'
import Drawer from './Drawer'

class Nav extends Component {

  render() {
    return (
      <div>
        <AppBar/>
        <br/><br/>
        <Drawer/>
      </div>
    )
  }
}

export default Nav
