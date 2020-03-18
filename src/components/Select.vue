<template>
  <div class="select is-fullwidth">
    <select ref="select" @change="onChange">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :disabled="option.isDisabled"
      >{{option.text}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    options: {
      type: Array,
      default: new Array()
    }
  },
  created() {
    this.options.map((item, index) => {
      if (!item.hasOwnProperty("value")) {
        item.value = "";
      }

      if (!item.hasOwnProperty("text")) {
        item.text = "";
      }

      if (!item.hasOwnProperty("isDisabled")) {
        item.isDisabled = false;
      }
    });
  },
  methods: {
    onChange() {
      this.$emit("onChange", this.$refs.select.value);
    }
  }
};
</script>

<style>
</style>