import React, { useState, useEffect, useRef } from 'react'
import classes from './Home.module.scss'
import Page from '../components/Page'
// import Link from '@material-ui/core/Link'
import { JsCanvas } from './canvas-js'
// import { root2 } from './root'
import http from '../util/http'
import config from '../config'
import { add } from '../core'

console.log('add', add(1, 2))

function Example(props) {
    const { root } = props

    let newRoot = JSON.parse(JSON.stringify(root))



    let myRef = React.createRef()
    const prevCountRef = useRef()

    const [src, setSrc] = useState('')
    const [time, setTime] = useState({})

    function test() {
        console.log('newRoot', newRoot)
        http.post('/service', {
            root,
        })
          .then(function (response) {
            console.log(response)
            let imgUrl = `${config.apiDomain}/files/${response.data.key}`
            console.log('imgUrl', imgUrl)
            setSrc(imgUrl)
            // setSrc('123')
            
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    useEffect(() => {
        let canvas = myRef.current
        // console.log('canvas', myRef)
        let options = {
            debug: true,
        }
        let canvas0 = new JsCanvas(canvas, options)
        canvas0.render(newRoot).then(ret => {
            setTime(ret)
        })
        

        // test() 
    }, [])

    

    let json = ''
    try {
        json = JSON.stringify(root, null, 4)
    } catch {

    }

    const timeText = JSON.stringify(time)
    return (
        <div className={classes.example}>
            <div className={classes.content}>
                <div className={classes.codeBox}>
                    <code className={classes.code}><pre>{json}</pre></code>
                </div>
                <div className={classes.preview}>
                    <canvas ref={myRef}></canvas>
                </div>
            </div>
            <button onClick={test}>服务端渲染测试</button>
            <div>{timeText}</div>
            {!!src &&
                <div>
                    <img className={classes.img} src={src} />
                </div>
            }
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
                        <p>JSON UI 是一套用 JSON 描述 UI 的解决方案。设计这套解决方案的目的是：
                        </p>
                        <ul>
                            <li>提供一个静态 UI 描述标准。</li>
                            <li>一套代码，多端渲染（目前仅支持前端，NodeJs，近期会支持小程序和 SVG），可以根据业务选择不同的渲染方式。</li>
                            <li>支持多种布局方式，告别绝对布局，轻松设计界面。</li>

                            <li>为不同的 UI 设计语言和工具提供一个中间层转换工具，便于相互转换。</li>
                        </ul>
                        <p>目前版本是 v0.0.1。</p>

                        <h2>示例</h2>
                        <p>使用的单位是 px。</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            children: [
                                {
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                }
                            ]
                        }} />

                        <p>width 和 height</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            // padding: 20,
                            children: [
                                {
                                    width: 200,
                                    height: 100,
                                    color: '#fff',
                                    // margin: 20,
                                }
                            ]
                        }} />

                      

                        <p>image</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#fff',
                            padding: 16,
                            children: [
                                {
                                    type: 'image',
                                    url: 'https://icons.yunser.com/icons/text.svg',
                                    width: 100,
                                    height: 100,
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

