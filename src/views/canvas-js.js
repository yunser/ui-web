import { CanvasX } from './canvas'

function getFontStyle(node) {
    console.log('??', node._fontWeight)
    let font = `normal ${node._fontWeight} ${node._textSize}px ${node._fontFamily}`
    // let font = `${node._textSize}px ${node._fontWeight} Georgia` // 乱了
    console.log('醉了', node, font)
    // `${node._textSize}px Georgia ${node._fontWeight}` // TODO 封装
    return font
}

function drawRoundRectPath(cxt, width, height, radius) {
    cxt.beginPath(0);
    //从右下角顺时针绘制，弧度从0到1/2PI
    cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

    //矩形下边线
    cxt.lineTo(radius, height);

    //左下角圆弧，弧度从1/2PI到PI
    cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

    //矩形左边线
    cxt.lineTo(0, radius);

    //左上角圆弧，弧度从PI到3/2PI
    cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);

    //上边线
    cxt.lineTo(width - radius, 0);

    //右上角圆弧
    cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);

    //右边线
    cxt.lineTo(width, height - radius);
    cxt.closePath();
}


/**该方法用来绘制一个有填充色的圆角矩形
     *@param cxt:canvas的上下文环境
    *@param x:左上角x轴坐标
    *@param y:左上角y轴坐标
    *@param width:矩形的宽度
    *@param height:矩形的高度
    *@param radius:圆的半径
    *@param fillColor:填充颜色
**/
function fillRoundRect(cxt, x, y, width, height, radius, /*optional*/ fillColor) {
    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) { return false; }

    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius);
    cxt.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值
    cxt.fill();
    cxt.restore();
}

/*
    * 圆角矩形
    * @parama int/float x            矩形位置x坐标
    * @parama int/float y            矩形位置y坐标
    * @parama int/float w            矩形宽度
    * @parama int/float h            矩形高度
    * @parama int/float r            圆角半径
    * @parama object <img>           矩形背景图
    */
   function drawRoundedImg(ctx, bgimg, x, y, w, h, r) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.arcTo(x+w,y,x+w,y+h,r);
    ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r);
    ctx.arcTo(x,y,x+w,y,r);
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(bgimg, x, y, w, h);
    ctx.restore();
    ctx.closePath();
}

/**该方法用来绘制圆角矩形
 *@param cxt:canvas的上下文环境
    *@param x:左上角x轴坐标
    *@param y:左上角y轴坐标
    *@param width:矩形的宽度
    *@param height:矩形的高度
    *@param radius:圆的半径
    *@param lineWidth:线条粗细
    *@param strokeColor:线条颜色
    **/
   function strokeRoundRect(cxt, x, y, width, height, radius, /*optional*/ lineWidth, /*optional*/ strokeColor) {
    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) { return false; }

    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius);
    cxt.lineWidth = lineWidth || 2; //若是给定了值就用给定的值否则给予默认值2
    cxt.strokeStyle = strokeColor || "#000";
    // cxt.stroke();
    cxt.restore();
}

function drawText2(context, t, x, y, w, lineHeight, opts, node) {

    let chr = t.split("");
    let temp = "";
    let row = [];

    let measureResult = context.measureText(t)
    let oneLineWidth = measureResult.width


    if ((opts.originWidth || 'auto') === 'auto') {
        w = oneLineWidth
    }

    // context.font = "20px Arial";
    // context.fillStyle = "black";
    // context.textBaseline = "middle";

    for (let a = 0; a < chr.length; a++) {

        if (context.measureText(temp).width < w && context.measureText(temp + (chr[a])).width <= w) {
            temp += chr[a];
        }//context.measureText(text).width  测量文本text的宽度
        else {
            row.push(temp);
            temp = chr[a];
        }
    }
    row.push(temp);

    const { textAlign } = opts

    for (let b = 0; b < row.length; b++) {
        // context.fillText(row[b],x,y+(b+1)*lineHeight)
        context.textAlign = textAlign
        let textX
        if (textAlign === 'left') {
            textX = x
        } else if (textAlign === 'right') {
            textX = x + w
            // context.fillText(row[b], x + w, y + (b) * lineHeight)
        } else if (textAlign === 'center') {
            textX = x + w / 2
            // context.fillText(row[b], x + w, y + (b) * lineHeight)
        }
        context.fillText(row[b], textX, y + (b) * lineHeight)
    }
    return {
        line: row.length,
        height: row.length * lineHeight
    }

    // 只显示2行，加...
    /*for(var b = 0; b < 2; b++){
        var str = row[b];
        if(b == 1){
            str = str.substring(0,str.length-1) + '...';
        }
        context.fillText(str,x,y+(b+1)*24);
    }*/
}

class Painter {

    init(canvasx) {
        this.canvas = canvasx.canvas
        let ctx = canvasx.canvas.getContext('2d')
        this.ctx = ctx
    }

    // setCanvas(canvas) {
    //     this.canvas = canvas
    // }

    // setContext(ctx) {
    //     this.ctx = ctx
    // }

    setSize(width, height) {
        this.canvasWidth = width
        this.canvasHeight = height
        this.ctx.width = width
        this.ctx.height = height
        this.canvas.width = width
        this.canvas.height = height
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    drawLine(line, style) {
        const { ctx } = this
        const styleLine = style.line || {}
        ctx.strokeStyle = style.stroke.color
        ctx.beginPath()
        ctx.moveTo(line[0].x, line[0].y)
        ctx.lineTo(line[1].x, line[1].y)
        ctx.setLineDash(styleLine.dash || [])
        ctx.stroke()
    }

    async loadImages(allImage) {

        if (allImage.length === 0) {
            this.imgCaches = []
            return {
                requestImageTime: 0,
            }
        }

        function getImage(url) {
            return new Promise((resolve, reject) => {
                // console.log('_this.opts', _this.opts)
                let img = new window.Image()
                img.onload = () => {
                    resolve({
                        url: url,
                        image: img,
                    })
                }
                img.onerror = err => {
                    resolve({
                        url: url,
                        image: null,
                        error: err
                    })
                    // throw new Error(`image load fail ${url}`)
                }
                img.src = url
            })
        }

        // const getImage = this.opts.getImage || defaultFetImage

        let promises = []
        for (let img of allImage) {
            promises.push(getImage(img))
        }
        let requestStartTime = new Date().getTime()
        let imgCaches = await Promise.all(promises)
        console.log('imgCaches', imgCaches)
        let requestTime = new Date().getTime() - requestStartTime
        console.log(`图片请求耗时2：${requestTime}ms`)
        this.imgCaches = imgCaches

        return {
            requestImageTime: requestTime,
        }
    }

    drawImage(url, x, y, width, height, style) {
        const { ctx } = this
        let cache = this.imgCaches.find(item => item.url === url)
        if (cache && cache.image) {
            let img = cache.image
            console.log('cache', cache, img)
            if (style.radius) {
                drawRoundedImg(ctx, img, x, y, width, height, style.radius)
            } else {
                ctx.drawImage(img, 0, 0, img.width, img.height, x, y, width, height)
            }
            // this.painter.drawImage()
        } else {
            console.error('image err', cache)
            // drawRoundedImg(ctx, img, _x, _y, _width, _height, node._borderRadius)
            // ctx.beginPath()
            // ctx.rect(_x, _y, _width, _height)
            // ctx.stroke()
        }
    }

    drawRect(x, y, width, height, style) {
        const { ctx } = this
        // const styleLine = style.line || {}
        // ctx.strokeStyle = style.stroke.color
        // ctx.beginPath()
        // ctx.moveTo(line[0].x, line[0].y)
        // ctx.lineTo(line[1].x, line[1].y)
        // ctx.setLineDash(styleLine.dash || [])
        // ctx.stroke()
        const { fill, stroke } = style

        ctx.beginPath()
        if (style.radius) {
            strokeRoundRect(ctx, x, y, width, height, style.radius)
        } else {
            ctx.rect(x, y, width, height)
        }
        if (fill) {
            if (fill.gradient) {
                let grd = ctx.createLinearGradient(x, y, x, y + height)
                grd.addColorStop(0, fill.gradient.from)
                grd.addColorStop(1, fill.gradient.to)

                // fill.gradient = grd
                ctx.fillStyle = grd
            } else {
                ctx.fillStyle = fill.color
            }
            
            ctx.fill()
        }
        if (stroke) {
            console.log('画边框', stroke)
            ctx.setLineDash(stroke.dash || []) // TODO
            ctx.strokeStyle = stroke.color || '#000'
            ctx.lineWidth = stroke.width || 1
            ctx.stroke()
        }
    }

    drawText(text, x, y, width, lineHeight, opts, node) {
        const { ctx } = this
        ctx.beginPath()
        ctx.fillStyle = node._textColor
        ctx.font = getFontStyle(node)
        ctx.textBaseline = 'top'

        const { line, height } = drawText2(ctx, text, x, y, width, lineHeight, opts, node)
    }

    calText(t, x, y, w, lineHeight, node, opts) {
        
        const context = this.ctx
        context.font = getFontStyle(node)

        let measureResult = context.measureText(t)
    
        // console.log('计算', measureResult)
        let oneLineWidth = measureResult.width
    
        let chr = t.split("");
        let temp = "";
        let row = [];
    
        // context.font = "20px Arial";
        // context.fillStyle = "black";
        // context.textBaseline = "middle";
    
        for (let a = 0; a < chr.length; a++) {
    
            if (context.measureText(temp).width < w && context.measureText(temp + (chr[a])).width <= w) {
                temp += chr[a];
            }//context.measureText(text).width  测量文本text的宽度
            else {
                row.push(temp);
                temp = chr[a];
            }
        }
        row.push(temp);
    
        for (let b = 0; b < row.length; b++) {
            // context.fillText(row[b],x,y+(b+1)*lineHeight)
            context.fillText(row[b], x, y + (b) * lineHeight)
        }
        return {
            textLine: row.length,
            textHeight: row.length * lineHeight,
            oneLineWidth,
            oneLineHeight: opts.textSize,
        }
    }
}

class JsCanvas extends CanvasX {

    constructor(canvas, options) {
        super({
            ...options,
            Image: window.Image,
            Painter,
            debug: false,
            // painter: new Painter()
        })
        this.canvas = canvas
    }
}

export { JsCanvas }
