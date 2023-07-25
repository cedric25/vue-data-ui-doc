import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { VueUiXy, VueUiTable } from "vue-data-ui";

const app = createApp(App);
app.component("VueUiXy", VueUiXy);
app.component("VueUiTable", VueUiTable);

app.mount('#app')
