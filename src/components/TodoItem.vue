<template>
  <tr :class="style">
    <td>{{status}}</td>
    <td>{{content}}</td>
  </tr>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    isClient: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ""
    }
  },
  methods: {
    now() {
      return new Date()
        .toLocaleString("zh-CN", { hour12: false })
        .replace(/\//g, "-")
        .replace(/\b\d\b/g, "0$&");
    }
  },
  computed: {
    style() {
      return this.isClient ? "has-text-success" : "has-text-danger";
    },
    status() {
      return `${this.now()} / ${this.isClient ? "客户端" : "服务端"}`;
    }
  }
};
</script>

<style>
</style>