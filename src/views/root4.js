(function () {
    let bodyContent = [
        // title box
        {
            // debug: true,
            height: 118, // TODO auto
            // color: '#f00',
            children: [
                // 标题框 left
                {
                    comment: '标题框 left',
                    relative: 'parent',
                    left: 0,
                    top: 0,
                    width: 8,
                    height: 37,
                    color: '#000',
                },
                // 标题框 top
                {
                    relative: 'parent',
                    top: 0,
                    left: 0,
                    width: 37,
                    height: 8,
                    color: '#000000',
                },
                // 标题框 right
                {
                    relative: 'parent',
                    right: 0,
                    bottom: 0,
                    width: 8,
                    height: 37,
                    color: '#000',
                },
                // 标题框 bottom
                {
                    relative: 'parent',
                    bottom: 0,
                    right: 0,
                    width: 37,
                    height: 8,
                    color: '#000000',
                },
            ]
        },
        {
            type: 'text',
            text: '2020年不能荒废，至少要读30本书并做读书笔记',
            x: 93,
            y: 486,
            width: 610,
            height: 118,
            color: '#000000',
            borderRadius: 20,
            textSize: 50,
            lineHeight: 84,
            marginBottom: 63,
        },
        // 挑战标题
        {
            position: 'static',
            x: 93,
            width: 154,
            height: 50,
            borderRadius: 20,
            textSize: 50,
            lineHeight: 84,
            marginBottom: 32,
            // strong: '#f00',
            children: [
                {
                    type: 'text',
                    text: '挑战内容',
                    width: 285,
                    color: 'rgba(0, 0, 0, 0.85)',
                    textSize: 36,
                    lineHeight: 84,
                    fontWeight: 'bold',
                },
                {
                    relative: 'parent',
                    left: 0,
                    bottom: 0,
                    width: 154,
                    height: 15,
                    color: 'rgba(249, 138, 95, 1)',
                },
            ],
        },
        // 挑战列表
        {
            debug: true,
            position: 'static',
            x: 93,
            // width: 154,
            // height: 350,
            // color: '#f00',
            borderRadius: 20,
            textSize: 50,
            lineHeight: 84,
            marginBottom: 72,
            children: [
                '坚持10天读完一本书',
                '坚持写读书笔记',
                '这是第三条',
                '这是第四条',
                '这是第五条',
                '这是第六条',
                '这是第 7 条',
                '这是第 8 条',
                '这是第 9 条',
                '这是第 10 条',
                '这是第 11 条',
                '这是第 12 条',
                'Hello，world',
            ].map(item => {
                return {
                    width: 300,
                    height: 42,
                    marginBottom: 18,
                    // strong: '#09c',
                    layout: 'x',
                    // yAlign: 'center',
                    children: [
                        {
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginRight: 20,
                            color: '#f00',
                        },
                        {
                            type: 'text',
                            text: item,
                            width: 285,
                            color: 'rgba(0, 0, 0, 0.65)',
                            textSize: 30,
                            lineHeight: 84,
                        },
                    ]
                }
            })
        },
    ]

    window.root4 = {
        x: 0,
        y: 0,
        width: 500,
        height: 400,
        // padding: 16,
        color: '#fefefe',
        children: [
            {
                type: 'text',
                text: '立个Flag：',
                color: '#000',
                fontWeight: 'bold',
                textSize: 32,
                lineHeight: 32 * 1.6,
                marginBottom: 28,
                // width: 500,
            },
            {
                type: 'text',
                text: '2020年不能荒废，至少要读30本书并做读书笔记',
                color: '#000',
                fontWeight: 'bold',
                textSize: 52,
                width: 500,
                lineHeight: 52 * 1.6,
                marginBottom: 28,
            },
            // 围观
            {
                relative: 'parent',
                bottom: 0,
                // top: 20,
                left: 120,
                // left: 0,
                // x: 0,
                // y: 0,
                width: 300,
                height: 60,
                // color: '#f00',
                borderRadius: 30,
                border: {
                    color: '#73A2FE',
                    width: 2,
                }
            },
            {
                relative: 'parent',
                bottom: 4,
                left: 115,
                // x: 0,
                // y: 0,
                width: 300,
                height: 60,
                color: '#73A2FE',
                borderRadius: 30,
                children: [
                    {
                        relative: 'parent',
                        x: 'center',
                        y: 'center',
                        // left: 0,
                        top: 0,
                        type: 'text',
                        text: '围观',
                        textColor: '#fff',
                        // x: 'center',
                        // y: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        textSize: 32,
                        lineHeight: 32 * 1.6,
                        marginBottom: 28,
                        // width: 500,
                    }
                ]
            },

            // {
            //     x: 0,
            //     y: 0,
            //     width: 250,
            //     height: 200,
            //     color: '#000',
            // },
        ]
    }
})()
