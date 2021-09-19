<template>
  <div class="max-w-screen-xl mx-auto container">
    <div class="bg-mojo-500 rounded-lg px-2 py-1">
      <div class="notebook-inner rounded-lg">
        <div class="flex flex-wrap">
          <div class="lg:w-1/2 w-full px-6 py-4">
            <note-book-header :week="week"></note-book-header>
            <weekly-todos
              :weekSart="weekDate"
              :weeklyTodos="weeklyTodos"
            ></weekly-todos>
            <notes></notes>
          </div>
          <div class="lg:w-1/2 w-full px-6 py-4"></div>
        </div>
      </div>
    </div>
    <div class="w-full mt-4 flex justify-end">
      <button
        @click="handleLogout()"
        class="btn-oAuth font-elite btn-auth shadow-box bg-buttery-white-500"
      >
        Sign Out
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchWeeklyTodos, weeklyTodos } from '@/vuetils/useNotebook';
import { startOfWeek, formateToSQLDate } from '@/utils/dateHelper';
import NoteBookHeader from './Notebook/NoteBookHeader.vue';
import WeeklyTodos from './Notebook/WeeklyTodos.vue';
import { handleLogout } from '@/vuetils/useAuth';
import Notes from './Notebook/Notes.vue';

export default defineComponent({
  components: { NoteBookHeader, WeeklyTodos, Notes },
  async setup() {
    const week = startOfWeek(new Date());
    const weekDate = formateToSQLDate(week);

    await fetchWeeklyTodos(weekDate);

    return {
      weeklyTodos,
      week,
      weekDate,
      handleLogout,
    };
  },
});
</script>
