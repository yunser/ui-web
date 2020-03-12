import React, { useEffect, useRef } from 'react'
import classes from './Example.module.scss'
import Page from '../components/Page'
import { JsCanvas } from './canvas-js'

import { root0 } from './root0'
import { getRoot1 } from './root1'
import { getRoot2 } from './root2'
import { getRoot3 } from './root3'
import { root9 } from './root9'

function JsonUi(props) {
    const { root } = props

    let myRef = React.createRef()
    const prevCountRef = useRef()

    useEffect(() => {
        let canvas = myRef.current
        // console.log('canvas', myRef)
        let options = {
            debug: true,
            
        }
        let canvas0 = new JsCanvas(canvas, options)
        canvas0.render(root)

    }, [])

    return (
        <div className={classes.preview}>
            <canvas className={classes.canvas} ref={myRef}></canvas>
        </div>
    )
}


export default class Home extends React.Component {
    state = {
    }

    

    render() {
        // const setState = data => {
        //     this.setState(data)
        // }
        // const { history } = this.props
        // let state = this.state

        // const { text, result, formData, rules, allRules, activeRule, addDialogVisible } = state

        // console.log(JSON.stringify(root1))


        // console.log('ROOT', JSON.stringify(getRoot2()))

        return (
            <Page title="示例">
                <div className={classes.container}>
                    <div class="common-container container">
                        <div className={classes.examples}>
                            {/* <div className={classes.item}>
                                <JsonUi root={root9} />
                            </div> */}
                            {/* <div className={classes.item}>
                                <JsonUi root={root0} />
                            </div> */}
                            {/* <div className={classes.item}>
                                <JsonUi root={getRoot1()} />
                            </div> */}
                            <div className={classes.item}>
                                <JsonUi root={getRoot2()} />
                            </div>
                            {/* <div className={classes.item}>
                                <JsonUi root={getRoot3()} />
                            </div> */}
                        </div>

                    </div>
                </div>
            </Page>
        )
    }
}

