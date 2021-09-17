import { ref } from "vue";
import { supabase } from "@/lib/supabase";
import { userSession } from "@/vuetils/useAuth";

const weeklyTodos = ref<WeeklyTodo[]>([]);

async function fetchWeeklyTodos(weekStart: string) {
  try {
    const { data: todos, error } =
      await supabase.from("weeklytodos").select("*")
        .eq('week_start', weekStart)
        .eq('user_id', userSession.value?.user?.id);

    if (error) {
      console.log("error", error);
      return;
    }

    if (todos === null) {
      weeklyTodos.value = [];
      return;
    }

    weeklyTodos.value = todos;
  } catch (err) { console.error("Error retrieving data from db", err); }
}

export { weeklyTodos, fetchWeeklyTodos };