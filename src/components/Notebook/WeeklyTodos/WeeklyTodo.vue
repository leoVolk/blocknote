<template>
  <div class="border-woodsmoke-900 border-2 h-full weekday-box-shadow">
    <div
      class="w-full px-2 py-1 h-10"
      :class="{ 'border-b-2 border-woodsmoke-900': !isCollapsed }"
    >
      <div
        @click="isCollapsed = !isCollapsed"
        class="flex justify-between h-full items-center"
      >
        <h3 class="font-elite font-medium text-lg select-none">{{ day }}</h3>

        <div class="block lg:hidden">
          <span v-if="isCollapsed">open</span>
          <span v-else>close </span>
        </div>
      </div>
    </div>
    <div :class="{ 'lg:block hidden': isCollapsed }" class="px-2">
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

