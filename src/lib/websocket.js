import { ab2str, str2ab } from './util'

export default class websocket {
    constructor(addr) {
        this.map = {}
        this.init(addr)
        return this
    }

    init(addr) {
        this.conn = new WebSocket(addr)
        this.on('disconnect', _ => {
            this.notify('服务端主动断开连接', 'is-danger')
        })
        this.on('error', _ => {
            this.notify('websocket出现错误', 'is-danger')
        })
    }

    readyState() {
        return this.conn.readyState
    }

    text(body) {
        this.log(body, true)
        this.conn.binaryType = 'blob'
        this.conn.send(body)
    }

    binary(body) {
        this.log(body, true)
        this.conn.binaryType = 'arraybuffer'
        this.conn.send(str2ab(body))
    }

    on(method, callback) {
        let eventName = ['connect', 'message', 'disconnect', 'error'].find((value) => {
            return value === method.toLocaleLowerCase()
        })

        if (eventName) {
            this.listener(method, callback)
        }
    }

    listener(method, callback) {
        let event = this[method](callback)
        if (this.map.hasOwnProperty(event.name)) {
            this.conn.removeEventListener(event.name, this.map[event.name])
        }
        this.map[event.name] = event.listener
        this.conn.addEventListener(event.name, event.listener)
    }

    connect(callback) {
        return {
            name: 'open',
            listener: _ => {
                this.notify('websocket连接成功!', 'is-success')
                callback()
            }
        }
    }

    message(callback) {
        return {
            name: 'message',
            listener: e => {
                let data = (this.conn.binaryType === 'arraybuffer' ? ab2str(e.data) : e.data)
                this.log(data)
                callback(data)
            }
        }
    }

    disconnect(callback) {
        return {
            name: 'close',
            listener: e => {
                this.notify('websocket断开连接', 'is-danger')
                callback(e)
            }
        }
    }

    error(callback) {
        return {
            name: 'error',
            listener: err => {
                this.notify('连接出现错误', 'is-danger')
                callback(err)
            }
        }
    }

    close() {
        if (this.readyState() === WebSocket.OPEN) {
            this.conn.close()
            return true
        }
        return false
    }

    closed() {
        return this.readyState() === WebSocket.CLOSED
    }
}