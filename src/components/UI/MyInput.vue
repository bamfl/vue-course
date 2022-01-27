<template>
  <input :value="modelValue" type="text" :placeholder="placeholder" @input="updateInput" />
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    modelValue: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<style scoped>
input {
  border: 2px solid teal;
  width: 100%;
  padding: 5px;
}
</style>
