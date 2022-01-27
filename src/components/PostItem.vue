<template>
  <div class="post">
    <div><strong>Название: </strong>{{ post.title }}</div>
    <div><strong>Описание: </strong>{{ post.descr }}</div>
    <MyButton @click="deletePost" color="delete" class="mt-10 mr-10">Удалить</MyButton>
    <MyButton color="warn">Изменить</MyButton>
  </div>
</template>

<script>
export default {
  emits: ['deletePost'],
  props: {
    post: {
      id: Number,
      title: String,
      descr: String
    }
  },
  methods: {
    deletePost() {
      this.$emit('deletePost', this.post);
    }
  }
};
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin: 15px 0 0 0;
}
</style>
