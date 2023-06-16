<template>
  <div class="honeydew-space_item">
    <div class="honeydew-space_item-sort">
      <font-awesome-icon :icon="['fas', 'grip-lines']" />
    </div>
    <div class="honeydew-space_content-item" @keydown.enter="removeEditOnContent" @dblclick="editThisContent">
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
function editThisContent(event) {
  event.target.setAttribute('contenteditable', 'true');
}

function removeEditOnContent(event) {
  event.target.removeAttribute('contenteditable');
}
</script>

<style lang="scss">
.honeydew-space_item {
  @include round;
  display: flex;

  &:hover {
    background-color: darken(#efefef, 5);

    .honeydew-space_item-sort,
    .honeydew-space_item-convert {
      display: flex;
    }

    .honeydew-space_content-item {
      margin: 0;
    }
  }

  .honeydew-space_item-sort {
    border-right: 3px solid #efefef;
  }

  .honeydew-space_item-convert {
    border-left: 3px solid #efefef;
  }

  .honeydew-space_item-sort,
  .honeydew-space_item-convert {
    align-items: center;
    cursor: pointer;
    display: none;
    flex: 0 0 30px;
    justify-content: center;
  }

  .honeydew-space_content-item {
    flex: 0 0 calc(100% - 66px);
  }
}
.honeydew-space_content-item {
  margin: 0 30px;
  padding: 2px 5px;
}
</style>
