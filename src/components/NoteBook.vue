<template>
  <div
    class="max-w-screen-xl bg-mojo-500 mx-auto container rounded-lg px-2 py-1"
  >
    <div class="notebook-inner rounded-lg">
      <div class="flex flex-wrap">
        <div class="lg:w-1/2 w-full px-6 py-4">
          <note-book-header :week="week"></note-book-header>
          <weekly-todos :weeklyTodos="weeklyTodos"></weekly-todos>
        </div>
        <div class="lg:w-1/2 w-full px-6 py-4"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchWeeklyTodos, weeklyTodos } from '@/vuetils/useNotebook';
import { startOfWeek, formateToSQLDate } from '@/utils/dateHelper';
import NoteBookHeader from './Notebook/NoteBookHeader.vue';
import WeeklyTodos from './Notebook/WeeklyTodos.vue';

export default defineComponent({
  components: { NoteBookHeader, WeeklyTodos },
  async setup() {
    const week = startOfWeek(new Date());
    const weekDate = formateToSQLDate(week);

    await fetchWeeklyTodos(weekDate);

    return {
      weeklyTodos,
      week,
    };
  },
});
</script>
