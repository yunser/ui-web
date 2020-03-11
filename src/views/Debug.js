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

        return (
            <Page title="调试">
                <div className={classes.container}>
                    {/* <div className={classes.box}>
                        <div className={classes.text}>这是一段长长的文本这是一段长长的文本</div>
                    </div> */}
                    <div class="common-container container">
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#f00',
                            children: [
                                {
                                    width: 100,
                                    // height: 200,
                                    color: '#fff',
                                    strong: '#fff',
                                    children: [
                                        {
                                            width: 100,
                                            height: 100,
                                            color: '#333',
                                        },
                                        {
                                            width: 100,
                                            height: 100,
                                            color: '#666',
                                        },
                                        {
                                            relative: 'parent',
                                            top: 0,
                                            left: 0,
                                            width: 16,
                                            height: 16,
                                            color: '#09c',
                                        },
                                        {
                                            relative: 'parent',
                                            right: 0,
                                            bottom: 0,
                                            width: 16,
                                            height: 16,
                                            color: '#09c',
                                        },
                                        // {
                                        //     relative: 'parent',
                                        //     left: 300,
                                        //     top: 0,
                                        //     width: 16,
                                        //     height: 16,
                                        //     color: '#09c',
                                        // },
                                        // {
                                        //     relative: 'parent',
                                        //     left: 200,
                                        //     top: 300,
                                        //     width: 16,
                                        //     height: 16,
                                        //     color: '#09c',
                                        // },
                                        // {
                                        //     width: 100,
                                        //     height: 100,
                                        //     color: '#999',
                                        // }
                                    ]
                                }
                            ]
                        }} />
                    </div>
                </div>
            </Page>
        )
    }
}

