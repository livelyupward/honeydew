<template>
  <li
    class="kanban-board_status_item"
    :data-index="props.content.contentKey"
    :data-status="props.content.boardKey"
    @dragstart="dragStart(props.content.boardKey, $event)"
    draggable="true"
  >
    <span v-html="props.content.contentItem.content" class="kanban-board_status_item-content"></span>
  </li>
</template>

<script setup lang="ts">
interface KanbanItemContentProp {
  contentItem: object;
  contentKey: number;
  boardKey: number;
}
</script>

<style scoped></style>
