import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import cx from "classnames"

import firebase from 'firebase/app'
import 'firebase/auth'

import { Office365認証を表示する, Office365認証する, 認証待機する, 認証成功した, 認証失敗した } from '../redux/actions'
import { Button } from 'react-bulma-components/dist'

const Office365Auth = props => {
  useEffect(() => {
    props.ログインをチェックする()
  })
  return (
    <section className="card">
      <div className="card-header">

        <div className="card-header-title">
          学校のOffice365アカウントを認証
        </div>
      </div>

      <div className={cx(
        'card-content',
      )}>
      {
        props.表示 === '初期読み込み中'
        ?
        <>
          <div>
            お待ちください
          </div>
          <div>
            <Button className="is-loading">
              Office365アカウントを認証
            </Button>
          </div>
        </>
        :
        props.表示 === '認証要求' || props.表示 === 'リダイレクト中' || props.表示 === '失敗'
        ?
        <>
          <div>
            認証されていません
          </div>
          <div>
            <Button
              className={cx(
                props.表示 === 'リダイレクト中' && 'is-loading',
                'is-primary'
              )}
              onClick={ props.ログインする }
            >
              Office365アカウントを認証
            </Button>
          </div>
          { props.表示 === '失敗' ?
            <div>
              認証に失敗しました。エラー: { props.認証失敗のメッセージ }
            </div>
            : <></>
          }
        </>
        :
        <>
          <div>
          { props.office365のメール } として認証されました
          </div>
          <div>
            <Button onClick={ props.ログアウトする }>
              ログアウトする
            </Button>
          </div>
        </>
      }
      </div>

    </section>
  )
}

const mapStateToProps = state => {
  console.log('state', state)
  return {
    表示: state.office365Auth.office365表示,
    office365のメール: state.office365Auth.office365のメール,
    認証失敗のメッセージ: state.office365Auth.認証失敗のメッセージ,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    ログインをチェックする() {

      firebase.auth().getRedirectResult().then(result => {
        console.log(result)
      }).catch(e => {
        console.error('getRedirectResult', e)
        dispatch(認証失敗した(e.message))
      })

      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          dispatch(Office365認証を表示する())
          console.log('unauthorized')
          return
        }

        console.log('authorized',user.email)
        dispatch(認証成功した(user))
      }, e => {
        console.error('onAuthStateChanged', e)
        dispatch(認証失敗した(e.message))
      })
    },

    ログインする() {
      dispatch(Office365認証する())
    },

    ログアウトする() {
      firebase.auth().signOut()
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Office365Auth)
