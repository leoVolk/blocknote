import { ref } from "vue";
import { supabase } from "@/lib/supabase";
import { userSession } from "@/vuetils/useAuth";

const allExpenses = ref<Expense[]>([]);

async function fetchExpenses(weekStart: string) {
  try {
    const { data: expenses, error } = await supabase.from("expenses").select("*").eq('week_start', weekStart)
      .eq('user_id', userSession.value?.user?.id);


    if (error) {
      console.log("error", error);
      return;
    }


    if (expenses === null) {
      allExpenses.value = [];
      return;
    }

    allExpenses.value = expenses;
  } catch (err) {
    console.error("Error retrieving data from db", err);
  }
}

export { allExpenses, fetchExpenses };