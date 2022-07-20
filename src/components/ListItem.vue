<template>
  <li class="honeydew-list_item">
    <input v-model="localTodo.complete" class="honeydew-list_item-checkbox" type="checkbox" />
    <span class="honeydew-list_item-text" :class="localTodo.complete === true ? 'completed' : null">
      {{ localTodo.text }}
      <small class="honeydew-list_item-due" v-if="localTodo.dueDate">Due: {{ localTodo.dueDate }}</small>
    </span>
    <button class="honeydew-list_action-button" @click="openActions">
      <font-awesome-icon icon="fa-solid fa-ellipsis" />
    </button>
    <ul v-show="actionsOpened" class="honeydew-list_item-menu">
      <li class="honeydew-list_item-menu_action">Edit</li>
      <li class="honeydew-list_item-menu_action">Delete</li>
    </ul>
  </li>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

defineEmits(['closeActions']);

const props = defineProps({
  todo: Object,
});

const localTodo = ref(props.todo);
const actionsOpened = ref(false);

function openActions() {
  actionsOpened.value = !actionsOpened.value;
}
</script>

<style lang="scss" scoped>
.honeydew-list_item {
  align-items: center;
  border-bottom: 1px solid #999999;
  display: flex;
  font-size: 20px;
  padding: 10px 0;
  position: relative;
  text-align: left;

  &:first-of-type {
    padding-top: 0;
  }

  &-checkbox {
    background-color: #333333;
    margin-right: 15px;
  }

  &-text {
    margin-right: auto;

    &.completed {
      text-decoration: line-through;
    }
  }

  &-menu {
    background: #333;
    border-radius: 5px;
    bottom: 0;
    color: honeydew;
    font-size: 16px;
    font-weight: 700;
    padding: 10px;
    position: absolute;
    right: 0;
    text-align: center;
    transform: translateY(85%);
    z-index: 100;

    &_action {
      padding: 10px 0;

      &:first-of-type {
        padding-top: 0;
      }

      &:last-of-type {
        padding-bottom: 0;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid honeydew;
      }
    }
  }

  button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    box-shadow: none;
    color: #333;
    font-size: 24px;
  }

  .honeydew-list_item-due {
    display: block;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
