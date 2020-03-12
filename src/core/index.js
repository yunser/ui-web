// const { times } = require('./')

(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory()
    } else {
        root.jsonUi = factory()
    }
} (this, function () {
    return {
        add(a, b) {
            return a + b
        }
    }
}))
