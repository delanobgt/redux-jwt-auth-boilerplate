import React, { Component, Fragment } from 'react'
import Nav from './nav/Nav'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Welcome from './dashboard/Welcome'
import SignUp from './auth/SignUp'
import SignOut from './auth/SignOut'
import SignIn from './auth/SignIn'
import EmployeesIndex from './employees/index'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        {!this.props.authenticated ? (
          <Fragment>
            <Switch>
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="*" component={ () => <Redirect to="/signin"/> }/>
            </Switch>
          </Fragment>
        ) : (
          <Fragment>
            <Nav />
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/employees" component={EmployeesIndex} />
              <Route path="/signout" component={SignOut} />
              <Route path="*" component={ () => <Redirect to="/"/> }/>
            </Switch>
          </Fragment>
        )}
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(App)
