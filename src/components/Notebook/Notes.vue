<template>
  <div class="mt-12 border-2 border-woodsmoke-900 mr-2 relative notes">
    <span class="font-lobster notes-headline w-auto text-3xl text-shadow"
      >notes</span
    >
    <div class="mt-2 p-4">
      <div class="">
        <input-marker-background>
          <form
            class="w-full relative flex group"
            @submit.prevent="insertNote()"
          >
            <span class="mr-1">-</span>
            <input
              v-model="newNote"
              type="text"
              class="
                text-lg
                px-1
                relative
                w-full
                !border-none
                outline-none
                bg-transparent
                border-b-2 border-woodsmoke-900 border-dotted
              "
            />
            <!--   <span class="absolute w-8 h-8 right-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-check2 cursor-pointer"
                viewBox="0 0 16 16"
                @click="insertNote()"
              >
                <path
                  d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </span> -->
          </form>
        </input-marker-background>
        <div class="h-20 overflow-auto mt-2">
          <ul class="text-lg">
            <li v-for="(n, i) in allNotes" :key="i">
              <div class="flex justify-between items-center">
                <span>- {{ n.note }}</span>
                <span @click="removeNote(n)" class="cursor-pointer px-2"
                  >x</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputMarkerBackground from '@/components/basics/InputMarkerBackground.vue';
import { allNotes, fetchNotes, addNote, deleteNote } from '@/vuetils/useNote';
import { userSession } from '@/vuetils/useAuth';

export default defineComponent({
  props: {
    weekStart: {
      type: String,
      required: true,
    },
  },
  components: {
    InputMarkerBackground,
  },
  async setup(props) {
    const newNote = ref('');
    await fetchNotes(props.weekStart);

    const insertNote = async () => {
      if (userSession?.value === null || userSession?.value.user === null) {
        alert('Please log in again');
        return;
      }
      if (newNote.value.length < 3) return;
      try {
        const note = await addNote({
          week_start: props.weekStart,
          note: newNote.value,
          user_id: userSession?.value.user.id,
        });

        if (!note) return;

        allNotes.value.push(note);
        newNote.value = '';
      } catch (error) {
        console.error('Unknown error when adding todo', error);
      }
    };

    const removeNote = async (note: Note) => {
      deleteNote(note).then(() => {
        allNotes.value = allNotes.value.filter((n) => n.id !== note.id);
      });
    };
    return { addNote, allNotes, newNote, insertNote, deleteNote, removeNote };
  },
});
</script>


<style lang="postcss">
.notes .notes-headline {
  margin: -28px 28px;
  display: block;
}
</style>