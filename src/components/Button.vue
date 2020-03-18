<template>
  <button ref="button" :class="style" @click="onClick">{{value}}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    value: {
      type: String,
      default: "按钮"
    },
    className: {
      type: String,
      default: "is-success"
    }
  },
  created() {
      
  },
  methods: {
      onClick() {
          this.$emit('onClick')
      }
  },
  computed: {
      style() {
          return `button ${this.className} is-rounded is-hovered`
      }
  }
};
</script>

<style>
</style>