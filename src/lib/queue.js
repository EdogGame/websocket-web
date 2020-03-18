export default class queue {
    constructor() {
        this.order = true
        this.data = []
    }

    add(item) {
        if (this.order) {
            this.data.unshift(item)
        } else {
            this.data.push(item)
        }
    }

    reset() {
        this.data.length = 0
    }

    get() {
        return this.data
    }
}
