<template>
  <h2>Страница: Посты</h2>

  <router-link to="/" class="mr-10">На домашнюю</router-link>
  <router-link to="/about">К описанию</router-link>

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
  <div ref="observer" class="observer"></div>

  <!-- <MyPagination :pages="totalPagesCount" :currentPage="currentPage" @changePage="changePage"></MyPagination> -->
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
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
    initObserver() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      };
      const callback = (entries, observer) => {
        if (entries[0].isIntersecting && this.currentPage < this.totalPagesCount) {
          this.getMorePosts();
        }
      };
      const observer = new IntersectionObserver(callback, options);
      const target = this.$refs.observer;
      observer.observe(target);
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
    async getMorePosts() {
      this.currentPage += 1;
      await axios
        .get(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.currentPage}`)
        .then((data) => {
          this.totalItemsCount = +data.headers['x-total-count'];
          this.posts = [...this.posts, ...data.data];
          this.totalPagesCount = Math.ceil(this.totalItemsCount / this.limit);
        })
        .catch((e) => console.error(e));
    }
    // changePage(pageNumber) {
    //   this.currentPage = pageNumber;
    //   this.getPosts();
    // }
  },
  mounted() {
    this.getPosts().then(() => this.initObserver());
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

<style></style>
