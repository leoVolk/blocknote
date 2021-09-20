<template>
  <div class="flex mt-2 relative items-center">
    <div
      class="
        absolute
        w-full
        bg-flamingo-400
        h-full
        transform
        rotate-1
        rounded-sm
      "
      style="opacity: 0.25"
    ></div>
    <div
      class="absolute w-full bg-pink-600 h-full transform rounded-sm"
      style="opacity: 0.1"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>