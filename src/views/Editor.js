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
        input: `{
    "x": "0",
    "y": 0,
    "width": 400,
    "height": 400,
    "color": "#598cee"
}`,
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
                    <div class="common-container container">
                        <textarea className={classes.textarea}
                            onChange={handlerChange} value={input} ></textarea>
                        
                        <Example rootText={input} />
                    </div>
                </div>
            </Page>
        )
    }
}

