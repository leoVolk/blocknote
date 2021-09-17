<template>
  <div class="border-woodsmoke-900 border-2">
    <div class="w-full px-2 py-1 border-b-2 border-woodsmoke-900">
      <h3 class="font-elite font-medium text-lg">{{ day }}</h3>
    </div>
    <div class="w-full">
      <span class="" v-for="(t, i) in tasks" :key="i">
        {{ t.task }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

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
  },
  setup(props) {
    const appointments = computed(() => {
      return props.todos?.filter((t: WeeklyTodo) => t.is_appointment);
    });

    const tasks = computed(() => {
      return props.todos?.filter((t: WeeklyTodo) => !t.is_appointment);
    });

    console.log(tasks.value);

    return { appointments, tasks };
  },
});
</script>
