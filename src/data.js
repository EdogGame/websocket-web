const serverAddr = 'wss://ws-wot.flxxyz.com'

const messageOptions = [
    {
        text: '请选择消息数据类型',
    },
    {
        value: '1',
        text: '文本类型(text)',
        isDisabled: false,
    },
    {
        value: '2',
        text: '二进制类型(binary)',
        isDisabled: false,
    },
]

const handlerCode = "this.on('connect', () => {\n" +
    "    this.text('快看，他在狂笑');\n" +
    "});\n" +
    "\n" +
    "this.on('message', res => {\n" +
    "    console.log(`typeof res: ${typeof res}`);\n" +
    "    console.log('服务端响应:', res);\n" +
    "});\n" +
    "\n" +
    "this.on('disconnect', err => {\n" +
    "    console.log('服务端关闭:', err);\n" +
    "});"
const messageCode = "{\n" +
    "\tmessage: \"不要回答!不要回答!不要回答!\"\n" +
    "}"

export {
    serverAddr,
    messageOptions,
    handlerCode,
    messageCode,
}
