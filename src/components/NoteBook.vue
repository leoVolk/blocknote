<template>
  <div class="max-w-screen-xl mx-auto container">
    <div class="bg-mojo-500 rounded-lg px-2 py-1">
      <div class="notebook-inner rounded-lg">
        <div class="flex flex-wrap">
          <div class="lg:w-1/2 w-full px-6 py-4">
            <note-book-header
              @prevWeek="fetchDataLastWeek()"
              @nextWeek="fetchDataNextWeek()"
              :week="week"
            ></note-book-header>

            <weekly-todos
              :weekSart="weekDate"
              :weeklyTodos="weeklyTodos"
            ></weekly-todos>
            <notes :weekStart="weekDate"></notes>
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
import { defineComponent, ref } from 'vue';
import { fetchWeeklyTodos, weeklyTodos } from '@/vuetils/useTodo';
import { startOfWeek, formateToSQLDate } from '@/utils/dateHelper';
import NoteBookHeader from './Notebook/NoteBookHeader.vue';
import WeeklyTodos from './Notebook/WeeklyTodos.vue';
import { handleLogout } from '@/vuetils/useAuth';
import Notes from './Notebook/Notes.vue';
import { fetchNotes } from '@/vuetils/useNote';

export default defineComponent({
  components: { NoteBookHeader, WeeklyTodos, Notes },
  async setup() {
    const currentDate = ref(new Date());
    const week = ref(startOfWeek(currentDate.value));
    const weekDate = ref(formateToSQLDate(week.value));

    const fetchDataLastWeek = async () => {
      currentDate.value = new Date(
        currentDate.value.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      const prevWeek = formateToSQLDate(startOfWeek(currentDate.value));

      week.value = startOfWeek(currentDate.value);
      weekDate.value = formateToSQLDate(week.value);
      await fetchWeeklyTodos(prevWeek);
      await fetchNotes(prevWeek);
    };

    const fetchDataNextWeek = async () => {
      currentDate.value = new Date(
        currentDate.value.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      const prevWeek = formateToSQLDate(startOfWeek(currentDate.value));

      week.value = startOfWeek(currentDate.value);
      weekDate.value = formateToSQLDate(week.value);
      await fetchWeeklyTodos(prevWeek);
      await fetchNotes(prevWeek);
    };

    await fetchWeeklyTodos(weekDate.value);
    await fetchNotes(weekDate.value);

    return {
      weeklyTodos,
      week,
      weekDate,
      handleLogout,
      fetchDataLastWeek,
      fetchDataNextWeek,
      currentDate,
    };
  },
});
</script>
