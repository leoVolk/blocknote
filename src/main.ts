import "./assets/style/main.css";
import 'sweetalert2/dist/sweetalert2.min.css';

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
