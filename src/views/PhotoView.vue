<template>
  <div class="photo-container">
    <ul class="photo-list">
      <li v-for="photo in photos" :key="photo.id" class="photo-item">
        <img
          :src="photo.thumbnailUrl"
          @click="showPhoto(photo.url)"
          class="photo-image"
          @mouseover="hoverPhoto(photo.thumbnailUrl)"
          @mousemove="movePhoto($event)"
          @mouseleave="resetPhoto($event)"
        />
      </li>
    </ul>
    <q-dialog v-model="dialog" maximized>
      <q-card>
        <q-img :src="selectedPhotoUrl" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useMainStore } from "../store";
import { useRoute } from "vue-router";
import { QDialog, QCard, QImg } from "quasar";

export default {
  components: { QDialog, QCard, QImg },
  setup() {
    const store = useMainStore();
    const route = useRoute();
    const dialog = ref(false);
    const selectedPhotoUrl = ref("");
    const hoverPhotoUrl = ref("");

    onMounted(() => {
      const albumId = route.params.id;
      store.fetchPhotos(albumId);
    });

    const showPhoto = (url) => {
      selectedPhotoUrl.value = url;
      dialog.value = true;
    };

    const hoverPhoto = (url) => {
      hoverPhotoUrl.value = url;
    };

    const movePhoto = (event) => {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      event.target.style.transform = `scale(1.1) perspective(500px) rotateY(${
        (x - rect.width / 2) / 5
      }deg) rotateX(${-(y - rect.height / 2) / 5}deg)`;
    };

    const resetPhoto = (event) => {
      event.target.style.transform = "none";
    };

    return {
      ...store,
      dialog,
      selectedPhotoUrl,
      showPhoto,
      hoverPhoto,
      hoverPhotoUrl,
      movePhoto,
      resetPhoto,
    };
  },
};
</script>

<style scoped>
.photo-container {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.photo-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.photo-item {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.photo-item:hover {
  transform: scale(1.1) perspective(500px) rotateY(10deg);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.photo-image {
  width: 100%;
  height: auto;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.photo-image:hover {
  opacity: 0.8;
  transform: scale(1.1);
}
</style>
