<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <router-link to="/posts">
              <i class="fas fa-newspaper"></i> Post
            </router-link>
          </li>
          <li>
            <router-link to="/todos">
              <i class="fas fa-list-ul"></i> Todos
            </router-link>
          </li>
          <li>
            <router-link to="/albums">
              <i class="fas fa-images"></i> Albums
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
    <router-view></router-view>
    <footer>
      <p>Dikembangkan oleh fedry faurrozy</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
@import "./style.css";
</style>
