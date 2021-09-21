<template>
  <div class="mt-4 expenses">
    <h2 class="text-xl font-rocksalt text-center">Weekly Expenses</h2>
    <div class="my-4">
      <div class="flex justify-around">
        <div class="w-1/2 my-1 text-xl">
          <form @submit.prevent="addOrUpdateExpense()" class="expenses-box">
            <span class="mr-2">🏠</span>
            $<input
              v-model="exp.rent"
              type="number"
              class="w-full bg-transparent outline-none"
            />
          </form>
        </div>
        <div class="w-1/2 my-1 text-xl">
          <form @submit.prevent="addOrUpdateExpense()" class="expenses-box">
            <span class="mr-2">📝</span>
            $<input
              v-model="exp.bills"
              type="number"
              class="w-full bg-transparent outline-none"
            />
          </form>
        </div>
      </div>

      <div class="flex justify-around">
        <div class="w-1/2 my-1 text-xl">
          <form @submit.prevent="addOrUpdateExpense()" class="expenses-box">
            <span class="mr-2">🍟</span>
            $<input
              v-model="exp.food"
              type="number"
              class="w-full bg-transparent outline-none"
            />
          </form>
        </div>
        <div class="w-1/2 my-1 text-xl">
          <form @submit.prevent="addOrUpdateExpense()" class="expenses-box">
            <span class="mr-2">🚆</span>
            $<input
              v-model="exp.transport"
              type="number"
              class="w-full bg-transparent outline-none"
            />
          </form>
        </div>
      </div>

      <div class="flex justify-around">
        <div class="w-1/2 my-1 text-xl">
          <form @submit.prevent="addOrUpdateExpense()" class="expenses-box">
            <span class="mr-2">📽️</span>
            $<input
              v-model="exp.activities"
              type="number"
              class="w-full bg-transparent outline-none"
            />
          </form>
        </div>
        <div class="w-1/2 my-1 text-xl">
          <form @submit.prevent="addOrUpdateExpense()" class="expenses-box">
            <span class="mr-2">💸</span>
            $<input
              v-model="exp.other"
              type="number"
              class="w-full bg-transparent outline-none"
            />
          </form>
        </div>
      </div>
      <!-- savings -->
      <form
        @submit.prevent="addOrUpdateExpense()"
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
        $<input
          type="number"
          v-model="exp.savings"
          class="text-xl w-full bg-transparent outline-none"
        />
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { userSession } from '@/vuetils/useAuth';
import { addExpenses, updateExpenses } from '@/vuetils/useExpense';
import { defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
  components: {},
  props: {
    expenses: {
      type: Object as PropType<Expense>,
      required: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    weekStart: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const exp = ref(
      props.expenses || {
        bills: 0,
        rent: 0,
        food: 0,
        activities: 0,
        transport: 0,
        other: 0,
        savings: 0,
      }
    );

    watch(
      () => props.expenses,
      (updatedExpenses) => {
        exp.value = updatedExpenses || {
          bills: 0,
          rent: 0,
          food: 0,
          activities: 0,
          transport: 0,
          other: 0,
          savings: 0,
        };
      }
    );

    const addOrUpdateExpense = async () => {
      if (props.expenses && exp.value !== undefined) {
        updateExpenses(props.expenses, { ...exp.value });
      } else {
        addExpenses({
          ...exp.value,
          user_id: userSession.value?.user?.id,
          week_start: props.weekStart,
        });

        console.log('UPDATING OR ADDING');
      }
    };

    return { exp, addOrUpdateExpense };
  },
});
</script>
<style lang="postcss">
.expenses-box {
  @apply border-woodsmoke-900 border-2
              px-2
              py-1
              mx-2
              text-2xl
              flex
              items-center;
}

.expenses-box input::-webkit-outer-spin-button {
  display: none;
}

input::-webkit-inner-spin-button {
  display: none;
}
</style>