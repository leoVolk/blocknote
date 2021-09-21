<template>
  <div class="border-woodsmoke-900 border-2 h-full weekday-box-shadow">
    <div
      class="w-full px-2 py-1 h-10 lg:border-b-2 lg:border-woodsmoke-900"
      :class="{ 'border-b-2 border-woodsmoke-900': !isCollapsed }"
    >
      <div
        @click="isCollapsed = !isCollapsed"
        class="flex justify-between h-full items-center"
      >
        <h3 class="font-elite font-medium text-lg select-none">{{ day }}</h3>

        <div class="block lg:hidden">
          <span v-if="isCollapsed"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              /></svg
          ></span>
          <span v-else
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div :class="{ 'lg:block hidden': isCollapsed }" class="px-2 w-full">
      <input-marker-background>
        <span class="mr-1">-</span>
        <form class="w-full" @submit.prevent="addTask(false)">
          <input
            v-model="newTask"
            type="text"
            class="
              px-1
              relative
              w-full
              !border-none
              outline-none
              bg-transparent
              border-b-2 border-woodsmoke-900 border-dotted
            "
          />
        </form>
      </input-marker-background>
      <div class="w-full h-40 mt-2 relative overflow-auto">
        <span
          :class="{ 'line-through': t.is_complete }"
          class="cursor-pointer text-lg"
          v-for="(t, i) in todos"
          :key="i"
          @click="updateTaskCompletion(t)"
        >
          - {{ t.task }} <br />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */

import InputMarkerBackground from '@/components/basics/InputMarkerBackground.vue';
import { userSession } from '@/vuetils/useAuth';
import {
  addWeeklyTodo,
  weeklyTodos,
  updateWeeklyTodoCompletion,
  fetchWeeklyTodos,
} from '@/vuetils/useTodo';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  components: { InputMarkerBackground },
  props: {
    todos: {
      type: Array as PropType<WeeklyTodo[]>,
      required: true,
    },
    day: {
      type: String,
      required: false,
      default: '',
    },
    weekStart: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const newTask = ref('');
    const isCollapsed = ref(true);

    const addTask = async (isAppointment: boolean) => {
      if (userSession?.value === null || userSession?.value.user === null) {
        alert('Please log in again');
        return;
      }

      try {
        const task = await addWeeklyTodo({
          week_start: props.weekStart,
          task: newTask.value,
          week_day: props.day.toLowerCase(),
          user_id: userSession?.value.user.id,
          is_appointment: isAppointment,
          is_complete: false,
        });

        if (!task) return;

        weeklyTodos.value.push(task);
        newTask.value = '';
      } catch (err) {
        console.error('Unknown error when adding todo', err);
      }
    };

    const updateTaskCompletion = async (t: WeeklyTodo) => {
      await updateWeeklyTodoCompletion(t, !t['is_complete']);
      await fetchWeeklyTodos(props.weekStart);
    };

    return {
      newTask,
      addTask,
      updateTaskCompletion,
      isCollapsed,
    };
  },
});
</script>

