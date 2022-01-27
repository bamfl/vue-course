<template>
  <button :class="['btn', color ? color : 'success']">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    color: String
  }
};
</script>

<style scoped>
.btn {
  background: transparent;
  padding: 10px;
  cursor: pointer;
}

.success {
  border: 2px solid teal;
  color: teal;
}

.delete {
  border: 2px solid red;
  color: red;
}

.warn {
  border: 2px solid teal;
  color: teal;
  background: rgb(255, 251, 0);
}
</style>
