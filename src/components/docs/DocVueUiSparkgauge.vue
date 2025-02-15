<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkgauge from "../themes/ThemesVueUiSparkgauge.vue";
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

const dataset1 = ref({
    value: -6,
    min: -10,
    max: 10,
    title: "KPI 1"
})
const dataset2 = ref({
    value: 0,
    min: -10,
    max: 10,
    title: "KPI 2"
})
const dataset3 = ref({
    value: 8,
    min: -10,
    max: 10,
    title: "KPI 3"
})

const config = ref({
    style: {
        fontFamily: "inherit",
        background: "#F3F4F6",
        height: 84,
        basePosition: 72,
        animation: {
            show: true,
            speedMs: 150
        },
        title: {
            show: true,
            fontSize: 12,
            position: "bottom",
            textAlign: "center",
            bold: false,
            color: "#1A1A1A"
        },
        dataLabel: {
            fontSize: 24,
            autoColor: true,
            color: "#1A1A1A",
            offsetY: 0,
            bold: true,
            rounding: 0,
            prefix: "",
            suffix: ""
        },
        colors: {
            min: "#FF0000",
            max: "#00FF00",
            showGradient: true,
        },
        track: {
            autoColor: true,
            color: "#5f8bee",
            strokeLinecap: "round"
        },
        gutter: {
            color: "#E1E5E8",
            strokeLinecap: "round"
        }
    }
})

const darkModeConfig = ref({
    style: {
        fontFamily: "inherit",
        background: "#1A1A1A",
        height: 84,
        basePosition: 72,
        animation: {
            show: true,
            speedMs: 150
        },
        title: {
            show: true,
            fontSize: 12,
            position: "bottom",
            textAlign: "center",
            bold: false,
            color: "#6A6A6A"
        },
        dataLabel: {
            fontSize: 20,
            autoColor: true,
            color: "#CCCCCC",
            offsetY: 0,
            bold: true,
            rounding: 0,
            prefix: "",
            suffix: ""
        },
        colors: {
            min: "#FF0000",
            max: "#00FF00",
            showGradient: true,
        },
        track: {
            autoColor: true,
            color: "#5f8bee",
            strokeLinecap: "round"
        },
        gutter: {
            color: "#3A3A3A",
            strokeLinecap: "round"
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
            <VueUiIcon name="chartGauge" stroke="#42d392" :strokeWidth="1.5" />
            VueUiSparkgauge
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.gauge[store.lang] }}
        </p>
        <button v-if="!isFixed" @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <div class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
                </button>
        <div class="w-3/4 mx-auto flex flex-row gap-2">
            
            <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : ''}`">
                <button v-if="isFixed" @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <PinnedOffIcon/>
                </button>
                <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="flex flex-row gap-4">
                    <div class="w-[100px]">
                        <Suspense>
                            <template #default>
                                <VueUiSparkgauge :dataset="dataset1" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_1_${key}`"/>
                            </template>
                            <template #fallback>
                                <div class="min-h-[100px]"></div>
                            </template>
                        </Suspense>
                    </div>
                    <div class="w-[100px]">
                        <Suspense>
                            <template #default>
                                <VueUiSparkgauge :dataset="dataset2" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_1_${key}`"/>
                            </template>
                            <template #fallback>
                                <div class="min-h-[100px]"></div>
                            </template>
                        </Suspense>
                    </div>
                    <div class="w-[100px]">
                        <Suspense>
                            <template #default>
                                <VueUiSparkgauge :dataset="dataset3" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_1_${key}`"/>
                            </template>
                            <template #fallback>
                                <div class="min-h-[100px]"></div>
                            </template>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>

        <BaseDocActions
            targetLink="vue-ui-sparkgauge"
            targetMaker="VueUiSparkgauge"
            :configSource="mainConfig.vue_ui_sparkgauge"
        />

        <Box showThemes schema="vue_ui_sparkgauge">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiSparkgaugeDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
                    <pre>
<code>
    {
        value: number;
        min: number;
        max: number;
        title?: string;
    }
</code>
</pre>                     
                </div>
                {{ translations.docs.example[store.lang] }}
                <div class="w-full overflow-x auto">
<pre>
<code>
    const <span class="text-black dark:text-app-green">dataset: VueUiSparkgaugeDataset</span> = {
        value: -8,
        min: -10,
        max: 10,
        title: 'KPI 1'
    }
</code>
</pre>               
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiGaugeConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiSparkgaugeConfig" equal>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <BaseDetails attr="style" level="1">
            <span>fontFamily: "inherit",</span>
            <span>background: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.background"><input v-else type="color" v-model="mutableConfig.style.background">,  (default: "#FFFFFF")</span>
            <span>height: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.height" :min="84" :max="150"/><BaseNumberInput v-else v-model:value="mutableConfig.style.height" :min="84" :max="150"/>, (default: 84; selected: {{ isDarkMode ? mutableConfigDarkMode.style.height : mutableConfig.style.height }})</span>
            <span>basePosition: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.basePosition" :min="72" :max="150"/><BaseNumberInput v-else v-model:value="mutableConfig.style.basePosition" :min="72" :max="150"/>, (default: 72; selected: {{ isDarkMode ? mutableConfigDarkMode.style.basePosition : mutableConfig.style.basePosition }})</span>
            <BaseDetails attr="animation" :level="2" title="style.animation">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.animation.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.animation.show" @change="forceChartUpdate()">, (default: true)</span>
                <span>speedMs:<input @change="forceChartUpdate" class="accent-app-blue" v-if="isDarkMode" type="range" min="10" max="500" step="10" v-model="mutableConfigDarkMode.style.animation.speedMs"><input @change="forceChartUpdate" class="accent-app-blue" v-else type="range" min="10" max="500" step="10" v-model="mutableConfig.style.animation.speedMs">, (default: 150 ; selected: {{ isDarkMode ? mutableConfigDarkMode.style.animation.speedMs : mutableConfig.style.animation.speedMs }})</span>
            </BaseDetails>
            <BaseDetails attr="colors" :level="2" title="style.colors">
                <span>min: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.colors.min"><input v-else type="color" v-model="mutableConfig.style.colors.min">,  (default: "#DC3912")</span>
                <span>max: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.colors.max"><input v-else type="color" v-model="mutableConfig.style.colors.max">,  (default: "#2CA02C")</span>
                <span>showGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.colors.showGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.colors.showGradient" @change="forceChartUpdate()">, (default: true)</span>
            </BaseDetails>
            <BaseDetails attr="dataLabel" :level="2" title="style.dataLabel">
                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.dataLabel.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.dataLabel.fontSize" :min="8" :max="42"/>, (default: 20)</span>
                <span>autoColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.dataLabel.autoColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.dataLabel.autoColor" @change="forceChartUpdate()">, (default: true)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.dataLabel.color"><input v-else type="color" v-model="mutableConfig.style.dataLabel.color">,  (default: "#2D353C")</span>
                <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.dataLabel.offsetY" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.dataLabel.offsetY" :min="-100" :max="100"/>, (default: 0)</span>
                <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.dataLabel.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.dataLabel.bold" @change="forceChartUpdate()">, (default: true)</span>
                <span>rounding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.dataLabel.rounding" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.dataLabel.rounding" :min="0" :max="6"/>, (default: 0)</span>
                <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.dataLabel.prefix"><input v-else type="text" v-model="mutableConfig.style.dataLabel.prefix">, (default: "")</span>
                <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.dataLabel.suffix"><input v-else type="text" v-model="mutableConfig.style.dataLabel.suffix">, (default: "")</span>
            </BaseDetails>
            <BaseDetails attr="gutter" :level="2" title="style.gutter">
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.gutter.color"><input v-else type="color" v-model="mutableConfig.style.gutter.color">,  (default: "#E1E5E8")</span>
                <span>strokeLinecap: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.gutter.strokeLinecap"><option>round</option><option>square</option><option>butt</option></select><select v-else v-model="mutableConfig.style.gutter.strokeLinecap"><option>round</option><option>square</option><option>butt</option></select>, (default: 'round')</span>
            </BaseDetails>
            <BaseDetails attr="title" :level="2" title="style.title">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.show" @change="forceChartUpdate()">, (default: true)</span>
                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.fontSize" :min="8" :max="42"/>, (default: 12)</span>
                <span>position: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.title.position"><option>top</option><option>bottom</option></select><select v-else v-model="mutableConfig.style.title.position"><option>top</option><option>bottom</option></select>, (default: 'top')</span>
                <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.title.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.title.textAlign"><option>left</option><option>center</option><option>right</option></select>, (default: 'center')</span>
                <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: false)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">,  (default: "#2D353C")</span>
            </BaseDetails>
            <BaseDetails attr="track" :level="2" title="style.track">
                <span>autoColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.track.autoColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.track.autoColor" @change="forceChartUpdate()">, (default: true)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.track.color"><input v-else type="color" v-model="mutableConfig.style.track.color">,  (default: "#5F8BEE")</span>
                <span>strokeLinecap: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.track.strokeLinecap"><option>round</option><option>square</option><option>butt</option></select><select v-else v-model="mutableConfig.style.track.strokeLinecap"><option>round</option><option>square</option><option>butt</option></select>, (default: 'round')</span>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>

                <div class="overflow-w-auto">
                </div>
            </template>

            <template #tab6>
                <ThemesVueUiSparkgauge />
            </template>
        </Box>
    </div>
</template>