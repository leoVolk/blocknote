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
    <div class="h-48">
      <div class="w-full p-2 relative overflow-auto h-full">
        <div class="flex relative items-center">
          <div
            class="
              absolute
              w-full
              bg-pink-600
              h-full
              opacity-25
              transform
              rotate-2
              rounded-md
            "
          ></div>
          <div
            class="
              absolute
              w-full
              bg-pink-600
              h-full
              transform
              -rotate-3
              rounded-md
            "
            style="opacity: 0.1"
          ></div>
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
                border-b-2 border-woodsmoke-900
              "
            />
          </form>
        </div>
        <span v-for="(t, i) in todos" :key="i"> - {{ t.task }} <br /> </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */

import { userSession } from '@/vuetils/useAuth';
import { addWeeklyTodo, weeklyTodos } from '@/vuetils/useNotebook';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
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

    return { newTaskInputOpen, newTask, addTask };
  },
});
</script>

