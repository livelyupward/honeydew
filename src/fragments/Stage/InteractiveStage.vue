<template>
  <section class="honeydew-stage">
    <header class="honeydew-homepage_header">
      <h1 class="honeydew-homepage_header-heading">Honeydew</h1>
    </header>
    <SpaceFragment>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci deleniti dolor, ea esse expedita molestias
        mollitia natus provident reiciendis, repellat, similique vero vitae? Ad ex fuga id maxime tempora tenetur!
      </p>
    </SpaceFragment>
    <SpaceFragment>
      <ul>
        <li>List 1</li>
        <li>List 2</li>
        <li>List 3</li>
      </ul>
    </SpaceFragment>
    <SpaceFragment>
      <h2>Big heading</h2>
    </SpaceFragment>
    <NewFragment />
  </section>
</template>

<script setup lang="ts">
import SpaceFragment from '../SpaceFragment.vue';
import NewFragment from '../NewFragment.vue';
</script>

<style lang="scss" scoped>
.honeydew-stage {
  max-width: 65em;
  padding: 0;
}

.honeydew-homepage_header-heading {
  font-size: 2.125rem;
  font-weight: 900;
  margin: 0 30px;
}
</style>
