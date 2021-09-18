import "./assets/style/main.css";
import 'sweetalert2/dist/sweetalert2.min.css';

import App from "./App.vue";
import VueSweetalert2 from 'vue-sweetalert2';
import { createApp } from "vue";
import { supabase } from "./lib/supabase";
import { userSession } from "@/vuetils/useAuth";

createApp(App).use(VueSweetalert2).mount("#app");

/**
 * Keeps track of if the user is logged in or out and will update userSession state accordingly.
 */
supabase.auth.onAuthStateChange((event, session) => {
  userSession.value = session;
});
