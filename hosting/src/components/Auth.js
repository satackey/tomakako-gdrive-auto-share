import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { loggedIn } from '../redux/actions'

class Auth extends Component {
  componentDidMount() {
    this.props.refLogin()
  }

  render() {
    return (
      <div>
        <button onClick={this.props.doLogin}>
          Login
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    refLogin() {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          return
        }
        dispatch(loggedIn(user))
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth)
