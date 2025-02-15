<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../stores";
import { useMakerStore } from "../stores/maker"
import { CheckIcon, InfoSquareRoundedIcon } from "vue-tabler-icons"
import MakerXy from "../components/maker/MakerXy.vue"
import MakerDonut from "../components/maker/MakerDonut.vue"
import MakerWaffle from "../components/maker/MakerWaffle.vue"
import MakerRadar from "../components/maker/MakerRadar.vue"
import MakerGauge from "../components/maker/MakerGauge.vue"
import MakerOnion from "../components/maker/MakerOnion.vue"
import MakerQuadrant from "../components/maker/MakerQuadrant.vue"
import MakerWheel from "../components/maker/MakerWheel.vue"
import MakerTiremarks from "../components/maker/MakerTiremarks.vue"
import MakerChestnut from "../components/maker/MakerChestnut.vue"
import MakerVerticalBar from "../components/maker/MakerVerticalBar.vue";
import MakerHeatmap from "../components/maker/MakerHeatmap.vue";
import MakerSparkline from "../components/maker/MakerSparkline.vue";
import MakerSparkStackbar from "../components/maker/MakerSparkStackbar.vue";
import MakerSparkbar from "../components/maker/MakerSparkbar.vue";
import MakerSparkHistogram from "../components/maker/MakerSparkHistogram.vue";
import MakerDonutEvolution from "../components/maker/MakerDonutEvolution.vue";
import MakerRings from "../components/maker/MakerRings.vue";
import MakerScatter from "../components/maker/MakerScatter.vue";
import MakerPyramid from "../components/maker/MakerPyramid.vue";
import MakerMoodRadar from "../components/maker/MakerMoodRadar.vue";
import MakerRelationCircle from "../components/maker/MakerRelationCircle.vue";
import MakerThermometer from "../components/maker/MakerThermometer.vue";
import Maker3dBar from "../components/maker/Maker3dBar.vue";
import MakerNestedDonuts from "../components/maker/MakerNestedDonuts.vue";
import MakerSparkgauge from "../components/maker/MakerSparkgauge.vue";
import MakerGalaxy from "../components/maker/MakerGalaxy.vue";
import MakerKpi from "../components/maker/MakerKpi.vue";
import MakerStripPlot from "../components/maker/MakerStripPlot.vue";
import MakerVueUiWordCloud from "../components/maker/MakerVueUiWordCloud.vue";
import MakerFlow from "../components/maker/MakerFlow.vue";
import Tooltip from "../components/FlexibleTooltip.vue";
import ConfirmCopy from "../components/ConfirmCopy.vue";
import MakerPcp from "../components/maker/MakerPcp.vue";

const store = useMainStore();
const makerStore = useMakerStore();

const translations = computed(() => {
    return store.translations;
})

const makerTranslations = computed(() => {
    return makerStore.translations;
})

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const isCopy = computed(() => store.isCopy);

const options = ref([
    { name: "VueUiXy", icon: "chartLine", thumb: new URL('../assets/thumb_xy_light.png', import.meta.url).href},
    { name: "VueUiDonut", icon: "chartDonut", thumb: new URL('../assets/thumb_donut_light.png', import.meta.url).href},
    { name: "VueUiWaffle", icon: "chartWaffle", thumb: new URL('../assets/thumb_waffle_light.png', import.meta.url).href},
    { name: "VueUiRadar", icon: "chartRadar", thumb: new URL('../assets/thumb_radar_light.png', import.meta.url).href},
    { name: "VueUiGauge", icon: "chartGauge", thumb: new URL('../assets/thumb_gauge_light.png', import.meta.url).href},
    { name: "VueUiOnion", icon: "chartOnion", thumb: new URL('../assets/thumb_onion_light.png', import.meta.url).href},
    { name: "VueUiQuadrant", icon: "chartQuadrant", thumb: new URL('../assets/thumb_quadrant_light.png', import.meta.url).href},
    { name: "VueUiWheel", icon: "chartWheel", thumb: new URL('../assets/thumb_wheel_light.png', import.meta.url).href},
    { name: "VueUiTiremarks", icon: "chartTiremarks", thumb: new URL('../assets/thumb_tiremarks_light.png', import.meta.url).href},
    { name: "VueUiChestnut", icon: "chartChestnut", thumb: new URL('../assets/thumb_chestnut_light.png', import.meta.url).href},
    { name: "VueUiVerticalBar", icon: "chartVerticalBar", thumb: new URL('../assets/thumb_vertical_bar_light.png', import.meta.url).href},
    { name: "VueUiHeatmap", icon: "chartHeatmap", thumb: new URL('../assets/thumb_heatmap_light.png', import.meta.url).href},
    { name: "VueUiStripPlot", icon: "chartStripPlot", thumb: new URL('../assets/thumb_strip_plot_light.png', import.meta.url).href},
    { name: "VueUiSparkline", icon: "chartSparkline", thumb: new URL('../assets/thumb_sparkline_light.png', import.meta.url).href},
    { name: "VueUiSparkStackbar", icon: "chartSparkStackbar", thumb: new URL('../assets/thumb_stackbar_light.png', import.meta.url).href},
    { name: "VueUiSparkbar", icon: "chartSparkbar", thumb: new URL('../assets/thumb_sparkbar_light.png', import.meta.url).href},
    { name: "VueUiSparkHistogram", icon: "chartSparkHistogram", thumb: new URL('../assets/thumb_histogram_light.png', import.meta.url).href},
    { name: "VueUiDonutEvolution", icon: "chartDonutEvolution", thumb: new URL('../assets/thumb_donut_evolution_light.png', import.meta.url).href},
    { name: "VueUiRings", icon: "chartRings", thumb: new URL('../assets/thumb_rings_light.png', import.meta.url).href},
    { name: "VueUiScatter", icon: "chartScatter", thumb: new URL('../assets/thumb_scatter_light.png', import.meta.url).href},
    { name: "VueUiAgePyramid", icon: "chartAgePyramid", thumb: new URL('../assets/thumb_age_pyramid_light.png', import.meta.url).href},
    { name: "VueUiMoodRadar", icon: "chartMoodRadar", thumb: new URL('../assets/thumb_mood_radar_light.png', import.meta.url).href},
    { name: "VueUiRelationCircle", icon: "chartRelationCircle", thumb: new URL('../assets/thumb_relation_circle_light.png', import.meta.url).href},
    { name: "VueUiThermometer", icon: "chartThermometer", thumb: new URL('../assets/thumb_thermometer_light.png', import.meta.url).href},
    { name: "VueUi3dBar", icon: "chart3dBar", thumb: new URL('../assets/thumb_3d_bar_light.png', import.meta.url).href},
    { name: "VueUiNestedDonuts", icon: "chartNestedDonuts", thumb: new URL('../assets/thumb_nested_donuts_light.png', import.meta.url).href},
    { name: "VueUiSparkgauge", icon: "chartGauge", thumb: new URL('../assets/thumb_sparkgauge_light.png', import.meta.url).href},
    { name: "VueUiGalaxy", icon: "chartGalaxy", thumb: new URL('../assets/thumb_galaxy_light.png', import.meta.url).href},
    { name: "VueUiWordCloud", icon: "chartWordCloud", thumb: new URL('../assets/thumb_word_cloud_light.png', import.meta.url).href},
    { name: "VueUiFlow", icon: "chartFlow", thumb: new URL('../assets/thumb_flow_light.png', import.meta.url).href},
    { name: "VueUiParallelCoordinatePlot", icon: "chartParallelCoordinatePlot", thumb: new URL('../assets/thumb_pcp_light.png', import.meta.url).href},
    { name: "VueUiKpi", icon: "legend", thumb: ""},
])

const selectedChart = ref({name: "VueUiXy", icon: "chartLine"});

onMounted(() => {
    if(!localStorage.currentChart) {
        localStorage.setItem('currentChart', 'VueUiXy')
    } else {
        selectedChart.value = options.value.find(item => item.name === localStorage.currentChart)
    }
})

function saveSelectedChartToLocalStorage() {
    localStorage.currentChart = selectedChart.value.name;
}

function selectChart(opt) {
    selectedChart.value = opt;
    saveSelectedChartToLocalStorage()
}

</script>

<template>
    <ConfirmCopy />

    <div class="w-full max-w-[1400px] mx-auto overflow-visible">
        <div class="w-full flex flex-row gap-4 place-items-center justify-center my-12">
            <h1 class="text-[64px] sm:text-[96px] text-center">{{ translations.menu.chartBuilder[store.lang] }}</h1>
        </div>

        <div class="w-full max-w-[400px] flex flex-row flex-wrap gap-2 mx-auto justify-center my-12">
            <div v-for="option in options" class="relative">
                <Tooltip :content="option.name" width="w-fit min-w-[120px]" delay="delay-150" :img="option.thumb">
                    <button  @click="selectChart(option)" :class="`border p-2 rounded hover:bg-[#42d39233] transition-colors ${selectedChart.name === option.name ? 'border-app-blue bg-[#6376DD33] hover:bg-[#6376DD33] shadow-md' : 'border-gray-400 hover:border-app-green '}`">
                        <VueUiIcon :name="option.icon" :stroke="selectedChart.name === option.name ? '#6376DD' : isDarkMode ? '#AAAAAA' : '#1A1A1A'"></VueUiIcon>
                    </button>
                </Tooltip>
            </div>
        </div>

        <div class="w-full mt-6">
            <div class="flex flex-row gap-3 place-items-end justify-center">
                <div class="flex flex-col gap-2">
                    <label for="chartType">{{ makerTranslations.labels.selectChartType[store.lang] }}</label>
                    <select @change="saveSelectedChartToLocalStorage" style="outline:1px solid #5f8bee !important;margin-left:1px" id="chartType" v-model="selectedChart" class="h-[40px] px-6">
                        <option class="text-left" v-for="option in options" :value="option">{{ option.name }}</option>
                    </select>
                </div>
                <div style="margin-bottom:0.3px">
                    <VueUiIcon :size="38" :stroke-width="0.8" :name="selectedChart.icon" :stroke="isDarkMode ? '#5f8bee' : '#1A1A1A'"/>
                </div>
            </div>

                <div class="font-bold flex flex-col sm:flex-row gap-4 justify-center place-items-center my-12 bg-gray-200 dark:bg-[#FFFFFF10] w-fit mx-auto p-4 rounded-full">
                    <div class="py-2 px-4 rounded-full bg-gradient-to-r from-[#42d39210] to-[#42d39230] shadow-md">1. {{ makerTranslations.steps.one[store.lang] }}</div>
                    <div class="hidden sm:block">
                        <VueUiIcon name="arrowRight" stroke="#42d392" class="drop-shadow-lg" />
                    </div>
                    <div class="sm:hidden">
                        <VueUiIcon name="arrowBottom" stroke="#42d392" class="drop-shadow-lg"/>
                    </div>
                    <div class="py-2 px-4 rounded-full bg-gradient-to-r from-[#42d39230] to-[#42d39250] shadow-md">2. {{ makerTranslations.steps.two[store.lang] }}</div>
                    <div class="hidden sm:block">
                        <VueUiIcon name="arrowRight" stroke="#42d392" class="drop-shadow-lg"/>
                    </div>
                    <div class="sm:hidden">
                        <VueUiIcon name="arrowBottom" stroke="#42d392" class="drop-shadow-lg"/>
                    </div>
                    <div class="py-2 px-4 rounded-full bg-gradient-to-r from-[#42d39250] to-[#42d39270]  shadow-md">3. {{ makerTranslations.steps.three[store.lang] }}</div>
                </div>

        </div>

        <MakerXy v-if="selectedChart.name === 'VueUiXy'"/>
        <MakerDonut v-if="selectedChart.name === 'VueUiDonut'"/>
        <MakerWaffle v-if="selectedChart.name === 'VueUiWaffle'"/>
        <MakerRadar v-if="selectedChart.name === 'VueUiRadar'"/>
        <MakerGauge v-if="selectedChart.name === 'VueUiGauge'"/>
        <MakerOnion v-if="selectedChart.name === 'VueUiOnion'"/>
        <MakerQuadrant v-if="selectedChart.name === 'VueUiQuadrant'"/>
        <MakerWheel v-if="selectedChart.name === 'VueUiWheel'"/>
        <MakerTiremarks v-if="selectedChart.name === 'VueUiTiremarks'"/>
        <MakerChestnut v-if="selectedChart.name === 'VueUiChestnut'"/>
        <MakerVerticalBar v-if="selectedChart.name === 'VueUiVerticalBar'"/>
        <MakerHeatmap v-if="selectedChart.name === 'VueUiHeatmap'"/>
        <MakerSparkline v-if="selectedChart.name === 'VueUiSparkline'"/>
        <MakerSparkStackbar v-if="selectedChart.name === 'VueUiSparkStackbar'"/>
        <MakerSparkbar v-if="selectedChart.name === 'VueUiSparkbar'"/>
        <MakerSparkHistogram v-if="selectedChart.name === 'VueUiSparkHistogram'"/>
        <MakerDonutEvolution v-if="selectedChart.name === 'VueUiDonutEvolution'"/>
        <MakerRings v-if="selectedChart.name === 'VueUiRings'"/>
        <MakerScatter v-if="selectedChart.name === 'VueUiScatter'"/>
        <MakerPyramid v-if="selectedChart.name === 'VueUiAgePyramid'"/>
        <MakerMoodRadar v-if="selectedChart.name === 'VueUiMoodRadar'"/>
        <MakerRelationCircle v-if="selectedChart.name === 'VueUiRelationCircle'"/>
        <MakerThermometer v-if="selectedChart.name === 'VueUiThermometer'" />
        <Maker3dBar v-if="selectedChart.name === 'VueUi3dBar'" />
        <MakerNestedDonuts v-if="selectedChart.name === 'VueUiNestedDonuts'" />
        <MakerSparkgauge v-if="selectedChart.name === 'VueUiSparkgauge'" />
        <MakerGalaxy v-if="selectedChart.name === 'VueUiGalaxy'" />
        <MakerKpi v-if="selectedChart.name === 'VueUiKpi'" />
        <MakerStripPlot v-if="selectedChart.name === 'VueUiStripPlot'" />
        <MakerVueUiWordCloud v-if="selectedChart.name === 'VueUiWordCloud'" />
        <MakerFlow v-if="selectedChart.name === 'VueUiFlow'" />
        <MakerPcp v-if="selectedChart.name === 'VueUiParallelCoordinatePlot'" />
    </div>
</template>