<template>
  <div class="todo-list">
    <input
      type="text"
      placeholder="Tambah kegiatan..."
      v-model="newTodo"
      @keydown.enter="addTodo"
      class="todo-input"
    />
    <div class="filter-container">
      <button
        :class="{ 'active-filter': filter === 'all' }"
        @click="filter = 'all'"
      >
        Semua
      </button>
      <button
        :class="{ 'active-filter': filter === 'pending' }"
        @click="filter = 'pending'"
      >
        Belum Selesai
      </button>
    </div>
    <ul class="todo-items">
      <todo-item
        v-for="(todo, index) in filteredTodos"
        :key="index"
        :todo="todo"
        @toggle-done="toggleDone(index)"
        @delete-todo="deleteTodo(index)"
        @edit-todo="editTodo(index, $event)"
      />
    </ul>
  </div>
</template>

<script>
import TodoItem from "./Todoitem.vue";

export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      todos: [
        { id: 1, text: "Belajar VueJS", done: false },
        { id: 2, text: "Membangun aplikasi to-do", done: false },
        { id: 3, text: "Minum kopi", done: true },
      ],
      newTodo: "",
      filter: "pending", // Setel filter default ke 'pending'
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === "all") {
        return this.todos;
      } else {
        return this.todos.filter((todo) => !todo.done);
      }
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({ id: Date.now(), text: this.newTodo, done: false });
        this.newTodo = "";
      }
    },
    toggleDone(index) {
      this.todos[index].done = !this.todos[index].done;
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    editTodo(index, newText) {
      if (newText.trim()) {
        this.todos[index].text = newText;
      }
    },
  },
};
</script>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.todo-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.todo-items {
  margin-top: 20px;
}

.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
  border-radius: 5px;
}

.todo-list .completed {
  text-decoration: line-through;
  color: #aaa;
}

.filter-container {
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
}

.filter-container button {
  margin: 0 10px;
  padding: 8px 16px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.filter-container .active-filter {
  background-color: #ccc;
  color: white;
}
</style>
