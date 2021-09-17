<template>
  <div></div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    weeklyTodos: {
      type: Array as PropType<WeeklyTodo[]>,
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
