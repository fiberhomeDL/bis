<template>
    <div class="content-page-monitor">
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
                <div class="page-information-container-left">
                    <div class="page-name-container">
                        <div class="page-select-area_item">
                            <span>排序:</span>
                            <el-select v-model="orderData" placeholder="请选择" :size="'small'" class="order-select">
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
                                    v-model="keyword"
                                    @keydown.enter.native="searchByKeyword">
                            </el-input>
                        </div>
                        <progress-bar :data="pageNameData"></progress-bar>
                    </div>
                </div>
                <div class="page-information-container-right">
                    <div class="page-total-name">
                        页面:index.hmtl
                    </div>
                    <div class="page-detail-left">
                        <div class="page-detail-pv">
                            <span class="font-pv">浏览量</span>
                            <div class="number-pv">
                                <div class="number-pv-bk">
                                    <span class="number-pv-single">2</span>
                                </div>
                                <div class="number-pv-bk">
                                    <span class="number-pv-single">8</span>
                                </div>
                            </div>
                        </div>
                        <div class="page-detail-falls detail-item">
                            <sub-header-title :sub-title="'页面加载瀑布图'"></sub-header-title>
                            <page-load-falls :data="pageLoadData"></page-load-falls>
                        </div>
                        <div class="page-detail-lancy detail-item">
                            <sub-header-title :sub-title="'页面加载延时'"></sub-header-title>
                            <div class="latency-chart">
                                <lines-chart :lengend="['P50', 'P75', 'P90', 'P95','P99']"
                                             :xAxisData="xAxisData"
                                             :data="lantencyData">
                                </lines-chart>
                            </div>
                        </div>
                    </div>
                    <div class="page-detail-right">
                        <div class="page-detail-error-rate">
                            <error-rate-progress :error-type="'js错误'" :error-rate="100.00"></error-rate-progress>
                            <error-rate-progress :error-type="'静态资源异常'" :error-rate="5.06"></error-rate-progress>
                            <error-rate-progress :error-type="'Ajax错误'" :error-rate="7"></error-rate-progress>
                            <error-rate-progress :error-type="'未知错误'" :error-rate="88.88"></error-rate-progress>
                        </div>
                        <div class="page-detail-preformance detail-item">
                            <sub-header-title :sub-title="'关键性能指标'"></sub-header-title>
                            <lines-chart
                                    :lengend="['白屏时间', '首屏时间', 'Html加载时间', '页面完全加载时间']"
                                    :xAxisData="xAxisData"
                                    :data="performanceData">
                            </lines-chart>
                        </div>
                        <div class="page-detail-error-number detail-item">
                            <sub-header-title :sub-title="'页面错误量'"></sub-header-title>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import ServiceSelect from "../common/ServiceSelect";
    import TimePicker from "../common/TimePicker";
    import SubHeaderTitle from "../common/SubHeaderTitle";
    import ErrorRateProgress from "../common/page_monitor/ErrorRateProgress";
    import LinesChart from "../common/LinesChart";
    import PageLoadFalls from "../common/PageLoadFalls";
    import ProgressBar from "../common/ProgressBar";

    export default {
        name: "PageMonitor",
        components: {ServiceSelect, TimePicker, SubHeaderTitle, ErrorRateProgress, LinesChart,PageLoadFalls,ProgressBar},
        data() {
            return {
                // 排序数据
                orderData: 'fpt',
                // 排序数据选项
                orderDataOptions: [{value: 'fpt', label: '白屏时间(ms)'},{value: 'fmp', label: '首屏时间(ms)'}],
                // 页面名称数据
                pageNameData: [{id: 1, name: 'index.html', data: 88},
                    {id: 2, name: 'egje/asfsfebg/gekeg/home.jsp', data: 220},
                    {id: 3, name: 'home.jsp', data: 110},
                    {id: 4, name: 'home.jsp', data: 100},
                    {id: 5, name: 'home.jsp', data: 77},
                    {id: 6, name: 'home.jsp', data: 30},
                    {id: 7, name: '/abgeg/ge/sgeg/home.jsp', data: 23}],
                // 搜索关键词
                keyword: '',
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
                pageLoadData:[
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
        methods: {
            // 关键词搜索
            searchByKeyword() {
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '@css/style.scss';

    .content-page-monitor {
        width: 100%;
        height: 100%;
        font-size:14px;

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
            border-radius: 3px;

            &-container {
                height: 100%;
                width: 100%;
                display: flex;

                &-left {
                    height: 100%;
                    width: 20%;
                    display: inline-block;
                    border-right: solid 1px #dfe8f7;

                    .page-name-container {
                        height: 100%;
                        width: 100%;
                        padding-right: 32px;

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
                    }
                }

                &-right {
                    height: 100%;
                    width: 100%;
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
                        height: 100%;
                        width: 50%;
                        float: left;

                        .page-detail-pv {
                            height: 20%;
                            padding: 22px;
                            text-align: center;

                            .font-pv {
                                font-size: 24px;
                                color: #667085;
                            }

                            .number-pv {
                                margin-top: 28px;

                                &-bk {
                                    width: 36px;
                                    height: 65px;
                                    display: inline-block;
                                    margin-right: 4px;
                                    background-color: #f3fafd;

                                    .number-pv-single {
                                        font-size: 56px;
                                        color: #37cbf9;
                                    }
                                }
                            }
                        }

                        .detail-item {
                            margin-top: 22px;
                        }

                        .page-detail-falls {
                            height: calc(40% - 22px);
                        }

                        .page-detail-lancy {
                            height: calc(40% - 22px);

                            .latency-chart {
                                height: calc(100% - 28px);
                            }
                        }
                    }

                    .page-detail-right {
                        height: 100%;
                        width: calc(50% - 32px);
                        margin-left: 32px;
                        float: left;

                        .page-detail-error-rate {
                            height: 20%;
                        }

                        .detail-item {
                            margin-top: 22px;
                        }

                        .page-detail-preformance {
                            height: calc(40% - 22px);
                        }

                        .page-detail-error-number {
                            height: calc(40% - 22px);
                        }
                    }
                }
            }
        }
    }

</style>
