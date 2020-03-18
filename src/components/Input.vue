<template>
  <input v-model="v" @change="onChange" class="input" :type="type" />
</template>

<script>
export default {
  name: "Input",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      v: this.value
    };
  },
  methods: {
    onChange() {
      this.$emit("onChange", this.v);
    }
  }
};
</script>

<style>
</style>