<template>
  <div class="app">
    <h2>Страница: Посты</h2>

    <div class="row">
      <MyButton class="mt-10 mr-10" @click="openModal" @modelValue="closeModal">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="selectOptions" class="ml-auto mr-10"></MySelect>
      <MyInput v-model="searchQuery" placeholder="Поиск" class="search" @modelValue="sortedAndFilteredPosts"></MyInput>
    </div>

    <MyModal v-model="isModalOpen">
      <PostForm @createPost="createPost" />
    </MyModal>

    <PostList v-if="!isLoading" :posts="sortedAndFilteredPosts" @deletePost="deletePost" />
    <MyLoader v-else></MyLoader>

    <MyPagination :pages="totalPagesCount" :currentPage="currentPage" @changePage="changePage"></MyPagination>
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
import axios from 'axios';

export default {
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [],
      isModalOpen: false,
      isLoading: false,
      selectedSort: '',
      selectOptions: [
        { value: 'title', title: 'По названию' },
        { value: 'body', title: 'По описанию' }
      ],
      searchQuery: '',
      currentPage: 1,
      limit: 10,
      totalItemsCount: 0,
      totalPagesCount: 1
    };
  },
  methods: {
    createPost(post) {
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
      this.isLoading = true;

      await axios
        .get(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.currentPage}`)
        .then((data) => {
          this.totalItemsCount = +data.headers['x-total-count'];
          this.posts = data.data;
          this.totalPagesCount = Math.ceil(this.totalItemsCount / this.limit);
        })
        .catch((e) => console.error(e))
        .finally(() => (this.isLoading = false));
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.getPosts();
    }
  },
  mounted() {
    this.getPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => {
        if (a[this.selectedSort] > b[this.selectedSort]) return 1;
        if (a[this.selectedSort] < b[this.selectedSort]) return -1;
        return 0;
      });
    },
    sortedAndFilteredPosts() {
      return this.sortedPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(this.searchQuery) || post.body.toLowerCase().includes(this.searchQuery)
      );
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

.row {
  display: flex;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.mt-10 {
  margin-top: 10px;
}

.mr-10 {
  margin-right: 10px;
}

.ml-auto {
  margin-left: auto;
}
.search {
  width: 200px !important;
}
</style>
