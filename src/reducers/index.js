import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import nav from './nav'

export default combineReducers({
  auth,
  nav,
  form: formReducer
})
