<template>
  <li class="honeydew-list_item">
    <input
      v-model="todo.complete"
      class="honeydew-list_item-checkbox"
      type="checkbox"
    />
    <span class="honeydew-list_item-text" :class="todo.complete === true ? 'completed' : null">
      {{ todo.title }}
      <small class='honeydew-list_item-due' v-if='todo.dueDate'>Due: {{ todo.dueDate }}</small>
    </span>
    <button @click="openActions">
      <font-awesome-icon icon="fa-solid fa-ellipsis" />
    </button>
    <ul v-show="actionsOpened" class="honeydew-list_item-menu">
      <li class="honeydew-list_item-menu_action">Edit</li>
      <li class="honeydew-list_item-menu_action">Delete</li>
    </ul>
  </li>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["closeActions"]);

defineProps({
  todo: Object,
});

const actionsOpened = ref(false);

function openActions() {
  actionsOpened.value = !actionsOpened.value;
}
</script>

<style lang="scss" scoped>
.honeydew-list_item {
  align-items: center;
  border-bottom: 1px solid #ddd;
  display: flex;
  font-size: 20px;
  padding: 10px 0;
  position: relative;
  text-align: left;

  &:first-of-type {
    padding-top: 0;
  }

  &-checkbox {
    margin-right: 15px;
  }

  &-text {
    margin-right: auto;

    &.completed {
      text-decoration: line-through;
    }
  }

  &-menu {
    background: #fff;
    border-radius: 5px;
    bottom: 0;
    color: #639;
    font-size: 16px;
    padding: 10px;
    position: absolute;
    right: 0;
    text-align: center;
    transform: translateY(85%);

    &_action {
      padding: 10px 0;

      &:first-of-type {
        padding-top: 0;
      }

      &:last-of-type {
        padding-bottom: 0;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid #639;
      }
    }
  }

  button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: #fff;
    font-size: 24px;
  }

  .honeydew-list_item-due {
    display: block;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
