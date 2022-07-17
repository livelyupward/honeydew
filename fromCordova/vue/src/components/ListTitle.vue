<template>
  <div class="honeydew-list_title">
    <h2 class="honeydew-list_title-text">{{ listTitle }}</h2>
<!--    <button class="honeydew-list_settings">-->
<!--      <font-awesome-icon class="fa-spin-hover" icon="fa-solid fa-gear" />-->
<!--    </button>-->
<!--    TODO: Work on actions for entire list-->
  </div>
</template>

<script setup>
defineProps({
  listTitle: String,
});

function spin() {
  const button = event.target;

  button.classList.push("faSpin");
}
</script>

<style lang="scss" scoped>
.fa-spin-hover:hover {
  -webkit-animation: spin 2s infinite linear;
  -moz-animation: spin 2s infinite linear;
  -o-animation: spin 2s infinite linear;
  animation: spin 2s infinite linear;
}

.honeydew-list_title {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;

  &-text {
    margin: 0 0 5px;
  }
}

.honeydew-list_settings {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: #fff;
  font-size: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
