import "./assets/style/main.css";
import './registerServiceWorker';

import App from "./App.vue";
import { createApp } from "vue";
import { supabase } from "./lib/supabase";
import { userSession } from "@/vuetils/useAuth";

createApp(App).mount("#app");

/**
 * Keeps track of if the user is logged in or out and will update userSession state accordingly.
 */
supabase.auth.onAuthStateChange((event, session) => {
  userSession.value = session;
});
