<template>
  <div id="goals" class="relative notes pt-12">
    <div class="border-2 border-woodsmoke-900">
      <span class="font-lobster notes-headline w-auto text-4xl text-shadow"
        >goals</span
      >

      <span class="absolute font-rocksalt transform -rotate-12 top-0"
        >weekly</span
      >
      <div class="mt-2 p-4">
        <div class="mt-5">
          <input-marker-background>
            <form
              @submit.prevent="addNewGoal()"
              class="w-full relative flex items-center group"
            >
              <span class="mr-1">-</span>
              <input
                v-model="newGoal"
                type="text"
                class="
                  text-lg
                  px-1
                  relative
                  w-full
                  !border-none
                  outline-none
                  bg-transparent
                  border-b-2 border-woodsmoke-900 border-dotted
                "
              />
              <!--   <span class="absolute w-8 h-8 right-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-check2 cursor-pointer"
                viewBox="0 0 16 16"
                @click="insertNote()"
              >
                <path
                  d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </span> -->
            </form>
          </input-marker-background>
          <div
            class="lg:h-20 h-48 overflow-auto mt-2 resize-y"
            style="min-height: 80px !important"
          >
            <ul class="text-lg">
              <li v-for="(g, i) in goals" :key="i">
                <div class="flex mt-2 items-center">
                  <input
                    type="checkbox"
                    class="
                      h-6
                      border-2
                      bg-transparent
                      border-woodsmoke-500
                      w-6
                      mr-2
                      rounded
                      text-woodsmoke-900
                      shadow-none
                    "
                    @click="updateGoalComplete(g)"
                  />
                  <label> {{ g.title }}</label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import InputMarkerBackground from '@/components/basics/InputMarkerBackground.vue';
import {
  allGoals,
  addGoal,
  fetchGoals,
  updateGoalCompletion,
} from '@/vuetils/useGoal';
import { userSession } from '@/vuetils/useAuth';
export default defineComponent({
  props: {
    goals: {
      type: Array as PropType<Goal[]>,
      required: true,
    },
    weekStart: {
      type: String,
      required: true,
    },
  },
  components: { InputMarkerBackground },
  setup(props) {
    const newGoal = ref('');

    const addNewGoal = async () => {
      if (userSession?.value === null || userSession?.value.user === null) {
        alert('Please log in again');
        return;
      }

      try {
        const task = await addGoal({
          week_start: props.weekStart,
          title: newGoal.value,
          user_id: userSession?.value.user.id,
          is_complete: false,
        });

        if (!task) return;

        allGoals.value.push(task);
        newGoal.value = '';
      } catch (err) {
        console.error('Unknown error when adding todo', err);
      }
    };

    const updateGoalComplete = async (g: Goal) => {
      await updateGoalCompletion(g, !g['is_complete']);
      await fetchGoals(props.weekStart);
    };

    return { newGoal, addNewGoal, updateGoalComplete, allGoals };
  },
});
</script>
<style lang="postcss">
</style>