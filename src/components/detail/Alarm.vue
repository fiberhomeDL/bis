<template>
    <div class="content-alarm"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
        <!--选项区域-->
        <div class="select-area">
            <div class="select-area_item">
                <service-select @onSelectChange="getAlarmData"></service-select>
            </div>
            <div class="select-area_item">
                <span>过滤范围：</span>
                <el-select v-model="filterScope" placeholder="请选择过滤字段" :size="'small'" @change="getAlarmData">
                    <el-option
                            v-for="item in filterScopeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select-area_item">
                <el-input
                        placeholder="关键词搜索"
                        suffix-icon="el-icon-search"
                        size="small"
                        clearable
                        v-model="keyword"
                        @keydown.enter.native="getAlarmData">
                </el-input>
            </div>
            <div class="select-area_item">
                <time-picker @changeTime="getAlarmData"></time-picker>
            </div>
        </div>
        <div class="hw100-oh" style="padding: 22px;">
            <!--分页-->
            <div class="hw100-oh alarm-info" :class="{'nodata': alarmList.length === 0}">
                <div v-if="alarmList.length !== 0" class="pagination-area">
                    <span class="el-icon-arrow-left icon-page" @click="reducePage"></span>
                    <el-input v-model="pageInputNumber" size="mini" class="pagination-input"
                              @change="getAlarmData"></el-input>
                    <span style="color:rgb(80,91,115);">/{{totalPage}}</span>
                    <span class="el-icon-arrow-right icon-add-page icon-page" @click="addPage"></span>
                </div>
                <!--告警列表-->
                <div class="list-area">
                    <div v-for="(item,index) in alarmList">
                        <div class="time-group">
                            <div class="time-item-area">
                                <span class="circle-style"></span>
                                <span class="time-text">{{new Date(item.startTime).toLocaleString()}}</span>
                            </div>
                            <div class="time-item-content">{{item.message}}</div>
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
    import httpReq from "@js/alarm";
    import util from "@js/common";
    // 一页展示数量
    const pageSize = 9;
    export default {
        name: "Alarm",
        components: {ServiceSelect, TimePicker},
        data() {
            return {
                // 加载中标识
                loading: true,
                // 过滤范围
                filterScope: 'All',
                // 过滤范围选项
                filterScopeOptions: [
                    {value: 'All', label: '全部'},
                    {value: 'browser_app_page_error_sum_rule', label: '错误总量'},
                    {value: 'browser_app_page_ajax_error_sum_rule', label: 'Ajax错误量'},
                    {value: 'browser_app_page_resource_error_sum_rule', label: '静态资源加载异常'},
                    {value: 'browser_app_page_js_error_sum_rule', label: 'Js错误量'},
                    {value: 'browser_app_page_unknown_error_sum_rule', label: '未知错误量'},
                    {value: 'browser_app_page_ttfb_avg_rule', label: '请求响应时间'},
                    {value: 'browser_app_page_trans_avg_rule', label: '内容传输时间'},
                    {value: 'browser_app_page_dom_analysis_avg_rule', label: 'Dom解析时间'},
                    {value: 'browser_app_page_res_avg_rule', label: '资源加载时间'},
                    {value: 'browser_app_page_fmp_avg_rule', label: '首屏时间'},
                    {value: 'browser_app_page_fpt_avg_rule', label: '白屏时间'},
                    {value: 'browser_app_page_dom_ready_avg_rule', label: 'Html完全加载时间'},
                    {value: 'browser_app_page_load_page_avg_rule', label: '页面完全加载时间'}
                ],
                // 关键词
                keyword: '',
                // 告警列表
                alarmList: [],
                // 告警总量页数
                totalPage: 0,
                // 输入的页码
                pageInputNumber: 1,
            }
        },
        created() {
            // 防抖，延时执行方法
            this.debounceGetData = this._.debounce(this.getAlarmData, 1200);
        },
        mounted() {
            // 查询告警数据
            this.getAlarmData();
        },
        methods: {
            // 查询告警数据
            getAlarmData() {
                let that = this;
                // 加载中
                that.loading = true;
                // 应用ID
                let serviceId = that.$store.state.selectedServiceId;
                // 过滤范围
                let filterScope = that.filterScope === "All" ? '' : that.filterScope;
                // 关键词
                let keyword = that.keyword;
                // 时间
                let duration = util.formatStartAndEndTime(that.$store.state.time);
                // 页码
                let paging = {pageNum: that.pageInputNumber, pageSize: pageSize, needTotal: true};
                // 查询告警数据
                return httpReq.getAlarmData(keyword, serviceId, filterScope, duration, paging).then(data => {
                    // 取消加载中
                    that.loading = false;
                    // 赋值、告警列表
                    that.alarmList = data.getAlarm.items;
                    // 赋值、告警列表总页数
                    that.totalPage = Math.ceil(data.getAlarm.total / pageSize);
                });
            },
            // 减少页面
            reducePage() {
                if (1 !== this.pageInputNumber) {
                    this.pageInputNumber--;
                    // 更新数据
                    this.getAlarmData();
                }
            },
            // 增加页面
            addPage() {
                if (this.totalPage !== this.pageInputNumber) {
                    this.pageInputNumber++;
                    // 更新数据
                    this.getAlarmData();
                }
            },
        },
        watch: {
            // 监听页码输入值
            pageInputNumber() {
                // 控制最大值最小值
                this.pageInputNumber = this.pageInputNumber < 1 ? 1 : (this.pageInputNumber > this.totalPage ? this.totalPage : this.pageInputNumber);
                // 查询告警数据
                this.getAlarmData();
            },
            // 搜索关键词改变时发送请求
            keyword() {
                this.debounceGetData();
            },
        },
    }
</script>

<style lang="scss">
    @import '@css/style.scss';

    .content-alarm {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .select-area {
            min-height: 52px;
            width: 100%;
            padding: 10px 22px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;

            .select-area_item {
                display: inline-block;
                margin-left: 10px;

                span {
                    @extend .sub-normal-text;
                }
            }

            .select-area_item:last-child {
                flex: 1;
                text-align: right;
            }
        }

        .alarm-info {
            padding: 32px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            border-radius: 3px;
            position: relative;

            .pagination-area {
                margin-bottom: 22px;

                .pagination-input {
                    padding: 0 4px;
                    width: 64px;
                }

                .icon-page {
                    cursor: pointer;
                }

                .icon-page:hover {
                    color: #00baff;
                }

                .icon-add-page {
                    padding-left: 4px;
                }

            }

            .list-area {
                height: calc(100% - 50px);
                overflow: auto;

                .time-group {
                    span {
                        display: inline-block;
                    }

                    .time-item-area {
                        .circle-style {
                            height: 16px;
                            width: 16px;
                            border-radius: 100%;
                            border: 3px solid #d4f3ff;
                            background-color: #00baff;
                        }

                        .time-text {
                            padding-left: 10px;
                            position: relative;
                            top: -2px;
                            color: #505B73;
                            font-weight: bolder;
                        }
                    }

                    .time-item-content {
                        padding: 20px 18px;
                        border-left: 4px dotted rgb(179, 233, 255);
                        margin-left: 6px;
                        color: #919dbd;
                    }
                }
            }
        }
    }

</style>
