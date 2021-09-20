<template>
  <main
    class="
      w-full
      container
      sm:w-1/2
      xl:w-1/3
      max-w-screen-md
      bg-mojo-500
      rounded-2xl
    "
  >
    <div class="mx-2 my-1 bg-buttery-white-500 p-6 rounded-2xl">
      <h1 class="font-lobster text-center text-6xl text-shadow">Welcome</h1>
      <p class="text-center text-xl font-elite">
        Please sign into your profile or sign up for blocknote!
      </p>
      <div class="w-full my-4">
        <div class="w-full mb-4">
          <label for="" class="text-lg mb-2 font-elite">Email:</label>
          <input
            class="w-full login-input text-xl font-elite font-thin"
            type="text"
            v-model="email"
          />
        </div>
        <div class="w-full mb-4">
          <label for="" class="text-lg font-elite mb-4">Password:</label>
          <input
            class="w-full login-input text-xl font-elite font-thin"
            type="password"
            v-model="password"
          />
        </div>
      </div>

      <div>
        <button
          @click="handleLogin({ email, password })"
          class="btn-auth text-xl font-elite mb-4 w-full shadow-box"
        >
          Sign In
        </button>
        <button
          @click="handleSignup({ email, password })"
          class="btn-auth text-xl font-elite w-full shadow-box"
        >
          Sign Up
        </button>
      </div>

      <div class="w-full my-8 relative flex justify-around items-center">
        <span class="border-t-2 border-woodsmoke-900 w-full"></span>
        <h3 class="text-2xl font-semibold text-center px-4 font-elite">OR</h3>
        <span class="border-t-2 border-woodsmoke-900 w-full"></span>
      </div>

      <div class="flex relative cursor-not-allowed">
        <div class="pr-2 w-1/2 font-elite">
          coming soon
          <button
            disabled
            @click="handleOAuthLogin('github')"
            class="btn-oAuth font-elite btn-auth shadow-box opacity-25"
          >
            <span>Use Github</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-github"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </button>
        </div>
        <div class="pl-2 w-1/2 font-elite">
          coming soon
          <button
            disabled
            @click="handleOAuthLogin('google')"
            class="btn-oAuth font-elite btn-auth shadow-box opacity-25"
          >
            <span>Use Google</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-google"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
              />
            </svg>
          </button>
        </div>
        <div class="absolute inset-0"></div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  handleLogin,
  handleOAuthLogin,
  handleSignup,
  handlePasswordReset,
} from '@/vuetils/useAuth';

export default defineComponent({
  name: 'Auth',

  setup() {
    const email = ref('');
    const password = ref('');

    return {
      email,
      password,
      handleLogin,
      handleOAuthLogin,
      handleSignup,
      handlePasswordReset,
    };
  },
});
</script>


<style lang="postcss" scoped>
.btn-oAuth {
  @apply text-xl w-full
              mb-4
              items-center
              flex
              justify-between;
}
</style>