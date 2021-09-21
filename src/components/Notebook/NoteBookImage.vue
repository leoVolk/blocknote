<template>
  <div class="mx-auto w-64">
    <div class="transform rotate-3 bg-white shadow-md p-8 relative">
      <div class="flex justify-center relative">
        <div
          class="
            absolute
            opacity-25
            h-12
            w-48
            transform
            top-0
            rotate-3
            bg-gray-500
          "
          style="top: -3.5rem"
        ></div>
      </div>
      <img
        loading="lazy"
        class="object-cover mx-auto"
        style="height: 18rem"
        src="https://source.unsplash.com/random/?city,sunset"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
