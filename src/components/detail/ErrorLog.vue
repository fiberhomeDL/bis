<template>
    <div class="content-errorlog">
        <!--        选择区域-->
        <div class="select-area">
            <div class="select-area_item">
                <service-select></service-select>
            </div>
            <div class="select-area_item">
                <span>页面：</span>
                <el-select v-model="page" filterable placeholder="请选择页面" size="small">
                    <el-option
                            v-for="item in pageOptions"
                            :key="item.key"
                            :label="item.label"
                            :value="item.key">
                    </el-option>
                </el-select>
            </div>
            <div class="select-area_item">
                <span>错误类别：</span>
                <el-select v-model="errorType" placeholder="请选择错误类别" :size="'small'">
                    <el-option
                            v-for="item in errorTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select-area_item">
                <time-picker></time-picker>
            </div>
            <div class="select-area_item select-button">
                <el-button type="primary" size="small" @click="getErrorLog">
                    <i class="el-icon-search"></i>搜索
                </el-button>
            </div>
            <div class="select-area_item">
                <download-button class="download-icon" @click="download"></download-button>
            </div>
        </div>
        <!--        错误信息-->
        <div class="hw100-oh" style="padding: 22px;">
            <div class="hw100-oh error-information">
                <div class="table-container">
                    <el-table
                            :data="errorData"
                            style="width: 100%;"
                            :header-cell-style="tableHeaderCellStyle"
                            highlight-current-row>
                        <el-table-column
                                prop="service"
                                label="应用"
                                min-width="10%">
                        </el-table-column>
                        <el-table-column
                                prop="pagePath"
                                label="错误页面"
                                min-width="20%">
                        </el-table-column>
                        <el-table-column
                                prop="message"
                                label="错误信息">
                        </el-table-column>
                        <el-table-column
                                prop="time"
                                label="时间"
                                :formatter="formatterTime"
                                min-width="20%">
                        </el-table-column>
                        <el-table-column
                                prop="category"
                                label="错误类别"
                                min-width="20%">
                        </el-table-column>
                        <el-table-column
                                prop="grade"
                                label="错误等级"
                                min-width="20%">
                        </el-table-column>
                    </el-table>
                </div>
                <!--            分页-->
                <div class="page-area">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            layout="total,prev,pager,next"
                            :page-size="13"
                            :total="totalErrorData">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ServiceSelect from "@/components/common/ServiceSelect";
    import TimePicker from "@/components/common/TimePicker";
    import DownloadButton from "@/components/common/DownloadButton";
    import httpReq from "@js/error_log";
    import util from "@js/common"

    export default {
        name: "ErrorLog",
        components: {DownloadButton, ServiceSelect, TimePicker},
        data() {
            return {
                // 错误数据，一页13个
                errorData: [],
                totalErrorData: 0,
                // 应用
                service: '',
                // 页面
                page: 'All',
                // 全部页面数据
                pageOptions: [
                    {key: 'All', label: '全部'},
                ],
                // 错误类型
                errorType: 'ALL',
                // 错误类型选项
                errorTypeOptions: [
                    {value: 'ALL', label: '全部'},
                    {value: 'JS', label: 'Js错误'},
                    {value: 'AJAX', label: 'Ajax'},
                    {value: 'RESOURCE', label: '静态资源加载异常'},
                    {value: 'PROMISE', label: 'Promise错误'},
                    {value: 'VUE', label: 'Vue错误'},
                    {value: 'UNKNOWN', label: '未知错误'},
                ],
                // 当前页数
                currentPage: 1,
            }
        },
        mounted() {
            // 查询所有页面
            this.getAllPage();
            // 查询错误日志
            this.getErrorLog();
        },
        methods: {
            // 查询应用下所有页面
            getAllPage() {
                let that = this;
                // 应用ID
                // const serviceId = this.$store.state.selectedServiceId;
                let serviceId = "dGVzdC11aQ==.1";
                return httpReq.getAllPageData(serviceId).then(data => {
                    that.pageOptions = data.data.getEndpoints;
                    // 添加全部选项
                    that.pageOptions.unshift({key: 'All', label: '全部'});
                });
            },
            // 查询错误日志数据
            getErrorLog() {
                let that = this;
                // 应用ID
                // let serviceId = that.$store.state.selectedServiceId;
                let serviceId = '';
                // 时间
                let time = that.$store.state.time;
                let duration = {start: "2021-02-23 0706", end: "2021-02-23 0721", step: "MINUTE"};
                // 页面ID
                let pagePathId = that.page === 'All' ? '' : that.page;
                // 错误类别
                let category = that.errorType;
                // 页面对象,当前页号、一页数量、是否需要全部数量
                let paging = {
                    pageNum: that.currentPage,
                    pageSize: 13,
                    needTotal: true
                }
                return httpReq.getErrorLogData(serviceId, pagePathId, category, paging, duration).then(data => {
                    that.errorData = data.data.queryBrowserErrorLogs.logs;
                    that.totalErrorData = data.data.queryBrowserErrorLogs.total;
                });

            },
            // 格式化时间 返回yyyy-MM-dd hh:mm:ss
            formatterTime(cellValue) {
                return new Date(cellValue.time).toLocaleString();
            },
            // 页面名称过滤器
            createFilter(queryString) {
                return (item) => {
                    return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            // 设置表格header样式
            tableHeaderCellStyle() {
                return 'background-color: #def2ff';
            },
            // 下载
            download() {

            },
            // 处理分页
            handleCurrentChange(val) {
                // 设置当前页号
                this.currentPage = val;
                // 查询错误日志数据
                this.getErrorLog();
            },
        }
    }
</script>

<style lang="scss">
    @import '@css/style.scss';

    .content-errorlog {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .select-area {
            min-height: 52px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            width: 100%;
            padding: 10px 22px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;

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

                span {
                    @extend .sub-normal-text;
                }
            }

            .select-area_item:first-child {
                margin-left: 0;
            }

            .select-area_item:last-child {
                margin-left: auto;
            }

            .select-button {
                span {
                    color: #fff;
                }
            }
        }

        .error-information {
            height: 100%;
            padding: 32px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            border-radius: 5px;
            position: relative;

            .table-container {
                width: 100%;
                height: calc(100% - 44px);
                overflow: auto;
            }

            .page-area {
                width: 100%;
                height: 28px;
                margin-top: 14px;
            }
        }

    }

    .el-table {
        border-radius: 3px;
        border: solid 1px #dfe8f7;
        padding: 2px;
        color: #575777;
    }

    @media screen and (max-width: 1440px) {
        .content-errorlog .select-area {
            height: 100px;
        }
        .content-errorlog .select-area .select-area_item:nth-child(4) {
            margin-left: 0;
        }
    }

</style>
