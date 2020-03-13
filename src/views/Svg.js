import React, { useEffect, useRef } from 'react'
import classes from './Debug.module.scss'
import classnames from 'classnames'
import _ from 'lodash'
import Page from '../components/Page'
import { JsCanvas } from './canvas-js'
// import { hello } from '@yunser/hello'

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
        let canvas0 = new JsCanvas(canvas, options)
        canvas0.render(root)

    }, [])

    return (
        <div className={classes.example}>
            <div className={classes.codeBox}>
                <code className={classes.code}><pre>{JSON.stringify(root, null, 4)}</pre></code>
            </div>

            <div className={classes.preview}>
                <canvas ref={myRef}></canvas>
            </div>

        </div>
    )
}


export default class Home extends React.Component {
    state = {
    }

    render() {
        const setState = data => {
            this.setState(data)
        }
        const { history } = this.props
        let state = this.state

        // const { text, result, formData, rules, allRules, activeRule, addDialogVisible } = state

        let root = {
            width: 400,
            height: 400,
            color: '#598cee',
            padding: 16,
            debug: true,
            layout: 'x',
            children: [
                {
                    type: 'text',
                    text: 'JSON-UI',
                    textColor: '#fff',
                    textSize: 32,
                    debug: true,
                }
                // {
                //     type: 'text',
                //     text: 'JSON-UI',
                //     textColor: '#fff',
                //     textSize: 32,
                //     debug: true,
                //     padding: 16,
                //     margin: 16,
                //     children: [
                //         {
                //             relative: 'parent',
                //             bottom: 0,
                //             left: '100%',
                //             type: 'text',
                //             text: 'TM',
                //             textColor: '#fff',
                //             textSize: 12,
                //             marginLeft: 4,
                //         }

                //     ]
                // },
                // {
                //     // width: 100,
                //     height: 100,
                //     color: '#fff',
                //     rate: 1,
                // },
                // {
                //     // width: 100,
                //     height: 100,
                //     color: '#ccc',
                //     rate: 2,
                // },
            ]
        }

        root = {
            x: 0,
        y: 0,
        width: 750,
        // height: 1934,
        height: 1334,
        // minHeight: 1334,
        // padding: 32,
        color: '#f00',
        textColor: '#fff',
        children: [
            {
                type: 'text',
                text: '长按识别小程序码，给我鼓励',
                textSize: 16,
                strong: '#fff'
            },
        ]
        }

        return (
            <Page title="调试">
                <div className={classes.container}>
                    {/* <div className={classes.box}>
                        <div className={classes.text}>这是一段长长的文本这是一段长长的文本</div>
                    </div> */}
                    <div class="common-container container">
                        <Example root={root} />
                    </div>
                </div>
            </Page>
        )
    }
}

