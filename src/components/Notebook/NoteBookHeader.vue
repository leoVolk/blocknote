<template>
  <div class="w-full">
    <h1 class="text-center font-lobster text-shadow text-6xl">
      Week {{ weekNo }}
    </h1>
    <div class="flex justify-around items-center">
      <span class="cursor-pointer" @click="onPrevWeek"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          /></svg
      ></span>
      <p class="text-center font-semibold font-rocksalt text-xl">
        {{ weekStart }} - {{ weekEnd }}
      </p>
      <span class="cursor-pointer" @click="onNextWeek"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          /></svg
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
import {
  currentWeek,
  startAndEndOfWeek,
  formatDateToMonthAndDay,
} from '@/utils/dateHelper';
export default defineComponent({
  props: {
    week: {
      type: Date,
      required: true,
    },
  },
  emits: ['prevWeek', 'nextWeek'],
  setup(props, { emit }) {
    const weekNo = ref(currentWeek(props.week));
    const weekStart = ref(
      formatDateToMonthAndDay(startAndEndOfWeek(props.week)[0])
    );
    const weekEnd = ref(
      formatDateToMonthAndDay(startAndEndOfWeek(props.week)[1])
    );

    watch(
      () => props.week,
      (newDate) => {
        weekNo.value = currentWeek(newDate);

        const startAndEnd = startAndEndOfWeek(newDate);

        weekStart.value = formatDateToMonthAndDay(startAndEnd[0]);
        weekEnd.value = formatDateToMonthAndDay(startAndEnd[1]);
      }
    );

    const onPrevWeek = () => {
      emit('prevWeek');
    };

    const onNextWeek = () => {
      emit('nextWeek');
    };
    return {
      weekNo,
      weekStart,
      weekEnd,
      onPrevWeek,
      onNextWeek,
    };
  },
});
</script>
