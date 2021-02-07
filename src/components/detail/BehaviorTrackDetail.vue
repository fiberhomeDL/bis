<template>
    <div class="content-track-detail">
        <div class="select-area">
            <div class="left">
                <i class="el-icon-arrow-left"></i>
                <span class="back" @click="goBack">返回</span>
            </div>
            <div class="right">
                <time-picker></time-picker>
            </div>
        </div>
        <div class="hw100-oh" style="padding: 22px;">
            <div class="hw100-oh detail-info">
                <div class="trace-info">
                    <div class="trace-info-user">
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
                                 :src="require('../../assets/img/terminal_icon/Google.svg')"/>
                            <div slot="content">87.0</div>
                            <img class="item-icon_terminal"
                                 :src="require('../../assets/img/terminal_icon/Windows.svg')"/>
                            <div slot="content">Win10</div>
                            <img class="item-icon_terminal" :src="require('../../assets/img/terminal_icon/pc.svg')"/>
                            <div slot="content">1920&times1680</div>
                        </div>
                        <div class="item">
                            <img class="icon-title" :src="require('../../assets/img/track/app.svg')"/>
                            <span class="item-service-title"> 应用:</span>
                            <span>test</span>
                        </div>
                        <div class="item">
                            <img class="icon-title" :src="require('../../assets/img/common_icon/page.svg')"/>
                            <span class="item-service-title"> 页面:</span>
                            <span>index.html</span>
                        </div>
                        <div class="item">
                            <img class="icon-title" :src="require('../../assets/img/common_icon/time.svg')"/>
                            <span class="item-service-title"> 访问时间:</span>
                            <span>2020-01-21 12:00:00</span>
                        </div>
                    </div>
                    <div class="trace-info-page">
                        <div class="trace-info-page-records">
                            <sub-header-title :sub-title="'用户行为记录'"></sub-header-title>
                            <div class="records-select-area">
                                <span>类型:</span>
                                <div class="records-select-area_item">
                                    <el-select v-model="recordsType" placeholder="请选择" :size="'small'">
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
                                            @keydown.enter.native="searchByKeywords">
                                    </el-input>
                                </div>
                            </div>
                            <div class="records-item-area">
                                <div v-for="(item,index) in recordList" class="record-item"
                                     @click="selectRecord(item.id)">
                                    <img class="item-icon" :src="require('../../assets/img/track/'+item.type+'.svg')"/>
                                    <div class="record-item_name">
                                        <span v-if="item.type==='pageView'">页面浏览</span>
                                        <span v-else>发生错误</span>
                                    </div>
                                    <div>{{item.message}}</div>
                                    <div class="record-item_time">{{item.time}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="trace-info-page-record_detail">
                            <div class="info">
                                <sub-header-title :sub-title="'事件详情信息'"></sub-header-title>
                                <div v-show="selectType==='pageView'" class="detail-event-type">
                                    <div class="event-detail">
                                        <div class="event-detail-item">
                                            <img :src="require('../../assets/img/track/type.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">事件类型:</span>
                                            <img :src="require('../../assets/img/track/pageView.svg')"/>
                                            <span>页面浏览</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('../../assets/img/common_icon/time.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">发生时间:</span>
                                            <span>2020-12-23 23:23:23</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('../../assets/img/track/event.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">事件内容:</span>
                                            <span>http://sengjga/index.html</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('../../assets/img/common_icon/page.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">发生页面:</span>
                                            <span>http://sengjga/index.html</span>
                                        </div>
                                    </div>
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
                                                            style="width: 100%;"
                                                            height="250"
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
                                                                label="请求时间"
                                                                min-width="20%">
                                                        </el-table-column>
                                                    </el-table>
                                                </div>
                                            </el-tab-pane>
                                        </el-tabs>
                                    </div>
                                </div>
                                <div v-show="selectType==='error'" class="detail-event-type">
                                    <div class="error-detail">
                                        <div class="event-detail-item">
                                            <img :src="require('../../assets/img/track/type.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">事件类型:</span>
                                            <img :src="require('../../assets/img/track/error.svg')"/>
                                            <span>页面浏览</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('../../assets/img/common_icon/time.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">发生时间:</span>
                                            <span>2020-12-23 23:23:23</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('../../assets/img/track/event.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">事件内容:</span>
                                            <span>http://sengjga/index.html</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('../../assets/img/common_icon/page.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">发生页面:</span>
                                            <span>http://sengjga/index.html</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('../../assets/img/track/error_type.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">错误类型:</span>
                                            <span>AJAX</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('../../assets/img/track/error_grade.svg')"/>
                                            <span class="event-detail-item_title sub-normal-text">错误等级:</span>
                                            <span>Warning</span>
                                        </div>
                                        <div class="event-detail-item">
                                            <img :src="require('../../assets/img/track/error_message.svg')"/>
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
    import TimePicker from "@/components/common/TimePicker";
    import SubHeaderTitle from "@/components/common/SubHeaderTitle";
    import PageLoadFalls from "@/components/common/PageLoadFalls";
    import ProcessBar from "@/components/common/terminal_analysis/ProcessBar";

    export default {
        name: "BehaviorTrackDetail",
        components: {
            TimePicker,
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
                // 记录类型
                recordsType: '全部',
                // 记录类型选项
                recordsTypeOptions: [
                    {value: 'all', label: '全部'},
                    {value: 'pageView', label: '页面浏览'},
                    {value: 'error', label: '发生错误'},
                ],
                // 搜索关键词
                keywords: '',
                // 记录数据
                recordList: [
                    {id: '1232mamg', type: 'pageView', message: 'index.html', time: '2020-12-22 12:00:00'},
                    {id: 'ege32mamg', type: 'error', message: 'Script Error', time: '2020-12-22 12:00:00'},
                    {id: 'egeg232mamg', type: 'error', message: 'Script Error', time: '2020-12-22 12:00:00'},
                    {id: 'sgeg232mamg', type: 'error', message: 'Script Error', time: '2020-12-22 12:00:00'},
                    {id: 'geg232mamg', type: 'error', message: 'Script Error', time: '2020-12-22 12:00:00'},
                    {
                        id: 'egsgs232mamg',
                        type: 'pageView',
                        message: 'ajgkejg/agekgjka/index.html',
                        time: '2020-12-22 12:00:00'
                    },
                ],
                // 选中类型
                selectType:'pageView'
            }
        },
        methods: {
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
            // 关键词搜索
            searchByKeywords() {

            },
            // 选择记录
            selectRecord(id) {
                this.selectType='error';
            },
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

            .right {
                float: right;
            }
        }

        .detail-info {
            padding: 32px;
            /*display: flex;*/
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            border-radius: 5px;
            position: relative;

            .trace-info {
                height: 52px;
                width: 100%;
                border-bottom: solid 1px #e9e9f3;

                .trace-info-user {
                    width: 100%;
                    font-size: 16px;
                    color: #575777;
                    text-align: left;
                    margin-bottom: 32px;
                    display: flex;
                    align-items: center;

                    .item {
                        display: flex;
                        margin-right: 4%;

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
                    .user-info{
                        color: #505b73;
                        font-weight: bold;
                        span:first-child{
                            font-weight: normal;
                            margin-right: 8px;
                        }
                    }

                }

                .trace-info-page {
                    width: 100%;
                    height: calc(100% - 52px);
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
                        }
                    }

                    .trace-info-page-record_detail {
                        height: 100%;
                        width: 50%;
                        margin-left: 32px;

                        .info {
                            height: 50%;
                            .detail-event-type{

                                padding:22px 0;

                                .event-detail {
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
                                        .error-message{
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
                                    height: 50%;

                                    .el-tab-pane {
                                        width: 100%;
                                        height: 100%;
                                    }

                                    .page-pref {
                                        width: 100%;
                                        height: 300px;
                                    }

                                    .table-container {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                                .error-detail{
                                    width: 100%;
                                    height: 600px;
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
