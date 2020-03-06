import React from 'react'
import { connect } from 'react-redux'

import cx from "classnames"

import firebase from 'firebase/app'
import 'firebase/auth'

import { Google連携する } from '../redux/actions'
import { Button } from 'react-bulma-components/dist'

const GoogleAuth = props => {
    return (
      <section className="card">
        <div className="card-header">

          <div className="card-header-title">
            ステップ2. Googleアカウントを連携
          </div>
        </div>

        {　(props.学校認証完了 || props.表示 === '読み込み中') && 

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
                  Googleアカウントを連携
                </Button>
              </div>
            </>
            :
            props.表示 === '認証要求' || props.表示 === 'リダイレクト中' || props.表示 === '失敗'
            ?
            <>
              <div>
                Googleドライブのフォルダに招待されます
              </div>
              <div>
                <Button
                  className={cx(
                    props.表示 === 'リダイレクト中' && 'is-loading',
                    'is-primary'
                  )}
                  onClick={ props.ログインする }
                >
                  Googleアカウントを連携
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
                認証済み: { props.メール }
              </div>
              <div>
                <Button onClick={ props.ログアウトする }>
                  ログアウトする
                </Button>
              </div>
            </>
          }
          </div>
        }
      </section>
    )
  }
  
const mapStateToProps = state => ({
  学校認証完了: state.office365Auth.表示 === '完了',
  表示: state.googleAuth.表示,
  メール: state.googleAuth.メール,
  認証失敗のメッセージ: state.googleAuth.認証失敗のメッセージ,
})

const mapDispatchToProps = (dispatch, props) => {
  return {
    ログインする() {
      dispatch(Google連携する())
    },

    ログアウトする() {
      firebase.auth().signOut()
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoogleAuth)
