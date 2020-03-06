import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import firebase from 'firebase/app'
import 'firebase/auth'

import './App.css'

import Office365Auth from './components/Office365Auth'
import { Office365認証がされていない, Office365認証成功した, Office365認証失敗した } from './redux/actions'
import GoogleAuth from './components/GoogleAuth'
import { Google連携がされていない, Google連携成功した, Google連携失敗した } from './redux/actions'
import JoinDrive from './components/JoinDrive'

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
    console.log('ログインチェック!!!')
    firebase.auth().getRedirectResult().catch(e => {
      console.error('getRedirectResult', e)
      dispatch(Office365認証失敗した(e.message))
    })

    firebase.auth().onAuthStateChanged(user => {
      // if (!user) {
      //   console.log('unauthorized')
      //   return
      // }

      let authorized = false

      const office365Data = null || (user && user.providerData.filter(prov => prov.providerId === 'microsoft.com')[0])
      if (office365Data) {
        dispatch(Office365認証成功した(office365Data.email))
        authorized = true
      } else {
        dispatch(Office365認証がされていない())
      }

      const googleData = null || (user && user.providerData.filter(prov => prov.providerId === 'google.com')[0])
      if (googleData) {
        dispatch(Google連携成功した(googleData.email))
        authorized = true
      } else {
        dispatch(Google連携がされていない())
      }

      // dispatch(())
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
