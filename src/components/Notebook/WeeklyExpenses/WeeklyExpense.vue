<template>
  <div class="expenses-box">
    <span class="mr-2">📝</span>
    $<input value="0" type="text" class="w-full bg-transparent outline-none" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    title: { type: String, required: false, default: 'Rent' },
    expense: {
      type: Object as PropType<Expense>,
      required: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    emoji: { type: String, required: true },
  },
});
</script>
