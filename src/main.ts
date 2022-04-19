import app from "./plugins/app";
/*
ToDo TailWind CSS
*/
import './assets/css/index.css'

/*
ToDo Plugins
*/

import './plugins'
import { useAuthStore } from '@/store/authStore'

app.mount('#app')

/*
ToDo Init information user (profile, isLoggedIn, stateBrowser and userType)
*/
const authStore = useAuthStore()
authStore.init()


