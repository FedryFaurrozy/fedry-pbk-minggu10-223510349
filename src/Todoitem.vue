<template>
  <li :class="{ completed: todo.done }">
    <input type="checkbox" v-model="todo.done" @change="$emit('toggle-done')" />
    <span @dblclick="$emit('edit-todo', todo.text)">{{ todo.text }}</span>
    <button @click="$emit('delete-todo')">Hapus</button>
  </li>
</template>

<script>
export default {
  props: {
    todo: Object,
  },
  emits: ["toggle-done", "edit-todo", "delete-todo"],
};
</script>

<style scoped></style>
