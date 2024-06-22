import { createRouter, createWebHistory } from "vue-router";
import PostView from "../views/PostView.vue";
import TodoView from "../views/TodoView.vue";
import AlbumView from "../views/AlbumView.vue";
import PhotoView from "../views/PhotoView.vue";

const routes = [
  { path: "/posts", component: PostView },
  { path: "/todos", component: TodoView },
  { path: "/albums", component: AlbumView },
  { path: "/albums/:id", component: PhotoView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
