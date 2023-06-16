<template>
  <div class="honeydew-space_item">
    <div class="honeydew-space_item-sort">
      <font-awesome-icon :icon="['fas', 'grip-lines']" />
    </div>
    <div class="honeydew-space_content-item" contenteditable="true"></div>
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

<script setup lang="ts"></script>

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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  display: flex;
  width: 100%;

  .honeydew-creator_context-menu_list {
    padding: 0;
  }

  &:hover,
  &:focus {
    background-color: #dedede;
  }

  .honeydew_content-wrapper {
    flex: 1 0 calc(100% - 40px);

    .honeydew-creator_content-wrapper_content {
      height: 100%;
      padding: 2px 5px;
    }
  }
}
</style>
