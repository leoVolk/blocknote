<template>
  <div class="max-w-screen-xl mx-auto container transform">
    <div class="bg-mojo-500 rounded-lg lg:px-2 lg:py-1">
      <div class="notebook-inner lg:rounded-lg">
        <div class="flex flex-wrap">
          <div class="xl:w-1/2 w-full px-6 py-4">
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
          <div class="xl:w-1/2 w-full px-6 py-4">
            <div class="flex flex-wrap lg:flex-no-wrap">
              <div class="lg:w-1/2 w-full order-2 lg:order-1">
                <weekly-expenses
                  :weekStart="weekDate"
                  :expenses="allExpenses"
                ></weekly-expenses>
              </div>
              <div class="lg:w-1/2 order-1 lg:order-2 w-full my-8 mx-8">
                <note-book-image></note-book-image>
              </div>
            </div>
          </div>
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
import WeeklyExpenses from './Notebook/WeeklyExpenses.vue';
import { allExpenses, fetchExpenses } from '@/vuetils/useExpense';
import NoteBookImage from './Notebook/NoteBookImage.vue';
export default defineComponent({
  components: {
    NoteBookHeader,
    WeeklyTodos,
    Notes,
    WeeklyExpenses,
    NoteBookImage,
  },
  async setup() {
    const currentDate = ref(new Date());
    const week = ref(startOfWeek(currentDate.value));
    const weekDate = ref(formateToSQLDate(week.value));

    const updateData = async (week: string) => {
      await fetchExpenses(week);
      await fetchWeeklyTodos(week);
      await fetchNotes(week);
    };

    const fetchDataLastWeek = async () => {
      currentDate.value = new Date(
        currentDate.value.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      const prevWeek = formateToSQLDate(startOfWeek(currentDate.value));

      week.value = startOfWeek(currentDate.value);
      weekDate.value = formateToSQLDate(week.value);
      updateData(prevWeek);
    };

    const fetchDataNextWeek = async () => {
      currentDate.value = new Date(
        currentDate.value.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      const nextWeek = formateToSQLDate(startOfWeek(currentDate.value));

      week.value = startOfWeek(currentDate.value);
      weekDate.value = formateToSQLDate(week.value);
      updateData(nextWeek);
    };

    updateData(weekDate.value);

    return {
      weeklyTodos,
      week,
      weekDate,
      handleLogout,
      fetchDataLastWeek,
      fetchDataNextWeek,
      currentDate,
      allExpenses,
    };
  },
});
</script>
