<template>
  <div v-if="posts.length">
    <transition-group name="posts">
      <div v-for="post in posts" :key="post.id">
        <PostItem :post="post" @deletePost="deletePost" />
      </div>
    </transition-group>
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

<style scoped>
.posts-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-enter-active,
.posts-leave-active {
  transition: all 0.3s ease;
}
.posts-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.posts-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.posts-move {
  transition: transform 0.8s ease;
}
</style>
