<template>
  <div class="border-woodsmoke-900 border-2 h-full">
    <div
      class="
        cursor-pointer
        w-full
        px-2
        py-1
        border-b-2 border-woodsmoke-900
        h-10
      "
    >
      <div @click="addTask()" class="flex justify-between h-full items-center">
        <h3 class="font-elite font-medium text-lg">{{ day }}</h3>
      </div>
    </div>
    <div class="h-48 px-2">
      <input-marker-background>
        <span class="mr-1">-</span>
        <form @submit.prevent="addTask(false)">
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
      <div class="w-full relative overflow-auto h-full">
        <span
          :class="{ 'line-through': t.is_complete }"
          class="cursor-pointer"
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
} from '@/vuetils/useNotebook';
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
    const newTaskInputOpen = ref(false);

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

    return { newTaskInputOpen, newTask, addTask, updateTaskCompletion };
  },
});
</script>

