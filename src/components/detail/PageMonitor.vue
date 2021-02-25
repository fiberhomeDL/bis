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
                                   @change="getPageTime">
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
                        <progress-bar :data="pageNameList" @show-detail="getPageDetail"></progress-bar>
                    </div>
                </div>
                <!--                页面详情-->
                <div class="page-information-container-right">
                    <div class="page-total-name">页面:{{selectedPage.name}}</div>
                    <div class="page-detail-left">
                        <div class="page-detail-pv">
                            <span class="font-pv">浏览量</span>
                            <div class="number-pv">
                                <number-block :data=pagePv></number-block>
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
                            <error-rate-progress :error-type="'js错误'" :error-rate="jsErrorRate"
                                                 @show-detail="goToErrorLog"></error-rate-progress>
                            <error-rate-progress :error-type="'静态资源异常'" :error-rate="resErrorRate"
                                                 @show-detail="goToErrorLog"></error-rate-progress>
                            <error-rate-progress :error-type="'Ajax错误'" :error-rate="ajaxErrorRate"
                                                 @show-detail="goToErrorLog"></error-rate-progress>
                            <error-rate-progress :error-type="'未知错误'" :error-rate="unKnowErrorRate"
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
    import httpReq from "@js/page_monitor";

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
                orderData: 'browser_app_page_fpt_avg',
                // 排序数据选项
                orderDataOptions: [
                    {value: 'browser_app_page_fpt_avg', label: '白屏时间(ms)'},
                    {value: 'browser_app_page_fmp_avg', label: '首屏时间(ms)'},
                    {value: 'browser_app_page_dom_ready_avg', label: 'Html加载时间(ms)'},
                    {value: 'browser_app_page_dom_ready_avg"', label: '页面完全加载时间(ms)'},
                ],
                // 应用下全部页面
                pageData: [],
                // 页面名称数据
                pageNameData: [],
                // 页面名称显示列表
                pageNameList: [],
                // 选择的页面
                selectedPage: {},
                // 搜索关键词
                keywords: '',
                // 页面浏览量
                pagePv: 0,
                // js错误率
                jsErrorRate: 0,
                // 静态资源错误率
                resErrorRate: 0,
                // ajax错误率
                ajaxErrorRate: 0,
                // 未知错误率
                unKnowErrorRate: 0,
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
                pageLoadData: [],
            }
        },
        mounted() {
            // 查询应用下所有页面
            this.getAllPage();
        },
        methods: {
            // 查询应用下所有页面
            getAllPage() {
                let that = this;
                // 应用ID
                // let serviceId = this.$store.state.selectedServiceId;
                // 测试
                let serviceId = "dGVzdC11aQ==.1";
                // 查询应用下所有页面
                return httpReq.getAllPageData(serviceId).then(data => {
                    that.pageData = data.getEndpoints;
                    // 查询各页面时间
                    that.getPageTime();
                });
            },
            // 查询应用下页面所有白屏时间/首屏时间/html加载时间/load时间
            getPageTime() {
                let that = this;
                //  查询条件
                let condition = {
                    name: that.orderData,
                    // 测试  应用名称
                    service: "test-ui",
                    topN: that.pageData.length,
                }
                // 时间
                // let duration = util.formatStartAndEndTime(that.$store.state.time);
                // 测试
                let duration = {start: "2021-02-23 0706", end: "2021-02-23 0721", step: "MINUTE"};
                return httpReq.getPageTimeAvgTop(condition, duration).then(data => {
                    that.pageNameData = data.sortMetrics;
                    // 处理数据
                    this.handleData();
                });
            },
            // 处理数据,关键词过滤，显示第一条数据详情
            handleData() {
                let that = this;
                // 根据搜索关键词过滤数据
                that.pageNameList = that.pageNameData.filter(function (item) {
                        return item.name.includes(that.keywords);
                    }
                );
                // 显示第一个页面的详情数据
                that.selectedPage = that.pageNameList[0];
                // 查询第一个页面详情数据
                that.getPageDetail(that.selectedPage.id);
            },
            // 显示页面详情
            getPageDetail(id) {
                let that = this;
                // 查询页面详情数据、 页面名称、浏览量、各类错误率、页面加载瀑布图、关键性能指标、加载延时P50、错误量
                // 应用ID
                let serviceId = this.$store.state.selectedServiceId;
                // 时间
                // let duration = util.formatStartAndEndTime(that.$store.state.time);
                // 测试
                let duration = {start: "2021-02-24 1052", end: "2021-02-24 1107", step: "MINUTE"};
                // 页面ID


                // graphql
                return httpReq.getPageDetail(duration).then(data => {
                    // 赋值给各项数据
                    console.info(data);
                    that.pagePv = data.pv;
                    // 错误数据
                    const totalErrorSum = data.totalErrorSum;
                    that.jsErrorRate = (data.jsErrorSum / totalErrorSum).toFixed(2) * 100;
                    that.resErrorRate = (data.resErrorSum / totalErrorSum).toFixed(2) * 100;
                    that.ajaxErrorRate = (data.ajaxErrorSum / totalErrorSum).toFixed(2) * 100;
                    that.unKnowErrorRate = (data.unknowErrorSum / totalErrorSum).toFixed(2) * 100;
                    // 页面瀑布图
                    that.pageLoadData = that.handlePageLoadData([data.dnsTime, data.tcpTime, data.sslTime, data.ttfbTime, data.transTime, data.domReadyTime, data.resTime]);

                    // 页面性能指数
                    // that.performanceData =
                    that.handlePagePerforData([data.fptTime.values.values, data.fmpTime.values.values, data.domReadyTimeDuration.values.values, data.loadTime.values.values,]);
                });
            },
            // 处理页面瀑布图数据
            handlePageLoadData(data) {
                // 瀑布流进行的当前时间
                let currentTime = 0;
                // 页面瀑布图数据
                let pageLoadData = [
                    {title: 'DNS查询 DNS Lookup', startTime: 0, consumeTime: 0},
                    {title: 'TCP连接 TCP', startTime: 0, consumeTime: 0},
                    {title: 'SSL建连 SSL', startTime: 0, consumeTime: 0},
                    {title: '请求响应时间 TTFB', startTime: 0, consumeTime: 0},
                    {title: '内容传输 Trans', startTime: 0, consumeTime: 0},
                    {title: 'DOM解析 Dom Ready', startTime: 0, consumeTime: 0},
                    {title: '资源加载 Resource', startTime: 0, consumeTime: 0}
                ];
                // 设置数据的开始时间和消耗时间
                for (var i = 0; i < data.length; i++) {
                    // ssl建连时间的结束时间等于tcp结束时间
                    if (i !== 2) {
                        pageLoadData[i].startTime = currentTime;
                        currentTime += data[i];
                    } else {
                        pageLoadData[i].startTime = currentTime - data[i];
                    }
                    pageLoadData[i].consumeTime = data[i];
                }
                return pageLoadData;
            },
            // 处理页面性能数据
            handlePagePerforData(data) {
                let that = this;
                // 页面性能数据
                for (var i = 0; i < data.length; i++) {
                    that.performanceData[i].data = data[i].map(function (item) {
                        return item.value;
                    });
                }
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
