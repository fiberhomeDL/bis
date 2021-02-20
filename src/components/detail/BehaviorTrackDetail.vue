<template>
    <div class="content-track-detail">
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
                            <span>10.23.78</span>
                        </div>
                        <div class="item user-info">
                            <span> 警员ID:</span>
                            <span>MH__01</span>
                        </div>
                        <div class="item">
                            <img class="item-icon_terminal"
                                 :src="require('@img/terminal_icon/Google.svg')"/>
                            <span>87.0</span>
                            <img class="item-icon_terminal"
                                 :src="require('@img/terminal_icon/Windows.svg')"/>
                            <span>Win10</span>
                            <img class="item-icon_terminal" :src="require('@img/terminal_icon/pc.svg')"/>
                            <span>1920&times1680</span>
                        </div>
                        <div class="item">
                            <img class="icon-title" :src="require('@img/track/app.svg')"/>
                            <span class="item-service-title"> 应用:</span>
                            <span>test</span>
                        </div>
                        <div class="item">
                            <img class="icon-title" :src="require('@img/common_icon/page.svg')"/>
                            <span class="item-service-title"> 页面:</span>
                            <span>index.html</span>
                        </div>
                        <div class="item">
                            <img class="icon-title" :src="require('@img/common_icon/time.svg')"/>
                            <span class="item-service-title"> 访问时间:</span>
                            <span>2020-12-30 08:00:00</span>
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
                            <div class="records-item-area">
                                <div v-for="(item,index) in recordList"
                                     :class="[{'active':(item.id===selectedRecord.id)}, 'record-item']"
                                     @click="selectRecord(item)">
                                    <img class="item-icon" :src="require('@img/track/'+item.type+'.svg')"/>
                                    <div class="record-item_name">
                                        <span v-if="item.type==='pageView'">页面浏览</span>
                                        <span v-else>发生错误</span>
                                    </div>
                                    <div>{{item.message}}</div>
                                    <div class="record-item_time">{{item.time}}</div>
                                </div>
                            </div>
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
                                            <span>{{ selectedRecord.time }}</span>
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
                                        <el-tabs v-model="activeName" @tab-click="handleClick">
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
                                                                label="资源大小"
                                                                min-width="10%">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="time"
                                                                label="请求时间(ms)"
                                                                min-width="20%">
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
                                            <span>2020-12-23 23:23:23</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/track/event.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">事件内容:</span>
                                            <span>http://sengjga/index.html</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/common_icon/page.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">发生页面:</span>
                                            <span>http://sengjga/index.html</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/track/error_type.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">错误类型:</span>
                                            <span>AJAX</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/track/error_grade.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">错误等级:</span>
                                            <span>Warning</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('@img/track/error_message.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">错误信息:</span>
                                            <span class="error-message">Script Error:sjeigjskgsnsmnemgnsmngsemgnsmgnsjskjgrkgksngsnemgnsemngjskjgskgejmgnemgnsmngmsngsmgmsgsdj</span>
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

    export default {
        name: "BehaviorTrackDetail",
        components: {
            SubHeaderTitle,
            PageLoadFalls,
            ProcessBar
        },
        data() {
            return {
                activeName: 'loadFall',
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
                // 页面加载资源
                pageLoadRes: [
                    {name: 'sgjeigj.svg', type: 'img', size: 49, time: 23},
                    {name: 'sgjeigj.css', type: 'css', size: 49, time: 23},
                    {name: 'sgjeigj.img', type: 'img', size: 49, time: 23},
                    {name: 'sgjeigj.svg', type: 'img', size: 49, time: 23},
                    {name: 'sgjeigj.css', type: 'css', size: 49, time: 23},
                    {name: 'sgjeigj.img', type: 'img', size: 49, time: 23},
                    {name: 'sgjeigj.svg', type: 'img', size: 49, time: 23},
                    {name: 'sgjeigj.img', type: 'img', size: 49, time: 23},
                    {name: 'sgjeigj.svg', type: 'img', size: 49, time: 23},
                ],
                pagePerformance: {
                    mainColor: '#86ebdc',
                    unit: 'ms',
                    pbData: [
                        {
                            name: '白屏时间',
                            value: 100
                        },
                        {
                            name: '首屏时间',
                            value: 80
                        },
                        {
                            name: 'Html加载时间',
                            value: 60
                        },
                        {
                            name: '页面完全加载时间',
                            value: 40
                        },
                    ],
                },
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
                recordData: [
                    {id: '1232mamg1', type: 'pageView', message: 'index.html', time: '2020-12-22 12:00:00',},
                    {id: 'ege32mamg2', type: 'error', message: 'Script Error', time: '2020-12-22 12:00:00'},
                    {id: 'egeg232mamg3', type: 'error', message: 'Script Error', time: '2020-12-22 12:00:00'},
                    {id: 'sgeg232mamg4', type: 'error', message: 'Script Error', time: '2020-12-22 12:00:00'},
                    {id: 'geg232mamg5', type: 'error', message: 'Script Error', time: '2020-12-22 12:00:00'},
                    {
                        id: 'egsgs232mamg6',
                        type: 'pageView',
                        message: 'ajgkejg/agekgjka/index.html',
                        time: '2020-12-23 13:03:03'
                    },
                    {id: 'ege32mamg7', type: 'error', message: 'Script Error', time: '2020-12-22 12:00:00'},
                    {id: 'ege32mamg8', type: 'error', message: 'Script Error', time: '2020-12-22 12:00:00'},
                    {id: 'ege32mamg9', type: 'error', message: 'Script Error', time: '2020-12-22 12:00:00'},
                    {id: 'ege32mamg10', type: 'error', message: 'Script Error', time: '2020-12-22 12:00:00'},
                ],
                // 记录列表
                recordList: [],
                // 选中记录数据
                selectedRecord: {},
            }
        },
        mounted() {
            // 查询行为追踪详情数据
            this.getBehaviorTraceDetail();

        },
        methods: {
            // 查询行为追踪详情数据
            getBehaviorTraceDetail() {
                // 用户行为追踪id
                const behaviorTraceId = this.$store.state.behaviorTraceId;

                // graphql查询详情数据

                // 处理数据
                this.handleData();

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
            },
            // 返回
            goBack() {
                this.$emit('change-content', {
                    from: 'BehaviorTrackDetail',
                    to: 'BehaviorTrack'
                })
            },
            // tab切换
            handleClick() {
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
            },
        },
        watch: {
            // 关键词搜索，过滤数据
            keywords: function () {
                this.handleData();
            }
        },
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
                        margin-right: 4%;
                        margin-left: auto;

                        .item-icon_terminal {
                            width: 22px;
                            height: 22px;
                            margin: 0 12px;
                        }

                        .item-icon_terminal:first-child {
                            margin: 0 12px 0 0;
                        }

                        .icon-title {
                            width: 14px;
                            height: 14px;
                            margin-right: 8px;
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
