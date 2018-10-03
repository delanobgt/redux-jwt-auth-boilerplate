import axios from 'axios'
import { AUTH_USER, AUTH_ERROR, ROOT_URL } from './conf'

export const signUp = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/auth/signup`,
      formProps
    )
    dispatch({ type: AUTH_USER, payload: response.data.token })
    localStorage.setItem('token', response.data.token)
    callback()
  } catch (e) {
    console.log(e)
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' })
  }
}

export const signIn = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/auth/signin`,
      formProps
    )
    dispatch({ type: AUTH_USER, payload: response.data.token })
    localStorage.setItem('token', response.data.token)
    callback()
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' })
  }
}

export const signOut = () => {
  localStorage.removeItem('token')
  return {
    type: AUTH_USER,
    payload: ''
  }
}
