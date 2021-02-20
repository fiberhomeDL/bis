<template>
    <div class="content-page-monitor">
        <!--        选择区域-->
        <div class="select-area flex-row">
            <div class="select-area_item">
                <service-select></service-select>
            </div>
            <div class="right">
                <div class="select-area_item">
                    <time-picker></time-picker>
                </div>
            </div>
        </div>
        <div class="page-information hw100-oh">
            <div class="page-information-container">
                <!--                所有页面名称-->
                <div class="page-information-container-left">
                    <div class="page-select-area_item">
                        <span>排序:</span>
                        <el-select v-model="orderData" placeholder="请选择" :size="'small'" class="order-select"
                                   @change="handleData">
                            <el-option
                                    v-for="item in orderDataOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="page-select-area_item">
                        <el-input
                                placeholder="关键词搜索"
                                suffix-icon="el-icon-search"
                                size="small"
                                clearable
                                v-model="keywords"
                                @keydown.enter.native="handleData">
                        </el-input>
                    </div>
                    <div class="page-name-bar">
                        <progress-bar :data="pageNameList" @show-detail="showDetail"></progress-bar>
                    </div>
                </div>
                <!--                页面详情-->
                <div class="page-information-container-right">
                    <div class="page-total-name">页面:index.hmtl</div>
                    <div class="page-detail-left">
                        <div class="page-detail-pv">
                            <span class="font-pv">浏览量</span>
                            <div class="number-pv">
                                <number-block :data=20098></number-block>
                            </div>
                        </div>
                        <!--                        页面加载瀑布图-->
                        <div>
                            <sub-header-title :sub-title="'页面加载瀑布图'" class="page-detail-title"></sub-header-title>
                            <div class="falls-chart">
                                <page-load-falls :data="pageLoadData"></page-load-falls>
                            </div>
                        </div>
                        <!--                        页面加载延时-->
                        <div class="detail-item">
                            <sub-header-title :sub-title="'页面加载延时'" class="page-detail-title"></sub-header-title>
                            <div class="latency-chart">
                                <lines-chart :lengend="['P50', 'P75', 'P90', 'P95','P99']"
                                             :xAxisData="xAxisData"
                                             :data="lantencyData">
                                </lines-chart>
                            </div>
                        </div>
                    </div>
                    <div class="page-detail-right">
                        <!--                        错误类别-->
                        <div class="page-detail-error-rate">
                            <error-rate-progress :error-type="'js错误'" :error-rate="100.00"
                                                 @show-detail="goToErrorLog"></error-rate-progress>
                            <error-rate-progress :error-type="'静态资源异常'" :error-rate="5.06"
                                                 @show-detail="goToErrorLog"></error-rate-progress>
                            <error-rate-progress :error-type="'Ajax错误'" :error-rate="7"
                                                 @show-detail="goToErrorLog"></error-rate-progress>
                            <error-rate-progress :error-type="'未知错误'" :error-rate="88.88"
                                                 @show-detail="goToErrorLog"></error-rate-progress>
                        </div>
                        <!--                        关键性能指标-->
                        <div>
                            <sub-header-title :sub-title="'关键性能指标'" class="page-detail-title"></sub-header-title>
                            <div class="page-pref">
                                <lines-chart
                                        :lengend="['白屏时间', '首屏时间', 'Html加载时间', '页面完全加载时间']"
                                        :xAxisData="xAxisData"
                                        :data="performanceData">
                                </lines-chart>
                            </div>
                        </div>
                        <!--                        错误量-->
                        <div class="detail-item">
                            <sub-header-title :sub-title="'页面错误量'" class="page-detail-title"></sub-header-title>
                            <div class="error-statistics">
                                <cluster-analysis-bar></cluster-analysis-bar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ServiceSelect from "@/components/common/ServiceSelect";
    import TimePicker from "@/components/common/TimePicker";
    import SubHeaderTitle from "@/components/common/SubHeaderTitle";
    import ErrorRateProgress from "@/components/common/page_monitor/ErrorRateProgress";
    import LinesChart from "@/components/common/LinesChart";
    import PageLoadFalls from "@/components/common/PageLoadFalls";
    import ProgressBar from "@/components/common/ProgressBar";
    import ClusterAnalysisBar from "@/components/common/cluster_analysis/ClusterAnalysisBar";
    import NumberBlock from "@/components/common/page_monitor/NumberBlock";

    export default {
        name: "PageMonitor",
        components: {
            ServiceSelect,
            TimePicker,
            SubHeaderTitle,
            ErrorRateProgress,
            LinesChart,
            PageLoadFalls,
            ProgressBar,
            ClusterAnalysisBar,
            NumberBlock
        },
        data() {
            return {
                // 排序数据
                orderData: 'fpt',
                // 排序数据选项
                orderDataOptions: [
                    {value: 'fpt', label: '白屏时间(ms)'},
                    {value: 'fmp', label: '首屏时间(ms)'},
                    {value: 'domReady', label: 'Html加载时间(ms)'},
                    {value: 'load', label: '页面完全加载时间(ms)'},
                ],
                // 页面名称数据
                pageNameData: [{id: 1, name: 'index.html', data: 88},
                    {id: 2, name: 'egje/asfsfebg/gekeg/home.jsp', data: 220},
                    {id: 3, name: 'home.jsp', data: 110},
                    {id: 4, name: 'home.jsp', data: 100},
                    {id: 5, name: 'home.jsp', data: 77},
                    {id: 6, name: 'home.jsp', data: 30},
                    {id: 7, name: '/abgeg/ge/sgeg/home.jsp', data: 23},
                    {id: 8, name: 'egje/asfsfebg/gekeg/home.jsp', data: 220},
                    {id: 9, name: 'home.jsp', data: 110},
                    {id: 10, name: 'home.jsp', data: 100},
                    {id: 11, name: 'home.jsp', data: 77},
                    {id: 12, name: 'home.jsp', data: 30},
                    {id: 13, name: '/abgeg/ge/sgeg/home.jsp', data: 23},
                    {id: 14, name: 'home.jsp', data: 100},
                    {id: 15, name: 'home.jsp', data: 77},
                    {id: 16, name: 'home.jsp', data: 30},
                    {id: 17, name: '/abgeg/ge/sgeg/home.jsp', data: 23},
                ],
                // 页面名称显示列表
                pageNameList: [],
                // 选择的页面
                selectedPage:'',
                // 搜索关键词
                keywords: '',
                // x轴时间刻度
                xAxisData: ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
                // 页面性能数据
                performanceData: [
                    {
                        name: '白屏时间',
                        type: 'line',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '首屏时间',
                        type: 'line',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'Html加载时间',
                        type: 'line',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '页面完全加载时间',
                        type: 'line',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                ],
                // 页面延迟数据
                lantencyData: [
                    {
                        name: 'P50',
                        type: 'line',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: 'P75',
                        type: 'line',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'P90',
                        type: 'line',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: 'P95',
                        type: 'line',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: 'P99',
                        type: 'line',
                        data: [300, 372, 309, 364, 320, 342, 311]
                    },
                ],
                // 页面加载数据
                pageLoadData: [
                    {title: 'DNS查询 DNS Lookup', startTime: 0, consumeTime: 20},
                    {title: 'TCP连接 TCP', startTime: 20, consumeTime: 30},
                    {title: 'SSL建连 SSL', startTime: 40, consumeTime: 10},
                    {title: '请求响应时间 TTFB ', startTime: 50, consumeTime: 20},
                    {title: '内容传输 Trans', startTime: 70, consumeTime: 10},
                    {title: 'DOM解析 Dom Ready', startTime: 80, consumeTime: 30},
                    {title: '资源加载 Resource', startTime: 110, consumeTime: 120},
                ],
            }
        },
        mounted() {
            // 查询应用下所有页面
            this.getAllPage();
        },
        methods: {
            // 查询应用下所有页面
            getAllPage() {
                // 应用ID
                const serviceId = this.$store.state.selectedServiceId;
                // 时间
                const time = this.$store.state.time;
                // graphql请求数据   1.查询应用下所有页面  2.查询页面所有白屏时间、首屏时间、html加载时间、load时间

                // 处理数据
                this.handleData();
            },
            // 处理数据
            handleData() {
                let that = this;
                // 根据搜索关键词过滤数据
                that.pageNameList = that.pageNameData.filter(function (item) {
                        return item.name.includes(that.keywords);
                    }
                );
                // 按照排序关键词降序排列
                that.pageNameList.sort(function (a, b) {
                    return b.data - a.data;
                });
                // 显示第一个页面的详情数据、查询数据
                that.selectedPage = that.pageNameList[0].id;

                // graphql


            },
            // 显示页面详情
            showDetail(id) {
                let that = this;
                // 查询页面详情数据、 页面名称、浏览量、各类错误率、页面加载瀑布图、关键性能指标、加载延时P50、错误量
                // 应用ID
                const serviceId = this.$store.state.selectedServiceId;
                // 时间
                const time = this.$store.state.time;
                // 页面ID
                that.selectedPage = id;

                // graphql

                // 赋值给各项数据

                // 页面名称

                // 浏览量

                // 错误率

                // 加载延时

                // 错误量

            },
            // 跳转错误日志，根据错误类型
            goToErrorLog(type) {
                // 应用ID
                const serviceId = this.$store.state.selectedServiceId;
                // 时间
                const time = this.$store.state.time;

                // 页面id

                // 错误类型 type


            },
        },
        watch: {
            // 关键词搜索，过滤数据
            keywords: function () {
                this.handleData();
            }
        }
    }
</script>

<style lang="scss">
    @import '@css/style.scss';

    .content-page-monitor {
        width: 100%;
        height: 100%;
        font-size: 14px;

        .flex-row {
            display: flex;
            flex-direction: row;
        }

        .select-area {
            width: 100%;
            min-height: 52px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            align-items: center;
            padding: 0 24px;
            justify-content: space-between;

            .select-area_item {
                display: inline-block;
            }

            .right {
                float: right;
            }
        }

        .page-information {
            width: calc(100% - 44px);
            height: calc(100% - 96px);
            margin: 22px;
            padding: 32px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            border-radius: 5px;

            &-container {
                height: 100%;
                width: 100%;
                display: flex;

                &-left {
                    width: 320px;
                    display: inline-block;
                    border-right: solid 1px #dfe8f7;
                    padding-right: 32px;
                    overflow: hidden;

                    .page-select-area_item {
                        margin-bottom: 22px;

                        span {
                            @extend .sub-normal-text;
                        }

                        .order-select {
                            width: calc(100% - 40px);
                            margin-left: 8px;
                            position: relative;
                        }
                    }

                    .page-name-bar {
                        height: calc(100% - 64px);
                        overflow-y: auto;

                        .progress-bar {
                            width: calc(100% - 8px);
                            margin-right: 8px;
                        }
                    }
                }

                &-right {
                    height: 100%;
                    width: 100%;
                    overflow: auto;
                    display: inline-block;
                    padding-left: 32px;

                    .page-total-name {
                        width: 100%;
                        height: 18px;
                        color: #505b73;
                        font-size: 18px;
                        font-weight: bold;
                    }

                    .page-detail-left {
                        height: calc(100% - 18px);
                        width: 50%;
                        float: left;

                        .page-detail-title {
                            margin-bottom: 18px;
                        }

                        .page-detail-pv {
                            height: 164px;
                            width: 100%;
                            padding: 22px;
                            text-align: center;

                            .font-pv {
                                font-size: 24px;
                                color: #667085;
                            }

                            .number-pv {
                                margin-top: 28px;
                            }
                        }

                        .detail-item {
                            margin-top: 22px;
                        }

                        .falls-chart {
                            width: 100%;
                            height: 218px;
                        }

                        .latency-chart {
                            width: 100%;
                            height: 214px;
                        }
                    }

                    .page-detail-right {
                        width: calc(50% - 32px);
                        margin-left: 32px;
                        float: left;

                        .page-detail-title {
                            margin-bottom: 18px;
                        }

                        .page-detail-error-rate {
                            width: 627px;
                            height: 164px;
                            padding: 22px 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .detail-item {
                            margin-top: 22px;
                        }

                        .page-pref {
                            width: 100%;
                            height: 218px;
                        }

                        .error-statistics {
                            width: 100%;
                            height: 214px;
                        }
                    }
                }
            }
        }
    }

</style>
