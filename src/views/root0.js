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
const root0 = {
    x: 0,
    y: 0,
    width: 750,
    height: 1334,
    color: '#fff',
    children: [
        {
            width: '100%',
            height: 56,
            color: '#000',
        },
        {
            width: '100%',
            height: 290,
            children: [
                // {
                //     relative: 'root', // 支持这种语法
                //     top: 20,
                //     left: 20,
                //     width: 100,
                //     height: 100,
                //     color: '#f00',
                // },
                {
                    relative: 'parent',
                    top: 60,
                    left: 70,
                    type: 'image',
                    width: 128,
                    height: 128,
                    url: 'https://icons.yunser.com/icons/text.svg',
                },
            ]
        },
        {
            width: '100%',
            height: 110,
            color: '#000',
            children: [
                {
                    width: '100%',
                    type: 'text',
                    text: '已完成80件',
                    textColor: '#fff',
                    textSize: 80,
                }
            ]
        },
        {
            width: '100%',
            height: 290,
            layout: 'grid',
            gridSize: 4,
            gridHeight: 252,
            paddingTop: 36,
            children: list.map(item => {
                return {
                    width: '25%',
                    // height: 250,
                    marginBottom: 24,
                    children: [
                        {
                            type: 'image',
                            x: 'center',
                            width: 128,
                            height: 128,
                            url: item.image,
                            marginBottom: 16,
                        },
                        {
                            type: 'text',
                            text: item.text,
                            x: 'center',
                            // relative: 'parent',
                            // left: 20,
                            // top: 180,
                            textSize: 24,
                            width: 144,
                            // text: '124',
                            // width: 128,
                            // height: 128,
                            // url: '/avatar.jpg',
                            textAlign: 'center',
                        },
                    ]
                }
            })
        },
    ]
}

export { root0 }
