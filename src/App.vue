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
    <div v-if="todoListVisible" id="todoList">
      <input
        type="text"
        v-model="newTodo"
        placeholder="Tambahkan To Do baru"
        class="input-todo"
      />
      <button @click="addTodo" class="btn-todo-add">Tambah</button>
      <ul id="todoItems">
        <li v-for="item in todos" :key="item.id">
          {{ item.text }}
          <button @click="removeTodo(item.id)">Hapus</button>
          <input type="checkbox" @change="toggleTodo(item.id)" />
        </li>
      </ul>
      <h3>Tugas Selesai:</h3>
      <ul id="completedTasks">
        <li
          v-for="item in completedTodos"
          :key="item.id"
          class="completed-task"
        >
          {{ item.text }}
          <button @click="removeCompletedTodo(item.id)">Hapus</button>
        </li>
      </ul>
    </div>
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
    <footer>
      <p>Dikembangkan oleh fedry faurrozy</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      completedTodos: [],
      newTodo: "",
      posts: [],
      users: [],
      selectedUser: null,
      todoListVisible: false,
      postListVisible: false,
    };
  },
  methods: {
    showTodos() {
      this.todoListVisible = true;
      this.postListVisible = false;
    },
    showPosts() {
      this.fetchUsers();
      this.postListVisible = true;
      this.todoListVisible = false;
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
    addTodo() {
      if (this.newTodo) {
        this.todos.push({
          id: Date.now(),
          text: this.newTodo,
          completed: false,
        });
        this.newTodo = "";
      }
    },
    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    removeCompletedTodo(id) {
      this.completedTodos = this.completedTodos.filter(
        (todo) => todo.id !== id
      );
    },
    toggleTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.completed = !todo.completed;
      if (todo.completed) {
        this.completedTodos.push(todo);
        this.removeTodo(id);
      } else {
        this.todos.push(todo);
        this.completedTodos = this.completedTodos.filter(
          (todo) => todo.id !== id
        );
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
header {
  background-color: #343a40;
  padding: 10px 0;
  color: #f8f9fa;
  text-align: center;
}
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}
nav ul li {
  margin: 0 15px;
}
nav ul li a {
  color: #f8f9fa;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;
}
nav ul li a:hover {
  background-color: #007bff;
}
.input-todo,
.user-select {
  padding: 10px;
  margin-bottom: 10px;
  width: 80%;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.btn-todo-add {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.completed-task {
  text-decoration: line-through;
}
footer {
  background-color: #343a40;
  color: #f8f9fa;
  text-align: center;
  padding: 20px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
}
footer p {
  margin: 0;
}
</style>
