<template>
  <div class="honeydew-creator">
    <div class="honeydew-creator_button-wrapper">
      <Popper arrow>
        <button><font-awesome-icon :icon="['fas', 'plus']" /></button>
        <template #content>
          <ul class="honeydew-creator_context-menu_list">
            <li class="honeydew-creator_context-menu_list-item">Kanban Board</li>
            <li class="honeydew-creator_context-menu_list-item">Note</li>
            <li class="honeydew-creator_context-menu_list-item">Todo</li>
          </ul>
        </template>
      </Popper>
    </div>
    <div class="honeydew-creator_content-wrapper">
      <div
        class="honeydew-creator_content-wrapper_content"
        contenteditable="true"
        @keydown.enter="addItem(itemValue)"
        @input="(event) => updateValue(event)"
      >
        {{ itemValue.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const itemValue = ref({
  type: 'note',
  content: '',
});
function updateValue(event) {
  itemValue.value.content = event.target.innerHTML;
}
</script>

<style lang="scss">
:root {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: inherit;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #eeeeee;
  --popper-theme-border-radiu: 6px;
  --popper-theme-padding: 1rem;
  --popper-theme-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.02), 1px 1px 2px rgba(0, 0, 0, 0.14);
}
.honeydew-creator {
  @include round;
  display: flex;
  width: 100%;

  .honeydew-creator_context-menu_list {
    padding: 0;
  }

  &:hover,
  &:focus {
    background-color: #dedede;
  }

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

  .honeydew-creator_content-wrapper {
    flex: 1 0 calc(100% - 40px);

    .honeydew-creator_content-wrapper_content {
      height: 100%;
      padding: 2px 5px;
    }
  }
}
</style>
