<template>
    <div class="content-track-detail"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="select-area">
            <div class="left">
                <i class="el-icon-arrow-left"></i>
                <span class="back" @click="goBack">返回</span>
            </div>
        </div>
        <div class="hw100-oh" style="padding: 22px;">
            <div class="hw100-oh detail-info">
                <div class="trace-info">
                    <!--行为追踪记录概览-->
                    <div class="trace-info-overview">
                        <div class="item user-info">
                            <span> 用户IP:</span>
                            <span>{{behaviorDetailData.userIp===''?'未知':behaviorDetailData.userIp}}</span>
                        </div>
                        <div class="item user-info">
                            <span> 警员ID:</span>
                            <span>{{behaviorDetailData.policeId===''?'未知':behaviorDetailData.policeId}}</span>
                        </div>
                        <div class="item">
                            <img class="item-icon_terminal"
                                 :src="require('@img/terminal_icon/'+behaviorDetailData.browserType+'.svg')"/>
                            <span>{{behaviorDetailData.browserVersion}}</span>
                            <img class="item-icon_terminal"
                                 :src="require('@img/terminal_icon/'+behaviorDetailData.operatingSystem+'.svg')"/>
                            <span>{{behaviorDetailData.operatingSystemVersion}}</span>
                            <img class="item-icon_terminal" :src="require('@img/terminal_icon/pc.svg')"/>
                            <span>{{behaviorDetailData.screenWidth}}&times{{behaviorDetailData.screenHeight}}</span>
                        </div>
                        <div class="item">
                            <img class="icon-title" :src="require('@img/track/app.svg')"/>
                            <span class="item-service-title"> 应用:</span>
                            <span>{{$store.getters.getSelectServiceName}}</span>
                        </div>
                        <div class="item">
                            <img class="icon-title" :src="require('@img/common_icon/page.svg')"/>
                            <span class="item-service-title"> 页面:</span>
                            <span>{{behaviorDetailData.pagePath}}</span>
                        </div>
                        <div class="item">
                            <img class="icon-title" :src="require('@img/common_icon/time.svg')"/>
                            <span class="item-service-title"> 访问时间:</span>
                            <span>{{behaviorDetailData.startTime | formatDate}}</span>
                        </div>
                    </div>
                    <div class="trace-info-page">
                        <!--用户行为记录列表-->
                        <div class="trace-info-page-records">
                            <sub-header-title :sub-title="'用户行为记录'"></sub-header-title>
                            <div class="records-select-area">
                                <span>类型:</span>
                                <div class="records-select-area_item">
                                    <el-select v-model="recordsType" placeholder="请选择" :size="'small'"
                                               @change="handleData">
                                        <el-option
                                                v-for="item in recordsTypeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="records-select-area_item">
                                    <el-input
                                            placeholder="关键词搜索"
                                            suffix-icon="el-icon-search"
                                            size="small"
                                            clearable
                                            v-model="keywords"
                                            @keydown.enter.native="handleData">
                                    </el-input>
                                </div>
                            </div>
                            <!--列表项-->
                            <div v-if="recordList.length!==0" class="records-item-area">
                                <div v-for="(item,index) in recordList"
                                     :key="index"
                                     :class="[{'active':(item.id===selectedRecord.id)}, 'record-item']"
                                     @click="selectRecord(item)">
                                    <img class="item-icon" :src="require('@img/track/'+item.type+'.svg')"/>
                                    <div class="record-item_name">
                                        <span v-if="item.type==='pageView'">页面浏览</span>
                                        <span v-else>发生错误</span>
                                    </div>
                                    <div>{{item.message}}</div>
                                    <div class="record-item_time">{{item.startTime | formatDate}}</div>
                                </div>
                            </div>
                            <no-data v-else></no-data>
                        </div>
                        <!--事件详情信息-->
                        <div class="trace-info-page-record_detail">
                            <div class="info">
                                <sub-header-title :sub-title="'事件详情信息'"></sub-header-title>
                                <!--页面浏览详情-->
                                <div v-show="selectedRecord.type==='pageView'" class="detail-event-type">
                                    <div class="event-detail">
                                        <div class="event-detail-item">
                                            <img :src="require('@img/track/type.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">事件类型:</span>
                                            <img :src="require('@img/track/pageView.svg')"/>
                                            <span>页面浏览</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/common_icon/time.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">发生时间:</span>
                                            <span>{{selectedRecord.startTime | formatDate}}</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/track/event.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">事件内容:</span>
                                            <span>{{selectedRecord.message}}</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/common_icon/page.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">发生页面:</span>
                                            <span>{{selectedRecord.message}}</span>
                                        </div>
                                    </div>
                                    <!--页面浏览tab-->
                                    <div class="event-tab">
                                        <el-tabs v-model="activeName">
                                            <el-tab-pane label="页面加载瀑布图" name="loadFall">
                                                <page-load-falls :data="pageLoadData"></page-load-falls>
                                            </el-tab-pane>
                                            <el-tab-pane label="关键性能指标" name="loadPerf">
                                                <div class="page-pref">
                                                    <process-bar
                                                            :pb-obj="pagePerformance" :nameWidth=120
                                                    ></process-bar>
                                                </div>
                                            </el-tab-pane>
                                            <el-tab-pane label="页面加载资源信息" name="loadRes">
                                                <div class="table-container">
                                                    <el-table
                                                            :data="pageLoadRes"
                                                            style="width: 99%;"
                                                            :header-cell-style="tableHeaderCellStyle"
                                                            highlight-current-row>
                                                        <el-table-column
                                                                prop="name"
                                                                label="资源名称"
                                                                min-width="60%">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="type"
                                                                label="资源类型"
                                                                min-width="10%">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="size"
                                                                label="资源大小(KB)"
                                                                min-width="15%">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="time"
                                                                label="请求时间(ms)"
                                                                min-width="15%">
                                                        </el-table-column>
                                                    </el-table>
                                                </div>
                                            </el-tab-pane>
                                        </el-tabs>
                                    </div>
                                </div>
                                <!--页面错误详情-->
                                <div v-show="selectedRecord.type==='error'" class="detail-event-type">
                                    <div class="error-detail">
                                        <div class="event-detail-item">
                                            <img :src="require('@img/track/type.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">事件类型:</span>
                                            <img :src="require('@img/track/error.svg')"/>
                                            <span>发生错误</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/common_icon/time.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">发生时间:</span>
                                            <span>{{errorRecordDetail.startTime | formatDate}}</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/track/event.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">事件内容:</span>
                                            <span>{{errorRecordDetail.pagePath}}</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/common_icon/page.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">发生页面:</span>
                                            <span>{{errorRecordDetail.pagePath}}</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/track/error_type.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">错误类型:</span>
                                            <span>{{errorRecordDetail.category}}</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/track/error_grade.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">错误等级:</span>
                                            <span>{{errorRecordDetail.grade}}</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/track/error_message.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">错误信息:</span>
                                            <span class="error-message">{{errorRecordDetail.errorContent}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SubHeaderTitle from "@/components/common/SubHeaderTitle";
    import PageLoadFalls from "@/components/common/PageLoadFalls";
    import ProcessBar from "@/components/common/terminal_analysis/ProcessBar";
    import httpReq from "@js/behavior_track_detail";
    import util from "@js/common";
    import NoData from "@/components/common/NoData";

    export default {
        name: "BehaviorTrackDetail",
        components: {
            SubHeaderTitle,
            PageLoadFalls,
            ProcessBar,
            NoData
        },
        data() {
            return {
                // 加载中标识
                loading: true,
                // 用户记录详情数据
                behaviorDetailData: {},
                // 关键词搜索
                keywords: '',
                // 记录类型
                recordsType: 'all',
                // 记录类型选项
                recordsTypeOptions: [
                    {value: 'all', label: '全部'},
                    {value: 'pageView', label: '页面浏览'},
                    {value: 'error', label: '发生错误'},
                ],
                // 记录数据
                recordData: [],
                // 记录列表
                recordList: [],
                // 选中记录数据
                selectedRecord: {},
                // tab
                activeName: 'loadFall',
                // 页面加载数据
                pageLoadData: [],
                // 页面性能数据
                pagePerformance: {
                    mainColor: '',
                    unit: '',
                    pbData: []
                },
                // 页面加载资源
                pageLoadRes: [],
                // 错误记录详细信息
                errorRecordDetail: []
            }
        },
        filters:{
            // 格式化时间 时间戳转化为yyyy-MM-DD HH:mm:ss
            formatDate(value) {
                return  new Date(value).toLocaleString();
            }
        },
        created() {
            // 防抖，延时执行方法
            this.debounceGetData = this._.debounce(this.handleData, 1000);
        },
        mounted() {
            // 查询行为追踪详情数据
            this.getBehaviorTraceDetail();
        },
        methods: {
            // 查询行为追踪条目详情数据
            getBehaviorTraceDetail() {
                let that = this;
                // 显示加载中
                that.loading = true;
                // 用户行为追踪id
                const behaviorTraceId = this.$store.state.behaviorTraceId;
                // 发送请求 测试
                return httpReq.getBehaviorDetailData(behaviorTraceId).then(data => {
                    // 赋值
                    that.behaviorDetailData = data.queryUserBehaviorDetail;
                    // 赋值、构造页面浏览数据
                    that.recordData.push(data.queryUserBehaviorDetail);
                    that.recordData[0].type = 'pageView';
                    that.recordData[0].message = data.queryUserBehaviorDetail.pagePath;
                    // 赋值、构造页面错误数据
                    let errorData = data.queryUserBehaviorErrorLog.logs;
                    for (let i = 0; i < errorData.length; i++) {
                        errorData[i].id = 'error'+ i;
                        errorData[i].type = 'error';
                        errorData[i].errorContent=errorData[i].message;
                        errorData[i].message = errorData[i].errorType;
                        that.recordData.push(errorData[i]);
                    }
                    // 处理数据
                    that.handleData();
                });
            },
            // 处理数据
            handleData() {
                let that = this;
                // 根据类型和关键字过滤记录数据
                that.recordList = that.recordData.filter(function (item) {
                        return 'all' === that.recordsType ? item.message.includes(that.keywords) :
                            item.type === that.recordsType && (item.message.includes(that.keywords));
                    }
                );
                // 默认显示第一条数据详情
                that.selectedRecord = JSON.parse(JSON.stringify(that.recordList[0]));
                // 显示记录详情
                that.showRecordDetail();
            },
            // 显示记录详情
            showRecordDetail() {
                let that = this;
                // 根据记录类型赋值
                if ('pageView' === that.selectedRecord.type) {
                    let selectedRecordPerf = JSON.parse(that.selectedRecord.pagePerfDataStr);
                    // 页面加载数据  函数处理
                    that.pageLoadData = that.handlePageLoadData(selectedRecordPerf.pageLoadData);
                    // 页面性能数据
                    that.pagePerformance = that.handlePagePerforData(selectedRecordPerf.pagePerformance);
                    // 页面资源  函数处理
                    that.pageLoadRes = that.handleLoadRes(selectedRecordPerf.pageReource);
                } else {
                    // 页面错误详情
                    that.errorRecordDetail = that.selectedRecord;
                }
                // 测试
                that.loading = false;
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
                // 页面性能数据
                let performanceData = {
                    mainColor: '#86ebdc',
                    unit: 'ms',
                    pbData: [
                        {
                            name: '白屏时间',
                            value: 0
                        },
                        {
                            name: '首屏时间',
                            value: 0
                        },
                        {
                            name: 'Html加载时间',
                            value: 0
                        },
                        {
                            name: '页面完全加载时间',
                            value: 0
                        },
                    ],
                };
                // 赋值
                for (var i = 0; i < data.length; i++) {
                    performanceData.pbData[i].value = data[i];
                }
                return performanceData;
            },
            // 处理页面资源数据
            handleLoadRes(data){
                let pageRes = [];
                // 赋值
                for (var i = 0; i < data.length; i++) {
                    let item = {
                        name: data[i].name,
                        type:data[i].initiatorType,
                        size: (data[i].encodedBodySize/1024).toFixed(2),
                        time: data[i].duration.toFixed(2)
                    };
                    pageRes.push(item);
                }
                return pageRes;
            },
            // 返回
            goBack() {
                this.$emit('change-content', {
                    from: 'BehaviorTrackDetail',
                    to: 'BehaviorTrack'
                })
            },
            // 设置表格header样式
            tableHeaderCellStyle() {
                return 'background-color: #def2ff';
            },
            // 选择记录
            selectRecord(item) {
                let that = this;
                // 更换当前记录详情数据
                that.selectedRecord = JSON.parse(JSON.stringify(item));
                // 显示记录详情
                that.showRecordDetail();
            }
        },
        watch: {
            // 关键词搜索，过滤数据
            keywords: function () {
                this.debounceGetData();
            }
        }
    }
</script>

<style lang="scss">
    @import '@css/style.scss';

    .content-track-detail {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .select-area {
            min-height: 52px;
            width: 100%;
            padding: 10px 22px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;

            .back {
                color: #919dbd;
                cursor: pointer;
            }

            .left {
                float: left;
                text-align: center;
                line-height: 30px;
            }
        }

        .detail-info {
            padding: 32px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            border-radius: 5px;
            position: relative;


            .trace-info {
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;

                .trace-info-overview {
                    min-height: 52px;
                    width: 100%;
                    padding-bottom: 32px;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    text-align: left;
                    font-size: 16px;
                    color: #575777;
                    border-bottom: solid 1px #e9e9f3;


                    .item {
                        display: flex;
                        margin-right: 1%;
                        margin-left: auto;
                        line-height: 1.5em;

                        .item-icon_terminal {
                            width: 22px;
                            height: 22px;
                            margin: 0 12px;
                            vertical-align: middle;
                        }

                        .item-icon_terminal:first-child {
                            margin: 0 12px 0 0;
                        }

                        .icon-title {
                            width: 14px;
                            height: 14px;
                            margin: 6px 8px 0 0;
                        }

                        .item-service-title {
                            color: #919dbd;
                            margin-right: 8px;
                        }
                    }

                    .user-info {
                        color: #505b73;
                        font-weight: bold;

                        span:first-child {
                            font-weight: normal;
                            margin-right: 8px;
                        }
                    }
                }

                .trace-info-page {
                    width: 100%;
                    height: calc(100% - 48px);
                    display: flex;
                    padding-top: 32px;

                    &-records {
                        height: 100%;
                        width: 50%;

                        .records-select-area {
                            padding: 22px 2px;
                            display: flex;
                            align-items: center;

                            span {
                                color: #919dbd;
                            }

                            .records-select-area_item {
                                width: 220px;
                                height: 100%;
                                margin-left: 12px;
                            }
                        }

                        .records-item-area {
                            width: 100%;
                            height: calc(100% - 110px);
                            padding-right: 32px;
                            overflow: auto;

                            .record-item {
                                width: 100%;
                                height: 53px;
                                padding: 20px;
                                display: flex;
                                align-items: center;
                                color: #505b73;
                                background-color: #f3f9ff;
                                border-radius: 3px;
                                border: solid 1px #dae6f1;
                                margin-bottom: 18px;
                                cursor: pointer;

                                .item-icon {
                                    height: 16px;
                                    width: 16px;
                                }

                                .record-item_name {
                                    margin: 0 28px 0 12px;
                                    font-size: 16px;
                                    font-weight: bold;
                                }

                                .record-item_time {
                                    flex: 1;
                                    text-align: right;
                                    color: #919dbd;
                                }
                            }

                            .record-item:last-child {
                                margin-bottom: 0;
                            }

                            .record-item:hover {
                                border: solid 1px #00baff;
                                color: #00baff;

                                .record-item_time {
                                    color: #00baff;
                                }
                            }

                            .record-item.active {
                                border: solid 1px #00baff;
                                color: #00baff;

                                .record-item_time {
                                    color: #00baff;
                                }
                            }
                        }
                    }

                    .trace-info-page-record_detail {
                        height: 100%;
                        width: 50%;
                        margin-left: 32px;
                        overflow-y: auto;

                        .info {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;

                            .detail-event-type {
                                width: 100%;
                                padding-top: 22px;

                                .event-detail {
                                    width: 100%;
                                    height: 200px;
                                    margin-bottom: 22px;
                                    padding: 32px;
                                    background-color: #f3f9ff;
                                    border-radius: 3px;

                                    &-item {
                                        margin-bottom: 22px;
                                        position: relative;

                                        img {
                                            width: 14px;
                                            height: 14px;
                                            margin-right: 12px;
                                        }

                                        .event-detail-item_title {
                                            margin-right: 20px;
                                        }

                                        .error-message {
                                            width: calc(100% - 106px);
                                            display: block;
                                            overflow-wrap: break-word;
                                            float: left;
                                            position: absolute;
                                            margin-left: 106px;
                                            top: -8px;
                                            line-height: 36px;
                                        }
                                    }

                                    &-item:last-child {
                                        margin-bottom: 0;
                                    }
                                }

                                .event-tab {
                                    width: 100%;
                                    height: calc(100% - 224px);

                                    .el-tabs {
                                        width: 100%;
                                        height: 100%;

                                        .el-tabs__content {
                                            width: 100%;
                                            height: calc(100% - 53px);
                                            padding-top: 22px;

                                            .page-pref {
                                                width: 100%;
                                                height: 100%;

                                                .pb-item {
                                                    margin-bottom: 20px;
                                                }
                                            }
                                        }
                                    }

                                    .el-tab-pane {
                                        width: 100%;
                                        height: 100%;
                                    }

                                    .table-container {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }

                                ::v-deep .event-tab:first-child {
                                    .el-tabs__content {
                                        margin-right: 8px;
                                    }
                                }

                                .error-detail {
                                    width: 100%;
                                    height: 598px;
                                    padding: 32px;
                                    background-color: #f3f9ff;
                                    border-radius: 3px;
                                }
                            }
                        }

                    }
                }
            }
        }
    }

    .el-table {
        border-radius: 3px;
        border: solid 1px #dfe8f7;
        padding: 2px;
        color: #575777;
    }


</style>
