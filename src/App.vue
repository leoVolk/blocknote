<template>
  <div id="app" class="w-full transform h-full flex flex-col justify-center">
    <div
      class="
        absolute
        left-0
        top-0
        font-sans
        text-sm
        opacity-50
        text-white
        mx-auto
      "
    >
      work in progress (v.{{ info.version }})
    </div>
    <div
      v-if="showPasswordReset"
      class="w-full h-full flex flex-col justify-center items-center p-4"
    >
      <PasswordReset />
    </div>
    <div
      v-else-if="userSession === null"
      class="w-full h-full flex flex-col justify-center items-center lg:p-4"
    >
      <title>Blocknote | Login</title>
      <Auth />
    </div>
    <div v-else class="lg:m-4 relative">
      <title>Blocknote | Your Notes</title>
      <Suspense>
        <template #default>
          <div class="">
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
import info from '../package.json';
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
    return { userSession, handleLogout, info };
  },
};
</script>
