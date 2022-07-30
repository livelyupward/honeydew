<template>
  <header>
    <h1 class="honeydew-settings_heading">Honeydew Settings</h1>
  </header>
  <main class="honeydew-settings">
    <div class="honeydew-form_row">
      <label for="list-style">
        List arrangement
        <small>
          Choose whether you want your lists arranged in a column, or if you
          would like your lists to stack. When stacked, you are only able to see
          one list at a time.
        </small>
      </label>
      <select id="list-style" type="text">
        <option disabled selected>Select list arrangement</option>
        <option value="vertical">Vertical</option>
        <option value="stacked">Stacked</option>
      </select>
    </div>
    <div class="honeydew-form_row">
      <label for="list-style">
        Due dates
        <small>
          Select whether or not to allow due dates on todo items. If allowed,
          they are still an optional field.
        </small>
      </label>
      <select id="list-style" type="text">
        <option disabled selected>Select list arrangement</option>
        <option value="vertical">Vertical</option>
        <option value="stacked">Stacked</option>
      </select>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

function logger(log: string) {
  console.log(`Logging this:: `, log);
}

onMounted(() => {
  logger("app initialized");
});
</script>

<style lang="scss" scoped>
.honeydew-settings {
  .honeydew-form_row {
    display: flex;
  }
}
</style>
