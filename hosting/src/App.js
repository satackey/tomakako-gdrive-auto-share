import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import firebase from 'firebase/app'

import './App.css'

import Office365Auth from './components/Office365Auth'
import GoogleAuth from './components/GoogleAuth'
import JoinDrive from './components/JoinDrive'
import { 
  Office365認証がされていない, Office365認証成功した, Office365認証失敗した,
  Google連携がされていない, Google連携成功した, Google連携失敗した,
  Drive共有がされていない, Drive共有成功した, Drive共有失敗した,
 } from './redux/actions'

const db = firebase.firestore()

const App = props => {
  useEffect(() => {
    props.ログインをチェックする()
  })

  return (
    <div className="container is-fluid">
      <Office365Auth />
      <GoogleAuth />
      <JoinDrive />
    </div>
  )
}

const mapStateToProps = state => ({
  // ユニークID: state.ユニークID,
  // 表示名: state.表示名,
})

const mapDispatchToProps = dispatch => ({
  ログインをチェックする() {
    firebase.auth().getRedirectResult().catch(e => {
      console.error('getRedirectResult', e)
      dispatch(Office365認証失敗した(e.message))
    })

    firebase.auth().onAuthStateChanged(async userState => {
      let authorized = false

      const office365Data = null || (userState && userState.providerData.filter(prov => prov.providerId === 'microsoft.com')[0])
      if (office365Data) {
        dispatch(Office365認証成功した(office365Data.email))
        authorized = true
      } else {
        dispatch(Office365認証がされていない())
      }

      const googleData = null || (userState && userState.providerData.filter(prov => prov.providerId === 'google.com')[0])
      if (googleData) {
        dispatch(Google連携成功した(googleData.email))
        authorized = true
      } else {
        dispatch(Google連携がされていない())
      }

      if (!authorized) {
        dispatch(Drive共有がされていない())
        return
      }

      db.doc(`users/${userState.uid}`).onSnapshot(userStore => {
        if (userStore.exists) {
          const userData = userStore.data()
          dispatch(Drive共有成功した(userData))
        } else {
          dispatch(Drive共有がされていない())
        }
      })
    }, e => {
      console.error('onAuthStateChanged', e)
      dispatch(Office365認証失敗した(e.message))
    })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
