<template>
  <div id="app">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="field has-addons">
            <div class="control is-expanded">
              <Input type="text" :value="serverAddr" @onChange="handlerAddr" />
            </div>
            <div class="control">
              <Button :value="connectText" :className="connectStyle" @onClick="handlerConnect" />
            </div>
          </div>
          <div class="field has-addons">
            <div class="control is-expanded">
              <Select :options="options" @onChange="handlerSelectValue" />
            </div>
            <div class="control">
              <Button :value="sentText" :className="sentStyle" @onClick="handlerSent" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="columns">
        <div class="column">
          <label for="handler">处理过程</label>
          <codemirror v-model="handlerCode" :options="handlerCodeOptions" />
        </div>
        <div class="column">
          <label for="message">消息内容(body变量)</label>
          <codemirror v-model="messageCode" :options="messageCodeOptions" />
        </div>
      </div>
      <table class="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th style="width: 240px">时间 / 响应方</th>
            <th>内容</th>
          </tr>
        </thead>
        <TodoList :data="logData" />
      </table>
    </div>
    <notifications group="message" :width="300" animation-name="v-fade-left" position="bottom left">
      <template slot="body" slot-scope="props">
        <article :class="props.item.type">
          <div class="message-body" v-html="props.item.text"></div>
        </article>
      </template>
    </notifications>
  </div>
</template>

<script>
import log from "./log";
import websocket from "./lib/websocket";
import { serverAddr, messageOptions, handlerCode, messageCode } from "./data";

export default {
  name: "app",
  data() {
    return {
      serverAddr: serverAddr,
      options: messageOptions,
      handlerCode: handlerCode,
      messageCode: messageCode,
      codeMirrorOptions: {
        theme: "monokai",
        lineNumbers: true
      },
      websocketState: false,
      timer: null,
      messageType: ""
    };
  },
  mounted() {
    let _hmt = _hmt || [];
    let hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?79ebee7c2d7b4f846381e56343757aff";
    let s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  },
  methods: {
    handlerConnect() {
      if (this.checkWebsocketState()) {
        this.$websocket.close();
      } else {
        log.reset();
        this.$websocket = new websocket(this.serverAddr);
        this.$websocket.notify = this.notify;
        this.$websocket.log = this.log;
        let scopeFunc = function(code) {
          console.log(this);
          return eval(code);
        };
        scopeFunc.bind(this.$websocket)(this.handlerCode);
        this.timer = setInterval(this.checkWebsocketState);
      }
    },
    handlerSent() {
      if (typeof this.$websocket === "undefined") {
        this.notify("websocket未初始化", "is-warning");
        return;
      }

      if (this.$websocket.closed()) {
        this.notify("websocket连接丢失", "is-warning");
        return;
      }

      let body = this.messageCode;

      switch (this.messageType) {
        case "1":
          this.$websocket.text(body);
          break;
        case "2":
          this.$websocket.binary(body);
          break;
        default:
          this.notify("请选择消息的数据类型", "is-warning");
          break;
      }
    },
    handlerSelectValue(value) {
      this.messageType = value;
    },
    handlerAddr(value) {
      this.serverAddr = value;
    },
    checkWebsocketState() {
      if (typeof this.$websocket === "undefined") {
        return false;
      }

      if (this.$websocket.readyState() == WebSocket.OPEN) {
        this.websocketState = true;
      } else {
        this.websocketState = false;
      }

      return this.websocketState;
    },
    notify(text, style = "is-success", duration = 2000) {
      this.$notify({
        group: "message",
        type: `message ${style}`,
        text: text,
        duration: duration
      });
    },
    log(data, isClient) {
      log.add({
        isClient: isClient || false,
        content: data
      });
    }
  },
  destroy() {
    clearInterval(this.timer);
  },
  computed: {
    connectText() {
      return this.websocketState ? "断开" : "连接";
    },
    connectStyle() {
      return this.websocketState ? "is-danger" : "is-success";
    },
    sentText() {
      return "发送消息";
    },
    sentStyle() {
      return "is-info";
    },
    handlerCodeOptions() {
      return Object.assign(
        {
          mode: "javascript"
        },
        this.codeMirrorOptions
      );
    },
    messageCodeOptions() {
      return this.codeMirrorOptions;
    },
    logData() {
      return log.get();
    }
  }
};
</script>

<style lang="scss">
@import "./assets/layout.scss";
</style>
