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

function textLoop(indent, num) {
    let result = ''
    for (let i = 0; i < num; i++) {
        result += indent
    }
    return result
}


function nodeHandler(svgObj, options = {}) {

    const { indent = '    ' } = options

    function dealList(children, level) {
        let content = ''
        for (let child of children) {
            content += (indent ? ('\n' + textLoop(indent, level)) : '') + dealObj(child, level)
        }
        content += (indent ? (textLoop(indent, level) + '\n') : '')
        return content
    }

    function dealObj(obj, level = 0) {
        let _type = obj.type
        let _attr = obj

        if (!_type) {
            if (level == 0) {
                _type = 'svg'
            } else {
                _type = 'rect'
            }
        }
        let childrenContent = ''
        if (obj.children && obj.children.length) {
            childrenContent = dealList(obj.children, level + 1)
        }

        let attrContent = ''
        if (_attr) {
            for (let key in _attr) {
                attrContent += ` ${key}="${_attr[key]}"`
            }
        }

        return `<${_type}${attrContent}>${childrenContent}</${_type}>`
    }

    return dealObj(svgObj, 0)
}

function getSvgFromRoot(_root) {
    const asd = nodeHandler(_root)
    console.log('asd', asd)

    let svgContent = `<p>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="#09c" />
</svg>
 
    </p>`

    return svgContent
}

function Example(props) {
    const { root } = props

    let newRoot = JSON.parse(JSON.stringify(root))




    let myRef = React.createRef()
    const prevCountRef = useRef()

    const [src, setSrc] = useState('')
    const [time, setTime] = useState({})

    const [ svgHtml, setSvgHtml ] = useState('')

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
        async function render() {
            let canvas = myRef.current
            if (canvas) {
                // console.log('canvas', myRef)
                let options = {
                    debug: true,
                }
                let canvas0 = new JsCanvas(canvas, options)
                await canvas0.render(newRoot)
                console.log('canvas0._root', canvas0._root)
                setSvgHtml(getSvgFromRoot(canvas0._root))
            }
        }
        render()
        // test() 
    }, [])

    

    let json = ''
    try {
        json = JSON.stringify(root, null, 4)
    } catch {

    }

//     const svgHtml = `<p>
//     <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
//   <circle cx="100" cy="50" r="40" stroke="black"
//   stroke-width="2" fill="red" />
// </svg>
 
//     </p>`

    const timeText = JSON.stringify(time)

    return (
        <div className={classes.example}>
            <div className={classes.content}>
                <div className={classes.codeBox}>
                    <code className={classes.code}><pre>{json}</pre></code>
                </div>
                {/* <div className={classes.svgBox}>
                    <div dangerouslySetInnerHTML={{__html: svgHtml}}></div>
                </div> */}
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


        const stdUi = {
            "_type": "root",
            "width": 500,
            "height": 400,
            "color": "#E6E6FB",
            // "color": null,
            "children": [
                {
                    "_type": "rect",
                    "x": 100,
                    "y": 100,
                    "width": 100,
                    "height": 100,
                    "color": null,
                    // "color": "#f00",
                    border: {
                        color: '#526BFF',
                        width: 20,
                    }
                },
                {
                    "_type": "circle",
                    "cx": 250,
                    "cy": 150,
                    "radius": 50,
                    // "color": "#09c",
                    "color": null,
                    fill: {
                        type: 'linearGradient',
                        direction: 'bottom',
                        colors: ['#09c', '#c90'],
                    },
                    gradient: {
                        from: '#09c',
                        to: '#c90',
                    },
                    border: {
                        color: '#526BFF',
                        width: 4,
                    }
                },
                {
                    "_type": "line",
                    "x1": 100,
                    "y1": 200,
                    "x2": 200,
                    "y2": 300,
                    // color: '#f00',
                    border: {
                        color: '#526BFF',
                        width: 4,
                    },
                },
                {
                    "_type": "text",
                    "x": 100,
                    "y": 0,
                    "text": "你好",
                    "textSize": 100,
                    color: '#f00',
                    // "color": null,
                    border: {
                        color: '#526BFF',
                        width: 4,
                    },
                    fill: {
                        type: 'linearGradient',
                        direction: 'bottom',
                        colors: ['#09c', '#c90'],
                    },
                },
                {
                    "_type": "polygon",
                    points: [
                        {
                            x: 50,
                            y: 100,
                        },
                        {
                            x: 0,
                            y: 200,
                        },
                        {
                            x: 100,
                            y: 200,
                        },
                    ],
                    color: '#E56D6D',
                    border: {
                        color: '#526BFF',
                        width: 4,
                    },
                    fill: {
                        type: 'linearGradient',
                        direction: 'bottom',
                        colors: ['#09c', '#c90'],
                    },
                },
                {
                    _type: 'polyline',
                    points: [
                        {
                            x: 0,
                            y: 100,
                        },
                        {
                            x: 50,
                            y: 0,
                        },
                        {
                            x: 100,
                            y: 100,
                        },
                    ],
                    border: {
                        color: '#526BFF',
                        width: 4,
                    },
                },
                {
                    "_type": "group",
                    children: [
                        {
                            "_type": "ellipse",
                            cx: 50,
                            cy: 250,
                            rx: 50,
                            ry: 25,
                            color: '#E56D6D',
                            border: {
                                color: '#526BFF',
                                width: 4,
                            },
                            fill: {
                                type: 'linearGradient',
                                direction: 'bottom',
                                colors: ['#09c', '#c90'],
                            },
                            opacity: 0.5,
                            shadow: {
                                x: 5,
                                y: 5,
                                blur: 10,
                                alpha: 0.2,
                            },
                        },
                        {
                            "_type": "path",
                            d: 'M200,200.490196 L199.509804,300 C212.323108,269.060446 229.153174,253.590669 250,253.590669 C270.846826,253.590669 287.513493,268.897047 300,299.509804 L300,200 L200,200.490196 Z',
                            color: '#E56D6D',
                            border: {
                                color: '#526BFF',
                                width: 4,
                            },
                            fill: {
                                type: 'linearGradient',
                                direction: 'bottom',
                                colors: ['#09c', '#c90'],
                            },
                        },
                    ],
                },
                {
                    _type: 'image',
                    x: 300,
                    y: 0,
                    width: 100,
                    height: 100,
                    originWidth: 200,
                    originHeight: 200,
                    // href: "data:image/png;base64,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",
                    // url: "https://icons.yunser.com/icons/text.svg",
                    url: "https://webcdn.yunser.com/@ui/in.png",
                    border: {
                        color: '#526BFF',
                        width: 4,
                    },
                    borderRadius: 16,
                },
                {
                    "_type": "rect",
                    "x": 300,
                    "y": 100,
                    "width": 100,
                    "height": 100,
                    // "color": null,
                    "color": "#09c",
                    // border: {
                    //     color: '#526BFF',
                    //     width: 4,
                    // }
                    fill: {
                        type: 'linearGradient',
                        direction: 'bottom',
                        colors: ['#09c', '#c90'],
                    },
                },
                {
                    "_type": "rect",
                    "x": 300,
                    "y": 200,
                    "width": 100,
                    "height": 100,
                    // "color": null,
                    "color": "#f00",
                    shadow: {
                        x: 5,
                        y: 5,
                        blur: 10,
                        spread: 10,
                        color: '#09c',
                        alpha: 0.2,
                    },
                    opacity: 0.5,
                    // border: {
                    //     color: '#526BFF',
                    //     width: 4,
                    // }
                    // fill: {
                    //     type: 'linearGradient',
                    //     direction: 'bottom',
                    //     colors: ['#09c', '#c90'],
                    // },
                },
                {
                    "_type": "text",
                    "x": 400,
                    "y": 300,
                    "text": "centerd",
                    "textSize": 20,
                    color: '#f00',
                    centerd: true,
                    backgroundColor: '#09c',

                    // "color": null,
                    // border: {
                    //     color: '#526BFF',
                    //     width: 4,
                    // },
                    // fill: {
                    //     type: 'linearGradient',
                    //     direction: 'bottom',
                    //     colors: ['#09c', '#c90'],
                    // },
                },
            ]
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
                        <p>Std UI 测试：</p>
                        <Example root={stdUi} />

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
                                    text: 'JSON_UI',
                                    textColor: '#fff',
                                    textSize: 24,
                                    debug: true,
                                    fontFamily: ''
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

                        {/* <p>性能测试（100 个节点）</p>
                        <Example root={bigNode} />

                        <p>性能测试（1600 个节点）</p>
                        <p>耗时约 5s</p>
                        <Example root={bigNode2} /> */}

                    </article>
                    <div class="common-container container">
                    </div>
                </div>
            </Page>
        )
    }
}

