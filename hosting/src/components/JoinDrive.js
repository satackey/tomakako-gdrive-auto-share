import React, { useState } from 'react'
import { connect } from 'react-redux'

import cx from "classnames"
import { Button } from 'react-bulma-components/dist'

import { Drive共有に参加する, Drive共有から脱退する } from '../redux/actions'

const JoinDrive = props => {
  const [二次配布禁止に同意, set二次配布禁止に同意] = useState(false)
  const [自己責任を理解, set自己責任を理解] = useState(false)
  const [協力に同意, set協力に同意] = useState(false)
  const 参加準備完了か = props.参加認証完了 && 二次配布禁止に同意 && 自己責任を理解 && 協力に同意
  const チェックボックス無効か = props.表示 === '参加処理中'
  return (
    <section className="card">
      <div className="card-header">
        <div className="card-header-title">
          ステップ3. Googleドライブの共有フォルダに参加
        </div>
      </div>

      { (props.参加認証完了 || props.表示 === '読み込み中') &&
      <div className='card-content'>
        { props.表示 === '初期読み込み中' && <>
          <Button
            className="is-loading"
            onClick={ props.参加する }
          >
            Google Drive共有に参加
          </Button>
        </>}

        { props.参加認証完了 && (props.表示 === '参加要求' || props.表示 === '参加処理中') && <>
          <p>
            提供しているコンテンツの二次配布は禁止しております。<br />
            また、コンテンツを利用してのいかなる障害・損害において一切責任を負いません。<br />
            自己責任の上、ご利用お願いします。
          </p>

          <p>
            <input type="checkbox"
              className="is-checkradio"
              checked={二次配布禁止に同意}
              disabled={チェックボックス無効か}
              onChange={ () => set二次配布禁止に同意(!二次配布禁止に同意) }
            />
            <label>
              コンテンツの二次配布を行いません
            </label>
          </p>

          <p>
            <input type="checkbox"
              className="is-checkradio"
              checked={自己責任を理解}
              disabled={チェックボックス無効か}
              onChange={ () => set自己責任を理解(!自己責任を理解) }
            />
            <label>
              画像及びファイルを利用は自己責任であることを理解しました
            </label>
          </p>
          <br />
          <p>
            こちらで提供しているコンテンツは有志による取り組みによって成り立っています。
          </p>

          <p>
            <input type="checkbox"
              className="is-checkradio"
              checked={協力に同意}
              disabled={チェックボックス無効か}
              onChange={ () => set協力に同意(!協力に同意) }
            />
            <label>
              コンテンツの提出・管理などの取り組みに協力します
            </label>
          </p>

          <Button
            className={cx(
              props.表示 === '参加処理中' && 'is-loading',
              参加準備完了か && 'is-primary',
            )}

            disabled={ !参加準備完了か || チェックボックス無効か }
            onClick={ props.参加する }
          >
            Googleドライブ共有に参加
          </Button>
        </>}

        { props.表示 === '失敗' &&
          <div>
            参加に失敗しました。エラー: { props.認証失敗のメッセージ }
          </div>
        }


        { (props.表示 === '完了' || props.表示 === '脱退処理中') && <>
          <div>
            参加が完了しました
          </div>
          <a href={`https://drive.google.com/drive/folders/${props.ドライブID}`}>
            <Button className="is-primary">
              Googleドライブをみる
            </Button>
          </a>
          <p>
            <Button className={
              cx(
                props.表示 === '脱退処理中' && 'is-loading',
                'is-danger',
                'is-outlined',
              )}
              onClick={ props.脱退する }>
              参加をやめる (脱退)
            </Button>
          </p>
        </>}

        { props.表示 === '脱退失敗' &&
          <div>
            脱退に失敗しました。エラー: { props.脱退失敗のメッセージ }
          </div>
        }

      </div>
      }

    </section>
  )
}

const mapStateToProps = state => ({
  表示: state.joinDrive.表示,
  参加認証完了: state.office365Auth.表示 === '完了' && state.googleAuth.表示 === '完了',
  送信されたメール: state.joinDrive.送信されたメール,
  ドライブID: state.joinDrive.ドライブID,
  認証失敗のメッセージ: state.joinDrive.認証失敗のメッセージ,
  脱退失敗のメッセージ: state.joinDrive.脱退失敗のメッセージ,
})

const mapDispatchToProps = dispatch => ({
  参加する() {
    dispatch(Drive共有に参加する())
  },
  脱退する() {
    dispatch(Drive共有から脱退する())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JoinDrive)
