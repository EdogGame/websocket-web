<template>
  <tbody>
    <TodoItem
      v-for="(item, index) in list"
      :isClient="item.isClient"
      :content="item.content"
      v-bind:key="index"
    />
  </tbody>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    data: {
      type: Array,
      default: new Array()
    }
  },
  data() {
    return {
      list: this.data
    };
  }
};
</script>

<style>
</style>