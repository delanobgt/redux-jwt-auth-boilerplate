import React, { Component, Fragment } from 'react'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

import * as actions from '../../actions/auth'
import CleanLink from '../misc/CleanLink'

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 3.5,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: 'blue'
  },
  textField: {
    marginTop: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit * 1
  },
  paper: {
    marginTop: theme.spacing.unit * 5,
    padding: theme.spacing.unit * 3,
    width: '350px'
  },
  authInfo: {
    textAlign: 'center',
    marginTop: '1em'
  }
})

class Signin extends Component {

  renderField = (field) => {
    const name = field.input.name
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
    return (
      <div>
        <TextField
          {...field.input}
          type={field.type}
          label={`${capitalizedName}`}
          fullWidth={true}
          className={field.className}
        />
        <div>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }
  
  onSubmit = formProps => {
    this.props.signIn(formProps, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { classes, handleSubmit } = this.props
    return (
      <Fragment>
        <Grid container justify='center'>
          <Paper elevation={1} className={classes.paper}>
            <Typography variant="headline" component="h1" align="center">
              Hello!
            </Typography>
            <form onSubmit={handleSubmit(this.onSubmit)} >
              <div>
                <Field
                  component={this.renderField}
                  name="email"
                  type="email"
                  className={classes.textField}
                />  
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  component={this.renderField}
                  className={classes.textField}
                />
              </div>
              <div className={classes.authInfo}>
                {this.props.errorMessage}
              </div>
              <div>
                <Button 
                  type="submit"
                  variant="contained" 
                  color="primary" 
                  fullWidth={true}
                  className={classes.button}
                >
                  Sign In
                </Button>
              </div>
            </form>
            <Typography component="p" align="center">
              Don't have an account yet? &nbsp;
              <CleanLink to='/signup'>Sign Up!</CleanLink>
            </Typography>
          </Paper>
        </Grid>
      </Fragment>
    )
  }
}

function validate(values) {
  const emailTest = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,4}$/i.test(value)

  const errors = {}

  if (!values.email)
    errors.email = 'Please specify an email!'
  else if (emailTest(values.email))
    errors.email = 'Invalid email address'

  if (!values.password) errors.password = 'Please specify a password!'
  return errors
}

function mapStateToProps(state) {
  return { 
    errorMessage: state.auth.errorMessage 
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, actions),
  reduxForm({ validate, form: 'SignIn' })
)(Signin)
