import React, { useState } from 'react'
import { connect } from 'react-redux'

import cx from "classnames"

import { Button } from 'react-bulma-components/dist'

const JoinDrive = props => {
  const [二次配布禁止に同意, set二次配布禁止に同意] = useState(false)
  const [自己責任を理解, set自己責任を理解] = useState(false)
  const [協力に同意, set協力に同意] = useState(false)
  const 参加準備完了か = props.参加認証完了 && 二次配布禁止に同意 && 自己責任を理解 && 協力に同意

  return (
    <section className="card">
      <div className="card-header">
        <div className="card-header-title">
          ステップ3. Googleドライブの共有フォルダに参加
        </div>
      </div>

      { props.参加認証完了 &&
        
      <div className='card-content'>
        <p>
          提供しているコンテンツの二次配布は禁止しております。<br />
          また、コンテンツを利用してのいかなる障害・損害において一切責任を負いません。<br />
          自己責任の上、ご利用お願いします。
        </p>

        <p>
          <input type="checkbox"
            className="is-checkradio"
            checked={二次配布禁止に同意}
            onChange={e => {console.log(e);set二次配布禁止に同意(!二次配布禁止に同意)}}
          />
          <label>
            コンテンツの二次配布を行いません
          </label>
        </p>

        <p>
          <input type="checkbox"
            className="is-checkradio"
            checked={自己責任を理解}
            onChange={() => set自己責任を理解(!自己責任を理解)}
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
            onChange={() => set協力に同意(!協力に同意)}
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

          disabled={ !参加準備完了か }
          onClick={ props.参加する }
        >
          Google Drive共有に参加
        </Button>

      </div>

      }
    </section>
  )
}

const mapStateToProps = state => ({
  参加認証完了: state.office365Auth.表示 === '完了' && state.googleAuth.表示 === '完了',

})

const mapDispatchToProps = dispatch => ({
  参加する() {

  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JoinDrive)