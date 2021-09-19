<template>
  <div class="flex relative flex-wrap my-6">
    <div class="lg:w-1/3 w-full pr-2 my-2">
      <weekly-todo
        day="Monday"
        :weekStart="weekSart"
        :todos="mondayTodos"
      ></weekly-todo>
    </div>
    <div class="lg:w-1/3 w-full pr-2 my-2">
      <weekly-todo
        day="Tuesday"
        :weekStart="weekSart"
        :todos="tuesdayTodos"
      ></weekly-todo>
    </div>
    <div class="lg:w-1/3 w-full pr-2 my-2">
      <weekly-todo
        day="Wednesday"
        :weekStart="weekSart"
        :todos="wednesdayTodos"
      ></weekly-todo>
    </div>
    <div class="lg:w-1/3 w-full pr-2 my-2">
      <weekly-todo
        day="Thursday"
        :weekStart="weekSart"
        :todos="thursdayTodos"
      ></weekly-todo>
    </div>
    <div class="lg:w-1/3 w-full pr-2 my-2">
      <weekly-todo
        day="Friday"
        :weekStart="weekSart"
        :todos="fridayTodos"
      ></weekly-todo>
    </div>
    <div class="lg:w-1/3 w-full pr-2 my-2">
      <weekly-todo
        day="Weekend"
        :weekStart="weekSart"
        :todos="weekendTodos"
      ></weekly-todo>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import WeeklyTodo from './WeeklyTodos/WeeklyTodo.vue';

export default defineComponent({
  components: { WeeklyTodo },
  props: {
    weeklyTodos: {
      type: Array as PropType<WeeklyTodo[]>,
      required: true,
    },
    weekSart: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const mondayTodos = computed(() =>
      props.weeklyTodos.filter((t: WeeklyTodo) => t.week_day === 'monday')
    );

    const tuesdayTodos = computed(() =>
      props.weeklyTodos.filter((t: WeeklyTodo) => t.week_day === 'tuesday')
    );

    const wednesdayTodos = computed(() =>
      props.weeklyTodos.filter((t: WeeklyTodo) => t.week_day === 'wednesday')
    );

    const thursdayTodos = computed(() =>
      props.weeklyTodos.filter((t: WeeklyTodo) => t.week_day === 'thursday')
    );

    const fridayTodos = computed(() =>
      props.weeklyTodos.filter((t: WeeklyTodo) => t.week_day === 'friday')
    );

    const weekendTodos = computed(() =>
      props.weeklyTodos.filter((t: WeeklyTodo) => t.week_day === 'weekend')
    );

    return {
      mondayTodos,
      tuesdayTodos,
      wednesdayTodos,
      thursdayTodos,
      fridayTodos,
      weekendTodos,
    };
  },
});
</script>
