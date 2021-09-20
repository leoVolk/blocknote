import { ref } from "vue";
import { supabase } from "@/lib/supabase";
import { userSession } from "@/vuetils/useAuth";

const allNotes = ref<Note[]>([]);


async function fetchNotes(weekStart: string) {
  try {
    const { data: notes, error } = await supabase.from("notes").select("*").eq('week_start', weekStart)
      .eq('user_id', userSession.value?.user?.id);


    if (error) {
      console.log("error", error);
      return;
    }


    if (notes === null) {
      allNotes.value = [];
      return;
    }

    allNotes.value = notes;
  } catch (err) {
    console.error("Error retrieving data from db", err);
  }
}

async function addNote(note: Note): Promise<null | Note> {
  try {
    const { data, error } = await supabase.from('notes').insert(note).single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new note");
    return data;
  } catch (err) {
    alert("Error");
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

async function deleteNote(note: Note) {
  try {
    await supabase.from('notes').delete().eq('id', note.id);
    console.log('deleted note', note.id);
  } catch (error) {
    console.error('error', error);

  }
}

export { allNotes, fetchNotes, addNote, deleteNote };