<template>
  <div class="kanban-board_container">
    <p class="kanban-board_title">{{ kanban.title }}</p>
    <div class="kanban-board_stage">
      <div
        v-for="(boardItem, boardKey) in kanban.items"
        class="kanban-board_status-column"
        :data-status="boardKey"
        :ondragenter="cancelDefault"
        :ondragover="cancelDefault"
        :ondrop="droppedHandler"
      >
        <span class="kanban-board_status-title">{{ boardKey }}</span>
        <ul class="kanban-board_status_item-container">
          <li
            v-for="(contentItem, contentKey) in boardItem"
            class="kanban-board_status_item"
            :data-index="contentKey"
            :data-status="boardKey"
            @dragstart="dragStart(boardKey, $event)"
            draggable="true"
          >
            <span v-html="contentItem.content" class="kanban-board_status_item-content"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import json from '../../assets/kanban.json';

const loading = ref(true);

const props = defineProps({
  content: Object,
});

const draggedItem = ref({});
const draggedItemHMTL = ref('');
const draggedStartingStatus = ref(null);
const draggedEndingStatus = ref(null);
const kanban = ref({
  ...props.content,
});

function dragStart(contentKey, event) {
  console.log('dragged item html: ', draggedItemHMTL.value);
  if (Object.keys(draggedItemHMTL.value).length <= 0) {
    draggedStartingStatus.value = contentKey;
    draggedItemHMTL.value = event.target.firstChild.innerHTML;
    draggedItem.value = event.target;
  } else {
    console.log('nope');
  }
}

async function droppedHandler(event) {
  draggedEndingStatus.value = event.target.dataset.status;

  if (draggedStartingStatus.value === null) throw Error('Starting status is null. Something has gone wrong.');
  if (draggedEndingStatus.value === null) throw Error('Ending status is null. Something has gone wrong.');

  if (draggedStartingStatus.value !== null && draggedEndingStatus.value !== null) {
    // @ts-ignore
    kanban.value.items[draggedStartingStatus.value].splice(draggedItem.value.dataset.index, 1);
    // @ts-ignore
    kanban.value.items[draggedEndingStatus.value].push({ content: draggedItemHMTL.value });
  } else {
    throw Error('Could not move Kanban item. Please check logs.');
  }

  draggedItemHMTL.value = '';
  draggedItem.value = {};
  draggedStartingStatus.value = null;
  draggedEndingStatus.value = null;
}

function cancelDefault(event) {
  event.preventDefault();
}
</script>

<style lang="scss" scoped>
.kanban-board_container {
  background-color: #ffffff;

  .kanban-board_stage {
    display: flex;
    justify-content: space-around;

    .kanban-board_status-column {
      margin: 0 10px;
      width: 100%;

      &:first-of-type {
        margin-left: 0;
      }

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  .kanban-board_status-column {
    background-color: #efefef;
    border-radius: 4px;
    padding: 0.625rem;
  }

  .kanban-board_status-title {
    color: #636363;
    display: block;
    font-size: 0.875rem;
    margin-bottom: 5px;
  }

  .kanban-board_status_item-container {
    padding: 0;
  }

  .kanban-board_status_item {
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    cursor: pointer;
    margin: 12px 0;
    padding: 10px;

    &.dragging {
      position: absolute;
    }

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}

.kanban-board_status_item {
  .kanban-board_status_item-content {
    p {
      &:first-of-type {
        margin-top: 0;
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}
</style>
