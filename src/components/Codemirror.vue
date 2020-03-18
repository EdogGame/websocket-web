<template>
  <div>
    <codemirror v-model="code" :options="options"></codemirror>
  </div>
</template>

<script>
export default {
  name: "Codemirror",
  data() {
    return {};
  },
  props: {
    code: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      
    }
  }
};
</script>

<style>
</style>