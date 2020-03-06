import React from 'react'
import { connect } from 'react-redux'

import cx from "classnames"

import firebase from 'firebase/app'
import 'firebase/auth'

import { Office365認証する } from '../redux/actions'
import { Button } from 'react-bulma-components/dist'

const Office365Auth = props => {
  return (
    <section className="card">
      <div className="card-header">

        <div className="card-header-title">
          ステップ1. 学校のOffice365アカウントを認証
        </div>
      </div>

      <div className="card-content">
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
            学校のアカウントのみ使用できます
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
          { props.表示 === '失敗' &&
            <div>
              認証に失敗しました。エラー: { props.認証失敗のメッセージ }
            </div>
          }
        </>
        :
        <>
          <div>
            認証済み: { props.office365のメール }
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

const mapStateToProps = state => ({
  表示: state.office365Auth.表示,
  office365のメール: state.office365Auth.メール,
  認証失敗のメッセージ: state.office365Auth.認証失敗のメッセージ,
})

const mapDispatchToProps = (dispatch, props) => ({
  ログインする() {
    dispatch(Office365認証する())
  },

  ログアウトする() {
    firebase.auth().signOut()
  },
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Office365Auth)
