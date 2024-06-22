// Start of Selection
<template>
  <div class="album-container">
    <ul class="album-list">
      <li v-for="album in albums" :key="album.id" class="album-item">
        <router-link :to="`/albums/${album.id}`" class="album-link">
          <div class="album-thumbnail">
            <img
              :src="album.thumbnailUrl"
              alt="Album Cover"
              class="album-image"
            />
          </div>
          <div class="album-title">{{ album.title }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useMainStore } from "../store";

export default {
  setup() {
    const store = useMainStore();

    onMounted(() => {
      store.fetchAlbums();
    });

    return {
      ...store,
    };
  },
};
</script>

<style scoped>
.album-container {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.album-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.album-item {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.album-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.album-link {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 10px;
}

.album-thumbnail {
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.album-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.album-title {
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
  padding: 10px 5px;
}
</style>
