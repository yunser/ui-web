import React, { useState, useEffect, useRef } from 'react'
import classes from './Home.module.scss'
import Page from '../components/Page'
// import Link from '@material-ui/core/Link'
import { JsCanvas } from './canvas-js'
// import { root2 } from './root'
import http from '../util/http'
import config from '../config'

function Example(props) {
    const { root } = props

    let newRoot = JSON.parse(JSON.stringify(root))



    let myRef = React.createRef()
    const prevCountRef = useRef()

    const [src, setSrc] = useState('')

    function test() {
        console.log('newRoot', newRoot)
        http.post('/service', root)
          .then(function (response) {
            console.log(response)
            setSrc(`${config.apiDomain}/files/${response.data}`)
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
        canvas0.render(newRoot)

        test()
    }, [])

    

    let json = ''
    try {
        json = JSON.stringify(root, null, 4)
    } catch {

    }

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
            <button onClick={test}>测试</button>
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
                        <p>JSON UI 是一套用 JSON 描述 UI 的解决方案。设计这套解决方案的目的是，提供一个 UI 描述标准，
                            为不同的 UI 设计语言和工具提供一个中间层转换工具，便于相互转换。
                        </p>
                        <p>目前版本是 v0.0.1。</p>

                        <h2>示例</h2>
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

                        <p>颜色</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            children: [
                                {
                                    width: 100,
                                    height: 100,
                                    color: '#f00',
                                },
                                {
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                },
                                {
                                    width: 100,
                                    height: 100,
                                    color: 'rgba(255, 255, 255, .3)',
                                }
                            ]
                        }} />

                        <p>borderRadius</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            children: [
                                {
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    borderRadius: 24,
                                }
                            ]
                        }} />

                        <p>border</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            children: [
                                {
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    borderRadius: 24,
                                    border: {
                                        color: '#000',
                                        width: 2,
                                    }
                                }
                            ]
                        }} />

                        <p>默认布局：</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 20,
                            debug: true,
                            children: [
                                {
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    margin: 20,
                                    padding: 20,
                                    debug: true,
                                },
                                {
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    margin: 20,
                                    padding: 20,
                                    debug: true,
                                }
                            ]
                        }} />

                        <p>横向布局：</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 20,
                            debug: true,
                            layout: 'x',
                            children: [
                                {
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    margin: 20,
                                    padding: 20,
                                    debug: true,
                                },
                                {
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    margin: 20,
                                    padding: 20,
                                    debug: true,
                                }
                            ]
                        }} />

                        <p>相对父元素布局：</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            // layout: 'x',
                            // strong: '#f00',
                            children: [
                                {
                                    relative: 'parent',
                                    top: 0,
                                    left: 0,
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    children: [
                                        {
                                            type: 'text',
                                            text: 'left top',
                                            color: '#000',
                                            textSize: 16
                                        }
                                    ]
                                },
                                {
                                    relative: 'parent',
                                    top: 0,
                                    right: 0,
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    children: [
                                        {
                                            type: 'text',
                                            text: 'right top',
                                            color: '#000',
                                            textSize: 16
                                        }
                                    ]
                                },
                                {
                                    relative: 'parent',
                                    bottom: 0,
                                    left: 0,
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    children: [
                                        {
                                            type: 'text',
                                            text: 'left bottom',
                                            color: '#000',
                                            textSize: 16
                                        }
                                    ]
                                },
                                {
                                    relative: 'parent',
                                    bottom: 0,
                                    right: 0,
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    children: [
                                        {
                                            type: 'text',
                                            text: 'right bottom',
                                            color: '#000',
                                            textSize: 16
                                        }
                                    ]
                                },
                                {
                                    relative: 'parent',
                                    x: 'center',
                                    y: 'center',
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    children: [
                                        {
                                            type: 'text',
                                            text: 'center center',
                                            color: '#000',
                                            textSize: 16
                                        }
                                    ]
                                },
                                {
                                    relative: 'parent',
                                    left: 0,
                                    y: 'center',
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    children: [
                                        {
                                            type: 'text',
                                            text: 'left center',
                                            color: '#000',
                                            textSize: 16
                                        }
                                    ]
                                },
                                {
                                    relative: 'parent',
                                    right: 0,
                                    y: 'center',
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    children: [
                                        {
                                            type: 'text',
                                            text: 'right center',
                                            color: '#000',
                                            textSize: 16
                                        }
                                    ]
                                },
                                {
                                    relative: 'parent',
                                    x: 'center',
                                    top: 0,
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    children: [
                                        {
                                            type: 'text',
                                            text: 'center top',
                                            color: '#000',
                                            textSize: 16
                                        }
                                    ]
                                },
                                {
                                    relative: 'parent',
                                    x: 'center',
                                    bottom: 0,
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    children: [
                                        {
                                            type: 'text',
                                            text: 'center bottom',
                                            color: '#000',
                                            textSize: 16
                                        }
                                    ]
                                },
                            ]
                        }} />

                        <p>网格布局：</p>
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

                        <p>padding：</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 16,
                            children: [
                                {
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                }
                            ]
                        }} />

                        <p>margin：</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 16,
                            children: [
                                {
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    marginBottom: 16,
                                },
                                {
                                    width: 100,
                                    height: 100,
                                    color: '#999',
                                }
                            ]
                        }} />

                        <p>box：</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 16,
                            children: [
                                {
                                    padding: 16,
                                    margin: 16,
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    debug: true,
                                },
                            ]
                        }} />

                        <p>minWidth and minHeight：</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 16,
                            children: [
                                {
                                    width: 100,
                                    height: 100,
                                    minWidth: 200,
                                    minHeight: 200,
                                    color: '#fff',
                                }
                            ]
                        }} />

                        <p>maxWidth and maxHeight：</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 16,
                            children: [
                                {
                                    width: 200,
                                    height: 200,
                                    maxWidth: 100,
                                    maxHeight: 100,
                                    color: '#fff',
                                }
                            ]
                        }} />

                        <p>文本</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#fff',
                            padding: 16,
                            children: [
                                {
                                    type: 'text',
                                    text: 'JSON-UI',
                                    textColor: '#000',
                                    textSize: 24,
                                }
                            ]
                        }} />

                        <p>text align</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 16,
                            children: [
                                {
                                    type: 'text',
                                    text: 'JSON-UI',
                                    textColor: '#fff',
                                    textSize: 24,
                                    width: 200,
                                    // strong: '#000',
                                    textAlign: 'left',
                                    debug: true,
                                },
                                {
                                    type: 'text',
                                    text: 'JSON-UI',
                                    textColor: '#fff',
                                    textSize: 24,
                                    width: 200,
                                    debug: true,
                                    textAlign: 'center',
                                },
                                {
                                    type: 'text',
                                    text: 'JSON-UI',
                                    textColor: '#fff',
                                    textSize: 24,
                                    width: 200,
                                    debug: true,
                                    textAlign: 'right',
                                },
                            ]
                        }} />

                        <p>font weight</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 16,
                            children: [
                                {
                                    type: 'text',
                                    text: 'JSON-UI',
                                    textColor: '#fff',
                                    textSize: 24,
                                    width: 200,
                                    // strong: '#000',
                                    textAlign: 'left',
                                    debug: true,
                                },
                                {
                                    type: 'text',
                                    text: 'JSON-UI',
                                    textColor: '#fff',
                                    textSize: 24,
                                    width: 200,
                                    debug: true,
                                    fontWeight: 'bolder',
                                },
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

                        <p>visible</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            // padding: 20,
                            children: [
                                {
                                    visible: false,
                                    width: 200,
                                    height: 100,
                                    color: '#fff',
                                    debug: true,
                                    // margin: 20,
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

