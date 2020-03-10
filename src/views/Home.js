import React, { useEffect, useRef } from 'react'
import Button from '@material-ui/core/Button'
import classes from './Home.module.scss'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import classnames from 'classnames'
import _ from 'lodash'
import Page from '../components/Page'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
// import Link from '@material-ui/core/Link'
import { CanvasX } from './canvas'
// import { root2 } from './root'

function Example(props) {
    const { root } = props

    let myRef = React.createRef()
    const prevCountRef = useRef()

    useEffect(() => {
        let canvas = myRef.current
        // console.log('canvas', myRef)
        let options = {
            // debug: true,
        }
        let canvas0 = new CanvasX(canvas, options)
        canvas0.render(root)
        
    }, [])

    return (
        <div className={classes.example}>
            <code className={classes.code}><pre>{JSON.stringify(root, null, 4)}
            </pre></code>

            <view className={classes.preview}>
                <canvas ref={myRef}></canvas>
            </view>

        </div>
    )
}

export default class Home extends React.Component {
    state = {
        text: `1
22
World   
This is Cat`,
        result: '',
        formData: {
            prefix: '123',
            suffix: 'aaa',
        },
    }
    render() {
        const setState = data => {
            this.setState(data)
        }
        const { history } = this.props
        let state = this.state

        const { text, result, formData, rules, allRules, activeRule, addDialogVisible } = state

        return (
            <Page title="JSON UI" menu={[
                // {
                //     label: '重置',
                //     click() {
                //         setState({
                //             // count: 0,
                //             // count2: 0,
                //             // teamNameA: 'A',
                //             // teamNameB: 'B',
                //         })
                //     }
                // },
            ]}>
                <div className={classes.container}>
                    <article className="ui-article">
                        <h2>简介</h2>
                        <p>JSON UI 是一套用 JSON 描述 UI 的解决方案。设计这套解决方案的目的是，提供一个 UI 描述标准，
                            为不同的 UI 设计语言和工具提供一个中间层转换工具，便于相互转换。
                        </p>
                        <p>目前版本是 v0.0.1。</p>

                        <h2>示例</h2>
                        <Example root={{
            x: 0,
            y: 0,
            width: 300,
            height: 300,
            color: '#598cee',
            children: [
                {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100,
                    color: '#f00',
                }
            ]
        }} />

                        <p>width 和 height</p>

<Example root={{
            x: 0,
            y: 0,
            width: 300,
            height: 300,
            color: '#598cee',
            children: [
                {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100,
                    color: '#f00',
                }
            ]
        }} />
                        
                    </article>
                    <div class="common-container container">
                    </div>
                </div>
            </Page>
        )
    }
}

