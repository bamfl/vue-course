<template>
  <div class="app">
    <h2>Страница: Посты</h2>

    <MyButton class="mt-10 mr-10" @click="openModal" @modelValue="closeModal">Создать пост</MyButton>
    <MyButton @click="getPosts">Получить посты</MyButton>

    <MyModal v-model="isModalOpen">
      <PostForm @createPost="addPost" />
    </MyModal>

    <PostList :posts="posts" @deletePost="deletePost" />
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';

export default {
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [
        { id: 1, title: 'Пост о JS', descr: 'JS is a cool language' },
        { id: 2, title: 'Пост о PHP', descr: 'PHP is a super language' },
        { id: 3, title: 'Пост о Ruby', descr: 'Ruby is a great language' },
        { id: 4, title: 'Пост о Jango', descr: 'Jango is a gorgeous language' }
      ],
      isModalOpen: false
    };
  },
  methods: {
    addPost(post) {
      this.posts.push(post);
      this.closeModal();
    },
    deletePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async getPosts() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const data = await response.json();
      console.log(data);
      
      return data;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 15px;
}

.mt-10 {
  margin-top: 10px;
}

.mr-10 {
  margin-right: 10px;
}
</style>
