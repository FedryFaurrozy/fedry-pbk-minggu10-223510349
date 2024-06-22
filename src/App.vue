<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <a href="#" @click.prevent="showPosts">
              <i class="fas fa-newspaper"></i> Post
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="showTodos">
              <i class="fas fa-list-ul"></i> Todos
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <div v-if="postListVisible" id="postList">
      <select v-model="selectedUser" @change="fetchPosts" class="user-select">
        <option v-for="user in users" :value="user.id" :key="user.id">
          {{ user.name }}
        </option>
      </select>
      <ul id="postItems">
        <li v-for="post in posts" :key="post.id">
          {{ post.title }}
        </li>
      </ul>
    </div>
    <div v-if="todoListVisible" id="todoList">
      <todo-list />
      <div class="todo-explanation">
        <p>
          Klik <strong>Semua</strong> untuk melihat semua kegiatan dan klik
          <strong>Belum Selesai</strong> untuk dapat menceklis atau
          menyelesaikan tugas. Manfaatkan fitur ini untuk mengatur kegiatan
          harianmu dengan lebih efektif!
        </p>
      </div>
    </div>
    <footer>
      <p>Dikembangkan oleh fedry faurrozy</p>
    </footer>
  </div>
</template>

<script>
import TodoList from "./TodoList.vue";

export default {
  components: {
    TodoList,
  },
  data() {
    return {
      posts: [],
      users: [],
      selectedUser: null,
      postListVisible: false,
      todoListVisible: false,
    };
  },
  methods: {
    showPosts() {
      this.fetchUsers();
      this.postListVisible = true;
      this.todoListVisible = false;
    },
    showTodos() {
      this.todoListVisible = true;
      this.postListVisible = false;
    },
    fetchUsers() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        });
    },
    fetchPosts() {
      if (this.selectedUser) {
        fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`
        )
          .then((response) => response.json())
          .then((data) => {
            this.posts = data;
          });
      }
    },
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
