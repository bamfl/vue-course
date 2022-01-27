<template>
  <div v-if="posts.length">
    <div v-for="post in posts" :key="post.id">
      <PostItem :post="post" @deletePost="deletePost" />
    </div>
  </div>
  <h2 v-else class="mt-10">Список постов пуст, создайте первый!</h2>
</template>

<script>
import PostItem from './PostItem';

export default {
  components: {
    PostItem
  },
  emits: ['deletePost'],
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  methods: {
    deletePost(post) {
      this.$emit('deletePost', post);
    }
  }
};
</script>

<style scoped></style>
