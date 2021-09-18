<template>
  <div class="border-woodsmoke-900 relative border-2 h-full">
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
      <div
        @click="newTaskInputOpen = true"
        v-if="!newTaskInputOpen"
        class="flex justify-between h-full items-center"
      >
        <h3 class="font-elite font-medium text-lg">{{ day }}</h3>
        <span class=""
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-journal-plus"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
            />
            <path
              d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"
            />
            <path
              d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"
            /></svg
        ></span>
      </div>

      <div class="h-full flex justify-between items-center" v-else>
        <input
          placeholder="Add task..."
          class="w-full p-1 h-full mr-2 border-woodsmoke-900 border-2"
          type="text "
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-check-lg"
          viewBox="0 0 16 16"
        >
          <path
            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </div>
    </div>
    <div class="h-48">
      <div class="w-full p-2 relative" style="height: 50%">
        <span v-for="(t, i) in tasks" :key="i"> - {{ t.task }} </span>
      </div>
      <div class="w-full p-2" style="height: 50%"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';

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

    const newTaskInputOpen = ref(false);

    return { appointments, tasks, newTaskInputOpen };
  },
});
</script>
