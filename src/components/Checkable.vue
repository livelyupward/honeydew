<template>
  <div class="checkable-item" :class="checked ? 'checked' : ''" :data-type="props.type ? `${props.type}` : ''">
    <div class="checkable_checkmark-container">
      <span class="checkmark" @click="activateCheckmark">
        <svg
          id="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 300 300"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
        >
          <g id="checkmark" transform="matrix(.678823-.678823 0.653018 0.653018-10.255095 159.391689)">
            <line
              x1="0"
              y1="-75"
              x2="0"
              y2="75"
              transform="translate(14.912375 89.786118)"
              fill="none"
              stroke-width="30"
            />
            <line x1="-150" y1="0" x2="150" y2="0" transform="translate(150 150)" fill="none" stroke-width="30" />
          </g>
        </svg>
      </span>
    </div>
    <div class="checkable_content-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  value: Boolean,
  type: String,
});

const checked = ref(props.value || false);
const type = ref(props.type);

const activateCheckmark = () => {
  checked.value = !checked.value;
};
</script>

<style lang="scss" scoped>
.checkable-item {
  align-items: center;
  display: flex;
  width: 100%;

  &.checked {
    span.checkmark {
      background-color: #66c2a5;
      border: 1px solid #66c2a5;
      transition: all 250ms ease-in;
      svg {
        stroke: #fff;
      }
    }

    .checkable_content-container {
      color: #aaa;
    }

    &[data-type='strike'] {
      .checkable_content-container {
        text-decoration: line-through;
      }
    }
  }

  .checkable_checkmark-container {
    flex: 0 0 auto;
    padding-right: 0.875rem;
  }

  .checkable_content-container {
    flex: 1 1 auto;
  }
}
span.checkmark {
  align-items: center;
  border: 1px dashed #333;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 20px;
  transition: all 250ms ease-in;
  width: 20px;
}
svg {
  height: 10px;
  stroke: #333;
  width: 10px;
}
</style>
