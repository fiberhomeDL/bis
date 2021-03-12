<template>
    <div class="content-behavior-track"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
        <!-- 选择区域-->
        <div class="select-area">
            <div class="select-area_item">
                <service-select @onSelectChange="getUserTraceData"></service-select>
            </div>
            <div class="select-area_item">
                <el-input
                        placeholder="请输入用户IP"
                        suffix-icon="el-icon-search"
                        size="small"
                        clearable
                        v-model="keywordUserIP"
                        @keydown.enter.native="getUserTraceData">
                </el-input>
            </div>
            <div class="select-area_item">
                <el-input
                        placeholder="请输入警员ID"
                        suffix-icon="el-icon-search"
                        size="small"
                        clearable
                        v-model="keywordPoliceId"
                        @keydown.enter.native="getUserTraceData">
                </el-input>
            </div>
            <div class="right">
                <div class="select-area_item">
                    <time-picker @changeTime="getUserTraceData"></time-picker>
                </div>
                <div class="select-area_item">
                    <download-button class="download-icon" @click="download"></download-button>
                </div>
            </div>
        </div>
        <div class="trace-information">
            <!--用户行为记录列表-->
            <div v-if="traceData.length>0" class="trace-container">
                <div v-for="(item,index) in traceData"
                     class="trace-container-item"
                     :key="index"
                     v-model="traceDataSelected"
                     @click="goToDetail(item.id)">
                    <div class="trace-container-item_col item-user-info">
                        <div class="item-user-info_col">
                            <span> 用户IP:</span>
                            <span>{{item.userIp===''?'未知':item.userIp}}</span>
                        </div>
                        <div class="item-user-info_col pol-id">
                            <span> 警员ID:</span>
                            <span>{{item.policeId===''?'未知':item.policeId}}</span>
                        </div>
                        <div class="item-user-info_terminal">
                            <el-tooltip effect="light" :visible-arrow=false placement="top">
                                <div slot="content">{{item.browserVersion}}</div>
                                <img class="item-icon_terminal"
                                     :src="require('@img/terminal_icon/'+item.browserType+'.svg')"/>
                            </el-tooltip>
                            <el-tooltip effect="light" :visible-arrow=false placement="top">
                                <div slot="content">{{item.OperateVersion}}</div>
                                <img class="item-icon_terminal"
                                     :src="require('@img/terminal_icon/'+item.OperateType+'.svg')"/>
                            </el-tooltip>
                            <el-tooltip effect="light" :visible-arrow=false placement="top">
                                <div slot="content">{{item.screenWidth}}&times{{item.screenHeight}}</div>
                                <img class="item-icon_terminal"
                                     :src="require('@img/terminal_icon/pc.svg')"/>
                            </el-tooltip>
                        </div>
                    </div>
                    <div style="display: flex;align-items: center" class="trace-container-item_col item-page">
                        <img style="top: 0" class="item-icon" :src="require('@img/common_icon/page.svg')"/>
                        <span style="min-width: 36px" class="item-title">页面:</span>
                        <span class="normal-text rtl-text">{{item.pageName}}</span>
                    </div>
                    <div class="trace-container-item_col item-time">
                        <img class="item-icon" :src="require('@img/common_icon/time.svg')"/>
                        <span class="item-title">访问时间:</span>
                        <span class="normal-text">{{new Date(item.startTime).toLocaleString()}}</span>
                    </div>
                    <div class="trace-container-item_col item-exist-error">
                        <img class="item-icon" :src="require('@img/common_icon/error.svg')"/>
                        <span class="item-title">有无错误:</span>
                        <span v-if="item.errorCount>0" class="item-content_error">有<span
                                class="red-circle"></span></span>
                        <span v-else>无</span>
                    </div>
                </div>
            </div>
            <no-data v-else :imgWidth="200" :fontSize="16"></no-data>
            <!--分页-->
            <div class="page-area">
                <el-pagination
                        @current-change="handleCurrentChange"
                        layout="total,prev,pager,next"
                        :page-size="9"
                        :total="traceData.length">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import ServiceSelect from "@/components/common/ServiceSelect";
    import TimePicker from "@/components/common/TimePicker";
    import DownloadButton from "@/components/common/DownloadButton";
    import NoData from "@/components/common/NoData";
    import httpReq from "@js/behavior_track";
    import util from "@js/common";
    import XLSX from 'xlsx';
    // 一页展示数量
    const pageSize = 9;
    export default {
        name: "BehaviorTrack",
        components: {DownloadButton, ServiceSelect, TimePicker,NoData},
        data() {
            return {
                // 加载中标识
                loading: true,
                // 搜索关键词
                keyword: '',
                // 搜索关键词、用户ip
                keywordUserIP: '',
                // 搜索关键词、警员id
                keywordPoliceId: '',
                // 用户追踪数据列表
                traceData: [],
                // 全部追踪数据数量
                totalTraceData: 0,
                // 选中追踪条目
                traceDataSelected: '',
                // 当前页数
                currentPage: 1
            }
        },
        created() {
            // 防抖，延时执行方法
            this.debounceGetData = this._.debounce(this.getUserTraceData, 1200);
        },
        mounted() {
            // 查询用户行为记录数据
            this.getUserTraceData();
        },
        methods: {
            // 查询用户行为记录数据
            getUserTraceData() {
                let that = this;
                // 显示加载中
                that.loading = true;
                // 应用ID
                let serviceId = that.$store.state.selectedServiceId;
                // 时间
                let duration = util.formatStartAndEndTime(that.$store.state.time);
                // 查询条件
                let queryCondition = {
                    serviceId: serviceId,
                    userIp: that.keywordUserIP,
                    policeId: that.keywordPoliceId,
                    paging: {
                        // 当前页数
                        pageNum: that.currentPage,
                        // 一页数量
                        pageSize: pageSize,
                        // 全部数据
                        needTotal: true
                    },
                    queryDuration: duration
                };
                // 发送请求
                return httpReq.init(queryCondition).then(data => {
                    // 赋值、记录列表
                    that.traceData = data.behaviors;
                    // 赋值、全部数量
                    that.totalTraceData = data.total;
                    // 取消加载中
                    that.loading = false;
                });
            },
            // 下载EXCEL
            download() {
                let that = this;
                // 表格数据
                let traceData = [];
                // 设置表头
                traceData.push({
                    A: '用户IP',
                    B: '警员编号',
                    C: '浏览器',
                    D: '浏览器版本',
                    E: '操作系统',
                    F: '操作系统版本',
                    G: '屏幕分辨率',
                    H: '页面',
                    I: '访问时间',
                    J: '错误数量'
                });
                // 写入每行数据
                that.traceData.forEach(function (item, index) {
                    let row = {
                        A: item.userIp,
                        B: item.policeId,
                        C: item.browserType,
                        D: item.browserVersion,
                        E: item.OperateType,
                        F: item.OperateVersion,
                        G: item.resolution,
                        H: item.pageName,
                        I: new Date(item.startTime).toLocaleString(),
                        J: item.errorCount
                    };
                    traceData.push(row);
                });

                //创建book
                let wb = XLSX.utils.book_new();
                //json转sheet
                let ws = XLSX.utils.json_to_sheet(traceData, {
                    header: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                    skipHeader: true
                });
                //设置列宽
                ws['!cols'] = [
                    {width: 15},
                    {width: 15},
                    {width: 15},
                    {width: 15},
                    {width: 15},
                    {width: 15},
                    {width: 15},
                    {width: 70},
                    {width: 25},
                    {width: 15}
                ];
                let timestamp = (new Date()).getTime();
                //sheet写入book
                XLSX.utils.book_append_sheet(wb, ws, '用户行为记录');
                //输出
                XLSX.writeFile(wb, '用户行为记录' + timestamp + '.xlsx');
            },
            // 查看详情
            goToDetail(id) {
                // 跳转参数id
                this.$store.commit('changeBehaviorTraceId', id);
                // 跳转至详情页
                this.$emit('change-content', {from: 'BehaviorTrack', to: 'BehaviorTrackDetail'});
            },
            // 处理分页
            handleCurrentChange(val) {
                // 设置当前页号
                this.currentPage = val;
                // 查询错误日志数据
                this.getUserTraceData();
            },
        },
        watch: {
            // 搜索用户ip关键词改变时发送请求
            keywordUserIP() {
                this.debounceGetData();
            },
            // 搜索警员ID关键词改变时发送请求
            keywordPoliceId() {
                this.debounceGetData();
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.content-behavior-track {
    width: 100%;
    height: 100%;

    .select-area {
        width: 100%;
        height: 52px;
        padding: 10px 22px;
        background-color: #fff;
        box-shadow: 0 4px 8px 0 #b7c4e0;

        .right {
            float: right;
        }

        .select-area_item {
            display: inline-block;
            margin-left: 10px;

            .el-icon-search {
                margin-right: 8px;
            }

            ::v-deep .el-input__inner {
                height: 32px;
            }

            .download-icon {
                vertical-align: middle;
            }
        }

        .select-area_item:first-child {
            margin-left: 0;
        }
    }

    .trace-information {
        width: calc(100% - 44px);
        height: calc(100% - 96px);
        margin: 22px;
        padding: 32px;
        background-color: #fff;
        box-shadow: 0 4px 8px 0 #b7c4e0;
        border-radius: 5px;

        .trace-container {
            width: 100%;
            height: calc(100% - 44px);
            overflow: auto;

            .trace-container-item:hover {
                border: solid 1px #00baff;
            }

            .trace-container-item {
                width: 100%;
                padding: 10px 40px;
                margin-bottom: 24px;
                background-color: #f3f9ff;
                border-radius: 3px;
                border: solid 1px #dae6f1;
                cursor: pointer;
                display: flex;
                min-height: 52px;
                flex-wrap: wrap;

                .trace-container-item_col {
                    display: inline-block;
                    margin-right: 60px;
                    text-align: left;
                    line-height: 30px;

                    .item-title {
                        color: #919dbd;
                        margin-right: 8px;
                    }

                    .item-titile_detail {
                        color: #00baff;
                        float: right;
                    }

                    .item-content_error {
                        color: #ea4335;
                    }

                    .item-icon_terminal {
                        height: 22px;
                        width: 22px;
                        margin-right: 28px;
                        position: relative;
                        top: 4px;
                    }

                    .item-icon {
                        height: 18px;
                        width: 18px;
                        margin-right: 8px;
                        position: relative;
                        top: 4px;
                    }

                    .item-col-detail {
                        color: #00baff;
                        float: right;
                        cursor: pointer;
                    }

                    .red-circle {
                        width: 12px;
                        height: 12px;
                        margin-left: 10px;
                        position: relative;
                        top: 2px;
                        background-color: #fe9289;
                        border-radius: 50%;
                        display: inline-block;
                        box-shadow: 0 3px 6px 0 #ffe0dc;
                    }
                }

                .trace-container-item_col:last-child {
                    margin-right: 0;
                }

                .item-user-info {
                    width: 530px;
                    display: flex;

                    .item-user-info_col {
                        width: 180px;
                        margin-right: 28px;
                        font-size: 16px;
                        color: #505b73;

                        span {
                            margin-right: 8px;
                        }

                        span:nth-child(2) {
                            font-weight: bold;
                        }
                    }
                    .pol-id{
                        width: 140px;
                    }

                    .item-user-info_terminal {
                        width: 150px;
                        color: #626f8c;
                    }
                }

                .item-page {
                    width: 410px;
                }

                .item-time {
                    width: 250px;
                }

                .item-exist-error {
                    width: 160px;
                }
            }

            .trace-container-item:last-child {
                margin-bottom: 0;
            }
        }

        .page-area {
            width: 100%;
            height: 28px;
            margin-top: 14px;
        }
    }
}


.rtl-text{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    direction: rtl;
}
</style>
