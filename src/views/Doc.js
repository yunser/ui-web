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
            setTime(response.data.renderParam)
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
            // setTime(ret)
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

        let bigNode = {
            width: 400,
            height: 400,
            color: '#f00',
            children: [
                {
                    relative: 'parent',
                    left: 0,
                    top: 0,
                    width: 100,
                    height: 100,
                    color: '#fff',
                    debug: true,
                }
            ]
        }
        let bigNode2 = {
            width: 400,
            height: 400,
            color: '#f00',
            children: [
                {
                    relative: 'parent',
                    left: 0,
                    top: 0,
                    width: 100,
                    height: 100,
                    color: '#fff',
                    debug: true,
                }
            ]
        }
        bigNode.children = []
        let size = 10
        let gridSize = 400 / size
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                bigNode.children.push({
                    relative: 'parent',
                    left: col * gridSize,
                    top: row * gridSize,
                    width: gridSize,
                    height: gridSize,
                    color: '#fff',
                    debug: true,
                })

            }
        }
        bigNode2.children = []
        size = 40
        gridSize = 400 / size
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                bigNode2.children.push({
                    relative: 'parent',
                    left: col * gridSize,
                    top: row * gridSize,
                    width: gridSize,
                    height: gridSize,
                    color: '#fff',
                    debug: true,
                })

            }
        }

        return (
            <Page title="文档" menu={[
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

                        <p>width 和 height 百分比</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            // padding: 20,
                            children: [
                                {
                                    width: '50%',
                                    height: '50%',
                                    color: '#fff',
                                    // margin: 20,
                                }
                            ]
                        }} />

                        <p>线</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            // padding: 20,
                            children: [
                                {
                                    type: 'line',
                                    x: 0,
                                    y: 0,
                                    x2: 200,
                                    y2: 200,
                                    color: '#fff',
                                }
                            ]
                        }} />

                        <p>颜色</p>
                        <p>支持 hex、rgb、rgba</p>
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
                        <p>圆角，默认 0</p>
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
                        <p>边框</p>
                        <p>border.color：边框颜色，border.width：边框宽度，默认 1，order.dash 虚线设置，默认 []</p>
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
                                        dash: [8, 8],
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

                        <p>相对布局百分比：</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            children: [
                                {
                                    relative: 'parent',
                                    left: '50%',
                                    top: '50%',
                                    width: 200,
                                    height: 200,
                                    color: '#fff',
                                },
                                {
                                    relative: 'parent',
                                    right: '50%',
                                    bottom: '50%',
                                    width: 200,
                                    height: 200,
                                    color: '#f00',
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

                        <p>box paddinng：</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 16,
                            children: [
                                {
                                    padding: [10, 20, 30, 40],
                                    // margin: 16,
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    debug: true,
                                },
                                {
                                    height: 16,
                                },
                                {
                                    // padding: 16,
                                    // margin: [10, 20, 30, 40],
                                    paddingTop: 10,
                                    paddingRight: 20,
                                    paddingBottom: 30,
                                    paddingLeft: 40,
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    debug: true,
                                },
                            ]
                        }} />

                        <p>box only margin：</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 16,
                            children: [
                                {
                                    // padding: 16,
                                    margin: [10, 20, 30, 40],
                                    width: 100,
                                    height: 100,
                                    color: '#fff',
                                    debug: true,
                                },
                                // hr
                                {
                                    height: 16,
                                },
                                {
                                    // padding: 16,
                                    // margin: [10, 20, 30, 40],
                                    marginTop: 10,
                                    marginRight: 20,
                                    marginBottom: 30,
                                    marginLeft: 40,
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
                                    debug: true,
                                }
                            ]
                        }} />

                        <p>text align</p>
                        <p>textAlign: 对齐方式，left, center, right</p>
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

<p>text align</p>
                        <p>linneHeight</p>
                        <p>行高</p>
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
                                    lineHeight: 24,
                                    debug: true,
                                },
                                {
                                    type: 'text',
                                    text: 'JSON-UI',
                                    textColor: '#fff',
                                    textSize: 24,
                                    lineHeight: 48,
                                    debug: true,
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
                                    text: 'JSON-UI-lighter',
                                    textColor: '#fff',
                                    textSize: 24,
                                    width: 200,
                                    // strong: '#000',
                                    textAlign: 'left',
                                    debug: true,
                                    fontWeight: 'lighter',
                                },
                                {
                                    type: 'text',
                                    text: 'JSON-UI-normal',
                                    textColor: '#fff',
                                    textSize: 24,
                                    width: 200,
                                    // strong: '#000',
                                    textAlign: 'left',
                                    debug: true,
                                },
                                {
                                    type: 'text',
                                    text: 'JSON-UI-bold',
                                    textColor: '#fff',
                                    textSize: 24,
                                    width: 200,
                                    debug: true,
                                    fontWeight: 'bold',
                                },
                                {
                                    type: 'text',
                                    text: 'JSON-UI-bolder',
                                    textColor: '#fff',
                                    textSize: 24,
                                    width: 200,
                                    debug: true,
                                    fontWeight: 'bolder',
                                },
                            ]
                        }} />

                        <p>font family</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#598cee',
                            padding: 16,
                            children: [
                                {
                                    type: 'text',
                                    text: 'JSON_UI',
                                    textColor: '#fff',
                                    textSize: 24,
                                    debug: true,
                                },
                                {
                                    type: 'text',
                                    text: 'JSON-UI-normal',
                                    textColor: '#fff',
                                    textSize: 24,
                                    width: 200,
                                    // strong: '#000',
                                    textAlign: 'left',
                                    debug: true,
                                },
                                {
                                    type: 'text',
                                    text: 'JSON-UI-bold',
                                    textColor: '#fff',
                                    textSize: 24,
                                    width: 200,
                                    debug: true,
                                    fontWeight: 'bold',
                                },
                                {
                                    type: 'text',
                                    text: 'JSON-UI-bolder',
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

                        <p>图片加载错误</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#fff',
                            padding: 16,
                            children: [
                                {
                                    type: 'image',
                                    url: 'https://a.com/asd',
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

                        <p>height auto</p>
                        <Example root={{
                            width: 400,
                            height: 400,
                            color: '#f00',
                            children: [
                                {
                                    relative: 'parent',
                                    left: 80,
                                    top: 80,
                                    width: 164,
                                    padding: 16,
                                    color: '#fff',
                                    debug: true,
                                    children: [
                                        {
                                            width: 100,
                                            height: 100,
                                            margin: 16,
                                            debug: true,
                                            color: '#333',
                                        },
                                        {
                                            width: 100,
                                            height: 100,
                                            margin: 16,
                                            debug: true,
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
                                    ]
                                }
                            ]
                        }} />

                        <p>性能测试（100 个节点）</p>
                        <Example root={bigNode} />

                        <p>性能测试（1600 个节点）</p>
                        <p>耗时约 5s</p>
                        <Example root={bigNode2} />

                    </article>
                    <div class="common-container container">
                    </div>
                </div>
            </Page>
        )
    }
}

