<template>
  <div
    class="honeydew-space_item"
    draggable="true"
    @mousedown="checkForHandle"
    @dragstart="runDragStart"
    @dragend="runDragEnd"
    @dragenter="onDragHover"
    @dragleave="onDragLeave"
    @dragover="draggingOver"
  >
    <div class="honeydew-space_item-sort" ref="handle">
      <font-awesome-icon :icon="['fas', 'grip-lines']" />
    </div>
    <div
      class="honeydew-space_content-item"
      ref="fragmentContent"
      contenteditable="true"
      @keydown.enter="submitFragment"
    >
      <slot></slot>
    </div>
    <div class="honeydew-space_item-convert">
      <Popper>
        <font-awesome-icon :icon="['fas', 'layer-group']" />
        <template #content>
          <ul>
            <li>Note</li>
            <li>Kanban</li>
            <li>Todo</li>
          </ul>
        </template>
      </Popper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fragmentContent = ref(null);
const handle = ref(null);
let target = false;
async function submitFragment(event) {
  event.preventDefault();

  const newContentRequest = await createNewContentItem({
    text: fragmentContent.value.textContent,
    type: 'note',
    spaceId: userGetter.value?.activeSpace ? userGetter.value.activeSpace : undefined,
    userId: userGetter.value?._id,
  });

  console.log('Content: ', fragmentContent.value.textContent);
  fragmentContent.value.textContent = '';

  return newContentRequest;
}

function checkForHandle(event) {
  target = event.target;
}

function runDragStart(event) {
  if (handle.value.contains(target)) {
    // drag logic here
    const dt = event.dataTransfer;
    dt.clearData();
    dt.effectAllowed = 'move';
    dt.setData('application/x-moz-node', event.target);
    console.log('target div: ', dt);

    event.target.classList.add('grabbed');
    event.target.children.classList.add('grabbed');
  } else {
    // no drag
    event.preventDefault();
  }
}

function runDragEnd(event) {
  event.target.classList.remove('grabbed');
  event.target.parentNode.classList.remove('hovered');
}

function onDragHover(event) {
  const hoveredDiv = event.target;
  if (!event.target.classList.contains('grabbed') && hoveredDiv.classList.contains('honeydew-space_content-item')) {
    hoveredDiv.parentNode.classList.add('hovered');
    const rect = hoveredDiv.getBoundingClientRect();
    const y = event.clientY - rect.top; //y position within the element.
    console.log('Top : ' + y + '.');
    if (y <= 15) {
      hoveredDiv.classList.add('top-pad');
    } else if (y > 15) {
      hoveredDiv.classList.add('bottom-pad');
    }
  }
}

function onDragLeave(event) {
  const hoveredDiv = event.target;
  hoveredDiv.parentNode.classList.remove('hovered');
  if (!event.target.classList.contains('grabbed') && hoveredDiv.classList.contains('honeydew-space_content-item')) {
    hoveredDiv.parentNode.classList.remove('hovered');
    hoveredDiv.classList.remove('bottom-pad');
    hoveredDiv.classList.remove('top-pad');
  }
}

function draggingOver(event) {
  const hoveredDiv = event.target;
  if (!event.target.classList.contains('grabbed') && hoveredDiv.classList.contains('honeydew-space_content-item')) {
    const rect = hoveredDiv.getBoundingClientRect();
    const mouseY = event.clientY - rect.top;

    if (mouseY <= 15) {
      if (hoveredDiv.classList.contains('bottom-pad')) hoveredDiv.classList.remove('bottom-pad');
      if (!hoveredDiv.classList.contains('top-pad')) hoveredDiv.classList.add('top-pad');
    } else if (mouseY > 15) {
      if (hoveredDiv.classList.contains('top-pad')) hoveredDiv.classList.remove('top-pad');
      if (!hoveredDiv.classList.contains('bottom-pad')) hoveredDiv.classList.add('bottom-pad');
    }
    console.log('Mouse Y-coordinate:', mouseY);
  }
}
</script>

<style lang="scss"></style>
