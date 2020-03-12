import React, { useEffect, useRef } from 'react'
import classes from './Debug.module.scss'
import classnames from 'classnames'
import _ from 'lodash'
import Page from '../components/Page'
import { JsCanvas } from './canvas-js'
// import { hello } from '@yunser/hello'


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

        const root = {
            "width": 400,
            "height": 400,
            "color": "#598cee",
            "children": [
                {
                    "width": 100,
                    "height": 100,
                    "color": "#fff",
                    "borderRadius": 24,
                    "border": {
                        "color": "#000",
                        "width": 2,
                        "dash": [
                            8,
                            8
                        ]
                    }
                }
            ]
        }

        return (
            <Page title="空页面">
                <div className={classes.container}>
                    {/* <div className={classes.box}>
                        <div className={classes.text}>这是一段长长的文本这是一段长长的文本</div>
                    </div> */}
                    <div class="common-container container">
                        1334
                    </div>
                </div>
            </Page>
        )
    }
}

