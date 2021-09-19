<template>
  <div id="app" class="w-full h-full flex flex-col justify-center">
    <div
      v-if="showPasswordReset"
      class="w-full h-full flex flex-col justify-center items-center p-4"
    >
      <PasswordReset />
    </div>
    <div
      v-else-if="userSession === null"
      class="w-full h-full flex flex-col justify-center items-center p-4"
    >
      <title>Blocknote | Login</title>
      <Auth />
    </div>
    <div v-else class="m-4 relative">
      <title>Blocknote | Your Notes</title>
      <Suspense>
        <template #default>
          <div>
            <note-book />
          </div>
        </template>
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script>
import Auth from '@/components/Auth.vue';
import PasswordReset from '@/components/PasswordReset.vue';
import Loading from '@/components/Loading.vue';
import { userSession, handleLogout } from '@/vuetils/useAuth';
import { getParameterByName } from '@/lib/helpers';
import NoteBook from './components/NoteBook.vue';

export default {
  components: {
    Auth,
    PasswordReset,
    Loading,
    NoteBook,
  },
  computed: {
    showPasswordReset: function () {
      const requestType = getParameterByName('type', location.href);
      return requestType === 'recovery';
    },
  },
  setup() {
    return { userSession, handleLogout };
  },
};
</script>
