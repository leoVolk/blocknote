<template>
  <div class="w-full">
    <h1 class="text-center font-lobster text-shadow text-6xl">
      Week {{ weekNo }}
    </h1>

    <p class="text-center font-semibold font-rocksalt text-xl">
      {{ weekStart }} - {{ weekEnd }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
  setup(props) {
    const weekNo = currentWeek(props.week);
    const weekStart = formatDateToMonthAndDay(startAndEndOfWeek(props.week)[0]);
    const weekEnd = formatDateToMonthAndDay(startAndEndOfWeek(props.week)[1]);

    return {
      weekNo,
      weekStart,
      weekEnd,
    };
  },
});
</script>
