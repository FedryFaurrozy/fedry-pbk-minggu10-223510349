<template>
  <div class="post-view-container">
    <div class="user-selection">
      <label for="userSelect">Pilih User:</label>
      <select
        id="userSelect"
        v-model="selectedUser"
        @change="fetchPosts"
        class="user-select"
      >
        <option v-for="user in users" :value="user.id" :key="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>
    <div class="posts-container">
      <ul id="postItems" class="post-list">
        <li v-for="post in posts" :key="post.id" class="post-item">
          {{ post.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const selectedUser = ref(null);
    const users = ref([]);
    const posts = ref([]);

    const fetchUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      users.value = await response.json();
    };

    const fetchPosts = async () => {
      if (selectedUser.value) {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`
        );
        posts.value = await response.json();
      }
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      selectedUser,
      users,
      posts,
      fetchPosts,
    };
  },
};
</script>

<style scoped>
.post-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-selection {
  margin-bottom: 20px;
}

.user-select {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.post-list {
  list-style: none;
  padding: 0;
  width: 100%;
}

.post-item {
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.post-item:last-child {
  border-bottom: none;
}
</style>
