<template>
  <h3>Создать пост</h3>

  <form @submit.prevent>
    <MyInput v-model="post.title" placeholder="Название"></MyInput>
    <MyInput v-model="post.descr" placeholder="Описание"></MyInput>

    <MyButton @click="createPost" class="mt-10" type="submit">Создать</MyButton>
  </form>
</template>

<script>
export default {
  emits: ['createPost'],
  data() {
    return {
      post: {
        id: null,
        title: '',
        descr: ''
      }
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('createPost', this.post);
      this.post = {
        id: null,
        title: '',
        descr: ''
      };
    }
  }
};
</script>

<style scoped></style>
