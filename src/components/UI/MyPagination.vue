<template>
  <div class="row mt-10 pagination">
    <div
      v-for="pageNumber in pages"
      :key="pageNumber"
      :class="['pagination__item', { active: pageNumber === currentPage }]"
      @click="$emit('changePage', pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>
</template>

<script>
export default {
  emits: ['changePage'],
  name: 'MyPagination',
  props: {
    pages: {
      type: Number
    },
    currentPage: {
      type: Number
    }
  }
};
</script>

<style scoped>
.pagination__item {
  padding: 5px;
  border: 2px solid black;
  margin-right: 10px;
  cursor: pointer;
}
.pagination__item.active {
  border: 2px solid teal;
}
</style>
