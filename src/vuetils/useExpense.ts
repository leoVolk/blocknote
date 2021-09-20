import { ref } from "vue";
import { supabase } from "@/lib/supabase";
import { userSession } from "@/vuetils/useAuth";

const allExpenses = ref<Expense>();

async function fetchExpenses(weekStart: string) {
  try {
    const { data: expenses, error } = await supabase.from("expenses").select("*").eq('week_start', weekStart)
      .eq('user_id', userSession.value?.user?.id);


    if (error) {
      console.log("error", error);
      return;
    }


    if (expenses === null) {
      allExpenses.value = undefined;
      return;
    }

    allExpenses.value = expenses[0];
  } catch (err) {
    console.error("Error retrieving data from db", err);
  }
}

async function addExpenses(expense: Expense): Promise<null | Expense> {
  try {
    const { data, error } = await supabase.from('expenses').insert(expense).single(); if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new todo");
    return data;
  } catch (err) {
    alert("Error");
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

async function updateExpenses(expense: Expense, newExpense: {
  bills?: number;
  rent?: number;
  food?: number;
  activities?: number;
  transport?: number;
  other?: number;
  savings?: number;
}) {
  try {
    const { error } = await supabase.from('expenses').update({ ...newExpense }).eq('id', expense.id).single();

    if (error) {
      alert(error.message);
      console.error("There was an error updating", error);
      return;
    }
  } catch (err) {
    alert("Error");
    console.error("Unknown problem updating record", err);
  }
}

export { allExpenses, fetchExpenses, addExpenses, updateExpenses };