<template>
  <div class="mt-4">
    <h2 class="text-xl font-rocksalt text-center">Weekly Expenses</h2>
    <div class="my-4">
      <div class="flex justify-around">
        <div class="w-1/2 my-1 text-xl">
          <weekly-expense></weekly-expense>
        </div>
        <div class="w-1/2 my-1 text-xl">
          <weekly-expense></weekly-expense>
        </div>
      </div>

      <div class="flex justify-around">
        <div class="w-1/2 my-1 text-xl">
          <weekly-expense></weekly-expense>
        </div>
        <div class="w-1/2 my-1 text-xl">
          <weekly-expense></weekly-expense>
        </div>
      </div>

      <div class="flex justify-around">
        <div class="w-1/2 my-1 text-xl">
          <weekly-expense></weekly-expense>
        </div>
        <div class="w-1/2 my-1 text-xl">
          <weekly-expense></weekly-expense>
        </div>
      </div>

      <div
        class="
          shadow-box-noeffect
          flex
          py-2
          px-2
          bg-pomegranate-200
          mx-2
          my-4
          items-baseline
        "
      >
        <span class="font-rocksalt text-xl mr-2">savings:</span>
        $<input value="0 " class="text-xl w-full bg-transparent outline-none" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import WeeklyExpense from './WeeklyExpenses/WeeklyExpense.vue';

export default defineComponent({
  components: { WeeklyExpense },
  props: {
    expenses: {
      type: Array as PropType<Expense[]>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style lang="postcss">
.expenses-box {
  @apply border-woodsmoke-900 border-2
              px-4
              py-1
              mx-2
              text-2xl
              flex
              items-center;
}
</style>