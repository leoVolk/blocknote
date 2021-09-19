<template>
  <div class="flex my-2 relative items-center">
    <div
      class="
        absolute
        w-full
        bg-flamingo-400
        h-full
        transform
        rotate-2
        rounded-sm
      "
      style="opacity: 0.25"
    ></div>
    <div
      class="absolute w-full bg-pink-600 h-full transform -rotate-3 rounded-sm"
      style="opacity: 0.1"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
