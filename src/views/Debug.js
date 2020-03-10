import React, { useEffect, useRef } from 'react'
import classes from './Debug.module.scss'
import classnames from 'classnames'
import _ from 'lodash'
import Page from '../components/Page'
import { CanvasX } from './canvas'

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
                    <div className={classes.box}>
                        <div className={classes.text}>这是一段长长的文本这是一段长长的文本</div>
                    </div>
                    <div class="common-container container">
                        <Example root={{
                            x: 0,
                            y: 0,
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 20,
                            debug: true,
                            layout: 'grid',
                            gridSize: 4,
                            gridHeight: 100,
                            grid: {
                                gutterX: 8,
                                gutterY: 8,
                            },
                            children: [
                                {
                                    color: '#fff',
                                    debug: true,
                                },
                                {
                                    color: '#fff',
                                    debug: true,
                                },
                                {
                                    color: '#fff',
                                    debug: true,
                                },
                                {
                                    color: '#fff',
                                    debug: true,
                                },
                                {
                                    color: '#fff',
                                    debug: true,
                                },
                                // {
                                //     width: 100,
                                //     height: 100,
                                //     color: '#fff',
                                // }
                            ]
                        }} />
                    </div>
                </div>
            </Page>
        )
    }
}

