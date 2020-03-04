import React, { Component } from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
// import { UserInfo } from '../components/UserInfo'


class UserInfo extends Component {
  render() {
    return (
      <div>
        Hello, {this.props.displayName}
        <button onClick={this.props.doLogout}></button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    displayName: state.auth.displayName,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doLogout() {
      firebase.auth().signOut()
      dispatch(logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfo)
