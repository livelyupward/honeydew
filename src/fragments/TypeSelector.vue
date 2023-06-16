<template>
  <div class="honeydew-creator_button-wrapper">
    <Popper arrow placement="bottom-start">
      <button><font-awesome-icon :icon="['fas', 'plus']" /></button>
      <template #content>
        <ul>
          <li>Note</li>
          <li>Kanban Board</li>
          <li>Todo List</li>
        </ul>
      </template>
    </Popper>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.honeydew-creator_button-wrapper {
  align-items: center;
  display: flex;
  flex: 0 0 40px;
  justify-content: center;

  button {
    border: none;
    background-color: $transparent;
    box-shadow: none;

    &:hover {
      background-color: #dedede;
    }
  }
}
</style>
