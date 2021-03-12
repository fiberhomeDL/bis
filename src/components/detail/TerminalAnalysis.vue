<template>
    <div class="terminal-analysis hw100-oh flex-column"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <header class="terminal-analysis-header flex-row">
            <service-select @onSelectChange="renderData"></service-select>
            <time-picker @changeTime="renderData"></time-picker>
        </header>
        <section class="body-wrapper hw100-oh" v-if="!loading">
            <section class="terminal-analysis-body hw100-oh">
                <div class="terminal-analysis-top flex-row">
                    <div class="terminal-analysis-top-left">
                        <process-select @onItemSelect="renderItemData" :tab-data="tabData"></process-select>
                    </div>
                    <div class="terminal-analysis-top-right hw100-oh">
                        <el-row :gutter="20" style="height: 100%;margin: 0;">
                            <el-col :span="12" style="height: 100%">
                                <div class="hw100-oh flex-column" style="padding-top: 20px;">
                                    <sub-header-title sub-title="错误统计"></sub-header-title>
                                    <div class="hw100-oh" style="padding-bottom: 22px">
                                        <cluster-analysis-bar v-if="!chartsLoading"
                                                              :bar-data="errorBarData"></cluster-analysis-bar>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12" style="height: 100%">
                                <div class="hw100-oh flex-column" style="padding-top: 20px;">
                                    <sub-header-title sub-title="访问速度"></sub-header-title>
                                    <div class="hw100-oh" v-if="!chartsLoading">
                                        <process-bar :pb-obj="speedData" :name-width="120"></process-bar>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>

                    </div>
                </div>
                <div class="terminal-analysis-bottom">
                    <el-row :gutter="60" class="hw100-oh">
                        <el-col class="flex-column" style="height: 100%" :span="8">
                            <sub-header-title class="mar-bot-24" :sub-title="'使用统计'"></sub-header-title>
                            <tab-select :key="'useCount'"
                                        :tab-data="[
                                            {
                                                id: 'browser_type',
                                                name: '浏览器',
                                            },
                                            {
                                                id: 'browser_system',
                                                name: '操作系统',
                                            },
                                            {
                                                id: 'browser_resolution',
                                                name: '分辨率',
                                            }
                                        ]"
                                    :active-id="'browser_type'"
                                    @onChange="getUsePieData">
                            </tab-select>
                            <app-overview-pie
                                    v-if="usePieLoading"
                                    style="height: 100%"
                                    :noTitle="true"
                                    :pie-data="usePieData">
                            </app-overview-pie>
                        </el-col>
                        <el-col class="flex-column" style="height: 100%" :span="8">
                            <sub-header-title class="mar-bot-24" :sub-title="'使用性能'"></sub-header-title>
                            <tab-select
                                    :key="'useTer'"
                                    :tab-data="[
                                         {
                                             id: 'browser_type',
                                            name: '浏览器',
                                         },
                                        {
                                            id: 'browser_system',
                                            name: '操作系统',
                                        },
                                        ]"
                                    :active-id="'browser_type'"
                                    @onChange="getPerfData">
                            </tab-select>
                            <process-bar :pb-obj="userPerformance" :name-width="100"></process-bar>
                        </el-col>
                        <el-col class="flex-column" style="height: 100%" :span="8">
                            <sub-header-title class="mar-bot-24" :sub-title="'错误次数'"></sub-header-title>
                            <tab-select
                                    :key="'errorCount'"
                                    :tab-data="[
                                        {
                                            id: 'browser_type',
                                            name: '浏览器',
                                        },
                                        {
                                            id: 'browser_system',
                                            name: '操作系统',
                                        },
                                        ]"
                                    :active-id="'browser_type'"
                                    @onChange="getAllErrorData">
                            </tab-select>
                            <process-bar
                                    :pb-obj="errorCount"
                                    :name-width="100"
                            ></process-bar>
                        </el-col>
                    </el-row>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
    import ServiceSelect from "@/components/common/ServiceSelect";
    import TimePicker from "@/components/common/TimePicker";
    import ProcessSelect from "@/components/common/terminal_analysis/ProcessSelect";
    import SubHeaderTitle from "@/components/common/SubHeaderTitle";
    import ClusterAnalysisBar from "@/components/common/cluster_analysis/ClusterAnalysisBar";
    import LinesChart from "@/components/common/LinesChart";
    import TabSelect from "@/components/common/terminal_analysis/TabSelect";
    import AppOverviewPie from "@/components/common/app_overview/AppOverviewPie";
    import ProcessBar from "@/components/common/terminal_analysis/ProcessBar";
    import httpReq from "@/assets/js/TerminalAnalysis";
    import util from "@/assets/js/common";
    import NoData from "@/components/common/NoData";

    export default {
        name: "TerminalAnalysis",
        components: {
            NoData,
            ProcessBar,
            AppOverviewPie,
            TabSelect,
            ClusterAnalysisBar,
            ServiceSelect,
            TimePicker,
            ProcessSelect,
            SubHeaderTitle,
            LinesChart
        },
        data() {
            return {
                loading: false,
                /*错误统计和访问速度*/
                chartsLoading: false,
                /*使用统计饼图loading*/
                usePieLoading: false,
                /*tab中浏览器和操作系统的数据*/
                tabData: undefined,
                /*错误统计柱状图x轴*/
                errorBarData: {
                    xData: util.initXAxisData(this.$store.state.time),
                    barValue: []
                },
                usePieData: [],
                //访问速度数据
                speedData: {
                    mainColor: '#5ed2fc',
                    unit: 'ms',
                    pbData: []
                },
                //使用性能数据 为组件processBar提供
                userPerformance: {
                    mainColor: '#86ebdc',
                    unit: '',
                    //[{name: 'c8.0',value: 200}]
                    pbData: []
                },
                //错误次数数据 为组件processBar提供
                errorCount: {
                    mainColor: '#ffc7b9',
                    unit: '',
                    pbData: []
                },
            }
        },
        methods: {
            /*获取一次渲染时的数据并渲染 改变应用/时间时触发*/
            renderData() {
                let serviceId = this.$store.state.selectedServiceId;
                let serviceName = this.$store.getters.getSelectServiceName;
                let time = this.$store.state.time;
                this.loading = true;
                let p1 = httpReq.getBrowserAndOsData(serviceName, serviceId, time);
                let p2 = httpReq.getUseCount('browser_type', serviceName, serviceId, time);
                let p3 = httpReq.getPerf('browser_type', serviceId, time);
                let p4 = httpReq.getAllError('browser_type', serviceId, time);
                Promise.all([p1, p2, p3, p4]).then(data => {
                    this.tabData = data[0];
                    this.renderItemData(data[0]['bw'][0])
                    this.renderUsePie(data[1]);
                    this.renderPerf(data[2]);
                    this.renderAllErrorData(data[3]);
                    this.loading = false;
                })
            },
            /*获取二次渲染时的数据
            * 点击左侧列表项目时下发的请求
            * */
            renderItemData(item) {
                this.chartsLoading = true;
                let serviceId = this.$store.state.selectedServiceId;
                let time = this.$store.state.time;
                if (!item) {
                    this.errorBarData.xData = util.initXAxisData(time);
                    this.errorBarData.barValue = [];
                    this.speedData.pbData = [];
                    this.chartsLoading = false;
                    return;
                }
                httpReq.getErrorCountAndSpeed(item, serviceId, time).then(data => {
                    this.errorBarData.xData = util.initXAxisData(time);
                    this.errorBarData.barValue = data.errorData;
                    this.speedData.pbData = data.speed || [];
                    this.chartsLoading = false;
                });
            },
            /*获取使用统计饼图数据*/
            getUsePieData(category) {
                this.usePieLoading = false;
                let serviceId = this.$store.state.selectedServiceId;
                let serviceName = this.$store.getters.getSelectServiceName;
                let time = this.$store.state.time;
                //默认展示浏览器统计
                category = category ? category : "browser_type";
                httpReq.getUseCount(category, serviceName, serviceId, time).then(data => {
                    this.renderUsePie(data);
                });
            },
            /*渲染饼图*/
            renderUsePie(data) {
                this.usePieData = data.use.map(item => {
                    return {
                        name: (item.category + (item.version ? item.version : "")).split(".").slice(0, 2).join("."),
                        value: item.value
                    }
                });
                this.usePieLoading = true;
            },
            /*获取性能*/
            getPerfData(category) {
                let serviceId = this.$store.state.selectedServiceId;
                let time = this.$store.state.time;
                category = category ? category : "browser_type";
                httpReq.getPerf(category, serviceId, time).then(data => {
                    this.renderPerf(data);
                });
            },
            /*渲染性能*/
            renderPerf(data) {
                this.userPerformance.pbData = data.perf.map(item => {
                    return {
                        name: (item.category + (item.version ? item.version : "")).split(".").slice(0, 2).join("."),
                        value: item.value
                    }
                });
            },
            /*错误数量*/
            getAllErrorData(category) {
                category = category ? category : 'browser_type';
                /*browser_type or browser_system*/
                let serviceId = this.$store.state.selectedServiceId;
                let time = this.$store.state.time;
                httpReq.getAllError(category, serviceId, time).then(data => {
                    this.renderAllErrorData(data);
                });
            },
            renderAllErrorData(data) {
                this.errorCount.pbData = data.error.map(item => {
                    return {
                        name: (item.category + (item.version ? item.version : "")).split(".").slice(0, 2).join("."),
                        value: item.value
                    }
                });
            },
        },
        created() {
            this.$nextTick(() => {
                this.renderData();
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '@css/style.scss';

    .body-wrapper {
        padding: 20px;
    }

    .terminal-analysis {
        &-header {
            min-height: 52px;
            background-color: #ffffff;
            box-shadow: 0px 4px 8px 0px #b7c4e0;
            padding: 0 24px;
            justify-content: space-between;
            align-items: center;
        }

        &-body {
            overflow-y: auto;
        }

        &-top {
            margin-bottom: 20px;
            padding: 8px 30px 12px;

            &-left {
                min-width: 286px;
                border-right: 1px solid #dfe8f7;
                padding: 20px 24px 10px 0;
            }
        }

        &-bottom {
            padding: 30px;
        }

        &-top, &-bottom {
            height: 48%;
            background: #fff;
            box-shadow: 0px 4px 8px 0px #b7c4e0;
            border-radius: 4px;

        }
    }

    .mar-bot-24 {
        margin-bottom: 24px;
    }

</style>
