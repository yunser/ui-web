const list = [
    {
        text: '一次无计划的旅行',
        image: 'https://icons.yunser.com/icons/text.svg',
    },
    {
        text: '勇敢告白一次',
        image: 'https://icons.yunser.com/icons/text.svg',
    },
    {
        text: '写信给未来的自己',
        image: 'https://icons.yunser.com/icons/text.svg',
    },
    {
        text: '去爱豆的演唱会',
        image: 'https://icons.yunser.com/icons/text.svg',
    },
    {
        text: '看完 1000 部电影',
        image: 'https://icons.yunser.com/icons/text.svg',
    },
]
const root9 = {
    x: 0,
    y: 0,
    width: 750,
    height: 1334,
    color: '#f00',
    children: [
        {
            width: 200,
            height: 200,
            color: '#09c'
        },
        {
            relative: 'parent',
            type: 'image',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            url: 'https://weya-lxy-static.oss-cn-beijing.aliyuncs.com/canvas/mark_bg.jpg',
        },
    ]
}

export { root9 }
