<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkTrend from "../themes/ThemesVueUiSparkTrend.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from "../BaseNumberInput.vue";


const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const positiveDs = ref([1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
const neutralDs = ref([10, 12, 8, 4, 9, 6, 7, 4, 8, 8])
const negativeDs = ref([89, 55, 34, 21, 13, 8, 5, 3, 2, 1])

const config = ref({
    style: {
        backgroundColor: "#F3F4F6",
        fontFamily: "inherit",
        animation: {
            show: true,
            animationFrames: 20
        },
        line: {
            stroke: "#2D353C",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            smooth: true,
            useColorTrend: true
        },
        area: {
            show: true,
            useGradient: true,
            opacity: 20
        },
        dataLabel: {
            show: true,
            useColorTrend: true,
            color: "#2D353C",
            fontSize: 14,
            bold: false,
            prefix: "",
            suffix: "",
            rounding: 0
        },
        trendLabel: {
            trendType: "n-1",
            useColorTrend: true,
            color: "#2D353C",
            fontSize: 14,
            bold: true,
            rounding: 0
        },
        arrow: {
            colors: {
                positive: "#42d392",
                neutral: "#7f7f7f",
                negative: "#ff6400"
            }
        },
        padding: {
            top: 12,
            left: 82,
            right: 12,
            bottom: 12
        }
    }
})

const darkModeConfig = ref({
    style: {
        backgroundColor: "#1A1A1A",
        fontFamily: "inherit",
        animation: {
            show: true,
            animationFrames: 20
        },
        line: {
            stroke: "#CCCCCC",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            smooth: true,
            useColorTrend: true
        },
        area: {
            show: true,
            useGradient: true,
            opacity: 20
        },
        dataLabel: {
            show: true,
            useColorTrend: true,
            color: "#CCCCCC",
            fontSize: 14,
            bold: false,
            prefix: "",
            suffix: "",
            rounding: 0
        },
        trendLabel: {
            trendType: "n-1",
            useColorTrend: true,
            color: "#CCCCCC",
            fontSize: 14,
            bold: true,
            rounding: 0
        },
        arrow: {
            colors: {
                positive: "#42d392",
                neutral: "#7f7f7f",
                negative: "#ff6400"
            }
        },
        padding: {
            top: 12,
            left: 82,
            right: 12,
            bottom: 12
        }
    }
})

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
}

function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
} 

const configCode = ref(null)
const showAllConfig = ref(false);

watch(() => showAllConfig.value, (v) => {
    if (v) {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => d.setAttribute('open', 'true'))
    } else {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => {
            if (d.hasAttribute('open')) {
                d.removeAttribute('open')
            }
        })
    }
})

</script>

<template>
    <div>
      <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="trend" stroke="#42d392" :strokeWidth="1.5" />
            VueUiSparkTrend
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.trend[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
          <button @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <div class="flex flex-col gap-4 max-w-[350px] mx-auto">
                <Suspense>
                    <template #default>
                        <VueDataUi component="VueUiSparkTrend" :dataset="positiveDs" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
                    </template>
                    <template #fallback>
                        <div class="min-h-[200px]"></div>
                    </template>
                </Suspense>
                <Suspense>
                    <template #default>
                        <VueDataUi component="VueUiSparkTrend" :dataset="neutralDs" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
                    </template>
                    <template #fallback>
                        <div class="min-h-[200px]"></div>
                    </template>
                </Suspense>
                <Suspense>
                    <template #default>
                        <VueDataUi component="VueUiSparkTrend" :dataset="negativeDs" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
                    </template>
                    <template #fallback>
                        <div class="min-h-[200px]"></div>
                    </template>
                </Suspense>
            </div>
        </div>

        <BaseDocActions
            targetLink="vue-ui-spark-trend"
            :configSource="mainConfig.vue_ui_spark_trend"
        />

        <Box showThemes schema="vue_ui_spark_trend">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="border-b my-6 pb-6 border-gray-700">
                    TS type: <code class="text-app-green">number[]</code>
                </div>
                <div class="w-full">
                    {{ translations.docs.example[store.lang] }} :
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = [1, 2, 3, 5, 8, -13, 21, 34];
</code>
</pre>
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiSparkTrendConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiSparkTrendConfig" equal>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")</span>
            <BaseDetails attr="animation" :level="2" title="style.animation">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.animation.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.animation.show" @change="forceChartUpdate()">, (default: true)</span>
                <span>animationFrames: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="5" max="60" v-model="mutableConfigDarkMode.style.animation.animationFrames" @change="forceChartUpdate()"><input v-else type="range" class="accent-app-blue" min="5" max="60" v-model="mutableConfig.style.animation.animationFrames" @change="forceChartUpdate()" >, (default: 20)</span>
            </BaseDetails>
            <BaseDetails attr="area" :level="2" title="style.area">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.area.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.area.show" @change="forceChartUpdate()">, (default: true)</span>
                <span>useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.area.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.area.useGradient" @change="forceChartUpdate()">, (default: true)</span>
                <span>opacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.area.opacity" @change="forceChartUpdate()"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.area.opacity" @change="forceChartUpdate()" >, (default: 20)</span>
            </BaseDetails>
            <BaseDetails attr="arrow" :level="2" title="style.arrow">
                <BaseDetails attr="colors" :level="3" title="style.arrow.colors">
                    <span>positive: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.arrow.colors.positive"><input v-else type="color" v-model="mutableConfig.style.arrow.colors.positive">, (default: "#2ca02c")</span>
                    <span>neutral: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.arrow.colors.neutral"><input v-else type="color" v-model="mutableConfig.style.arrow.colors.neutral">, (default:"#A1A1A1")</span>
                    <span>negative:<input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.arrow.colors.negative"><input v-else type="color" v-model="mutableConfig.style.arrow.colors.negative">, (default: "#dc3912")</span>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="dataLabel" :level="2" title="style.dataLabel">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.dataLabel.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.dataLabel.show" @change="forceChartUpdate()">, (default: true)</span>
                <span>useColorTrend: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.dataLabel.useColorTrend" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.dataLabel.useColorTrend" @change="forceChartUpdate()">, (default: true)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.dataLabel.color"><input v-else type="color" v-model="mutableConfig.style.dataLabel.color">, (default: "#2D353C")</span>
                <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.dataLabel.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.dataLabel.fontSize">, (default: 14)</span>
                <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.dataLabel.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.dataLabel.bold" @change="forceChartUpdate()">, (default: false)</span>
                <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.dataLabel.prefix"><input v-else type="text" v-model="mutableConfig.style.dataLabel.prefix">, (default: "")</span>
                <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.dataLabel.suffix"><input v-else type="text" v-model="mutableConfig.style.dataLabel.suffix">, (default: "")</span>
                <span>rounding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.dataLabel.rounding" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.dataLabel.rounding" :min="0" :max="6"/>, (default: 0)</span>
            </BaseDetails>
            <BaseDetails attr="line" :level="2" title="style.line">
                <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.line.stroke"><input v-else type="color" v-model="mutableConfig.style.line.stroke">, (default: "#2D353C")</span>
                <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.line.strokeWidth" :min="0.1" :max="12" :step="0.1"/><BaseNumberInput v-else v-model:value="mutableConfig.style.line.strokeWidth" :min="0.1" :max="12" :step="0.1"/>, (default: 2)</span>
                <span>strokeLinecap: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.line.strokeLinecap"><option>round</option><option>square</option><option>butt</option></select><select v-else v-model="mutableConfig.style.line.strokeLinecap"><option>round</option><option>square</option><option>butt</option></select> (default: "round"),</span>
                <span>strokeLinejoin: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.line.strokeLinejoin"><option>round</option><option>bevel</option><option>arcs</option><option>miter</option><option>miter-clip</option></select><select v-else v-model="mutableConfig.style.line.strokeLinejoin"><option>round</option><option>bevel</option><option>arcs</option><option>miter</option><option>miter-clip</option></select>, (default: "round")</span>
                <span>smooth: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.line.smooth" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.line.smooth" @change="forceChartUpdate()">, (default: true)</span>
                <span>useColorTrend: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.line.useColorTrend" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.line.useColorTrend" @change="forceChartUpdate()">, (default: true)</span>
            </BaseDetails>
            <BaseDetails attr="padding" :level="2" title="style.padding">
                <span>top: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.padding.top" :min="0" :max="120"/><BaseNumberInput v-else v-model:value="mutableConfig.style.padding.top" :min="0" :max="120"/>, (default: 12)</span>
                <span>right: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.padding.right" :min="0" :max="120"/><BaseNumberInput v-else v-model:value="mutableConfig.style.padding.right" :min="0" :max="120"/>, (default: 12)</span>
                <span>bottom: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.padding.bottom" :min="0" :max="120"/><BaseNumberInput v-else v-model:value="mutableConfig.style.padding.bottom" :min="0" :max="120"/>, (default: 12)</span>
                <span>left: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.padding.left" :min="0" :max="120"/><BaseNumberInput v-else v-model:value="mutableConfig.style.padding.left" :min="0" :max="120"/>, (default: 82)</span>
            </BaseDetails>
            <BaseDetails attr="trendLabel" :level="2" title="style.trendLabel">
                <span>trendType: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.trendLabel.trendType"><option>global</option><option>n-1</option><option>lastToFirst</option></select> ,(default: "global")</span>
                <span>useColorTrend: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.trendLabel.useColorTrend" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.trendLabel.useColorTrend" @change="forceChartUpdate()">, (default: true)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.trendLabel.color"><input v-else type="color" v-model="mutableConfig.style.trendLabel.color">, (default: "#2D353C")</span>
                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.trendLabel.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.trendLabel.fontSize" :min="8" :max="42"/>, (default: 14)</span>
                <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.trendLabel.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.trendLabel.bold" @change="forceChartUpdate()">, (default: true)</span>
                <span>rounding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.trendLabel.rounding" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.trendLabel.rounding" :min="0" :max="6"/>, (default: 0)</span>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>

            </template>

            <template #tab6>
                <ThemesVueUiSparkTrend />
            </template>
        </Box>
    </div>
</template>