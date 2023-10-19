import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';
import { 
    VueUiXy, 
    VueUiTable, 
    VueUiDonut, 
    VueUiWaffle, 
    VueUiRadar, 
    VueUiQuadrant, 
    VueUiGauge,
    VueUiChestnut,
    VueUiOnion,
    VueUiVerticalBar,
    VueUiScreenshot,
    VueUiRating,
    VueUiSkeleton,
    VueUiSparkline,
    VueUiHeatmap,
    VueUiScatter,
    VueUiCandlestick,
    VueUiAgePyramid,
    VueUiSparkbar,
    VueUiDashboard
} from "vue-data-ui";
import "vue-data-ui/style.css";

const pinia = createPinia();

const app = createApp(App).use(router);
app.use(pinia);
app.component("VueUiXy", VueUiXy);
app.component("VueUiTable", VueUiTable);
app.component("VueUiDonut", VueUiDonut);
app.component("VueUiWaffle", VueUiWaffle);
app.component("VueUiRadar", VueUiRadar);
app.component("VueUiQuadrant", VueUiQuadrant);
app.component("VueUiGauge", VueUiGauge);
app.component("VueUiChestnut", VueUiChestnut);
app.component("VueUiOnion", VueUiOnion);
app.component("VueUiVerticalBar", VueUiVerticalBar);
app.component("VueUiScreenshot", VueUiScreenshot);
app.component("VueUiRating", VueUiRating);
app.component("VueUiSkeleton", VueUiSkeleton);
app.component("VueUiSparkline", VueUiSparkline);
app.component("VueUiHeatmap", VueUiHeatmap);
app.component("VueUiScatter", VueUiScatter);
app.component("VueUiCandlestick", VueUiCandlestick);
app.component("VueUiAgePyramid", VueUiAgePyramid);
app.component("VueUiSparkbar", VueUiSparkbar);
app.component("VueUiDashboard", VueUiDashboard);

app.mount('#app')
