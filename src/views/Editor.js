import React, { useEffect, useRef } from 'react'
import classes from './Editor.module.scss'
import classnames from 'classnames'
import _ from 'lodash'
import Page from '../components/Page'
import { JsCanvas } from './canvas-js'

function Example(props) {
    const { rootText } = props

    let root = {}

    try {
        root = JSON.parse(rootText)
    } catch {

    }

    let myRef = React.createRef()
    const prevCountRef = useRef()

    useEffect(() => {
        let canvas = myRef.current
        // console.log('canvas', myRef)
        let options = {
            // debug: true,
            Image: window.Image,
        }
        let canvas0 = new JsCanvas(canvas, options)
        canvas0.render(root)

    })

    return (
        <div className={classes.example}>
            <div className={classes.preview}>
                <canvas ref={myRef}></canvas>
            </div>

        </div>
    )
}


export default class Home extends React.Component {

    state = {
        input: JSON.stringify({
            "x": "0",
            "y": 0,
            "width": 400,
            "height": 400,
            "color": "#598cee",
            children: [
                {
                    x: 100,
                    y: 100,
                    width: 100,
                    height:100,
                    color: '#f00',
                }
            ]
        }, null, 4),
    }

    render() {
        const setState = data => {
            this.setState(data)
        }
        const { history } = this.props
        let state = this.state

        const { input } = state

        function handlerChange(e) {
            console.log('chage', e.target.value)
            setState({
                input: e.target.value,
            })
        }

        return (
            <Page title="调试">
                <div className={classes.container}>
                    <textarea className={classes.textarea}
                        onChange={handlerChange} value={input} ></textarea>
                    
                    <Example rootText={input} />
                    {/* <div class="common-container container">
                    </div> */}
                </div>
            </Page>
        )
    }
}

