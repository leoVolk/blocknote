import { ref } from "vue";
import { supabase } from "@/lib/supabase";
import { userSession } from "@/vuetils/useAuth";

const allGoals = ref<Goal[]>([]);

async function fetchGoals(weekStart: string) {
  try {
    const { data: goals, error } = await supabase.from("goals").select("*").eq('week_start', weekStart)
      .eq('user_id', userSession.value?.user?.id);


    if (error) {
      console.log("error", error);
      return;
    }

    if (goals === null) {
      allGoals.value = [];
      return;
    }

    allGoals.value = goals;

  } catch (error) {
    console.error("Error retrieving data from db", error);
  }
}

async function addGoal(goal: Goal): Promise<null | Goal> {
  try {
    const { data, error } = await supabase.from('goals').insert(goal).single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new goal");
    return data;
  } catch (err) {
    alert("Error");
    console.error("Unknown problem inserting to db", err);
    return null;
  }

}

async function updateGoalCompletion(goal: Goal, isCompleted: boolean) {
  try {
    const { error } = await supabase
      .from("goals")
      .update({ is_complete: isCompleted })
      .eq("id", goal.id)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error updating", error);
      return;
    }


    console.log("Updated task", goal.id);
  } catch (err) {
    alert("Error");
    console.error("Unknown problem updating record", err);
  }
}

export { fetchGoals, addGoal, allGoals, updateGoalCompletion };