<template>
  <select :value="modelValue" @change="selectSort">
    <option selected disabled value="">Выберите сортировку</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.title }}</option>
  </select>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  name: 'MySelect',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array
    }
  },
  methods: {
    selectSort(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<style scoped>
select {
  background: transparent;
  padding: 10px;
  cursor: pointer;
  border: 2px solid teal;
  color: teal;
}
</style>
