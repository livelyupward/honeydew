<template>
  <aside>
    <Transition name="slide-up">
      <div class="honeydew-sidebar_sub-links" v-if="selectedLink !== ''">
        <div class="honeydew-sidebar_sub-links_container">
          <p>Sprints</p>
          <ul class="honeydew-sidebar_sub-links_list">
            <li class="honeydew-sidebar_sub-link">4/17/23</li>
            <li class="honeydew-sidebar_sub-link">5/1/23</li>
            <li class="honeydew-sidebar_sub-link">5/15/23</li>
          </ul>
        </div>
      </div>
    </Transition>
    <div class="honeydew-sidebar_links">
      <div class="honeydew-sidebar_spaces">
        <p>Spaces</p>
        <ul class="honeydew-sidebar_links-list">
          <li class="honeydew-sidebar_link" @click="selectedLink = 'sprints'">Sprints</li>
          <li class="honeydew-sidebar_link" @click="selectedLink = 'reports'">Reports</li>
          <li class="honeydew-sidebar_link" @click="selectedLink = 'cqr'">CQR</li>
        </ul>
      </div>
    </div>
    <div class="honeydew-sidebar_heading">
      <div class="honeydew-sidebar_user-container">
        <img
          class="honeydew-sidebar_user-avatar"
          src="https://ui-avatars.com/api/?background=0D8ABC&color=333"
          alt="avatar placeholder"
        />
        <span class="honeydew-sidebar_user-label">Dave</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedLink = ref('');
</script>

<style lang="scss" scoped>
aside {
  align-items: flex-start;
  background-color: $transparent;
  border-right: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
}

.honeydew-sidebar_heading {
  margin-top: auto;
}

.honeydew-sidebar_user-container {
  align-items: center;
  display: flex;
  justify-content: center;

  img {
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }
}

.honeydew-sidebar_sub-links ~ .honeydew-sidebar_links {
  border-top: 1px solid #ddd;
}

/* rules that target nested elements */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* ... other necessary CSS omitted */
</style>
