import { CanvasX } from './canvas'

class JsCanvas extends CanvasX {

    constructor(canvas, options) {
        super(canvas, {
            ...options,
            Image: window.Image,
            debug: true,
        })
    }
}

export { JsCanvas }
