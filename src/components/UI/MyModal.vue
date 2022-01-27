<template>
  <div v-if="modelValue">
    <div class="modal">
      <div @click="closeModal" class="modal__overlay"></div>
      <div class="modal__body">
        <slot></slot>
        <div @click="closeModal" class="modal__close">x</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyModal',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:modelValue');
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.modal__overlay {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #00000080;
}

.modal__body {
  position: absolute;
  padding: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  z-index: 10;
}

.modal__close {
  cursor: pointer;
  position: absolute;
  width: 15px;
  height: 15px;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
