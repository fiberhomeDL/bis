<template>
    <div class="cluster-analysis flex-column hw100-oh"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <!--      头部-->
        <div class="cluster-analysis-header flex-row">
            <div class="cluster-analysis-header-left flex-row">
                <service-select @onSelectChange="renderData"></service-select>
                <div class="flex-row" style="align-items: center;padding: 0 12px">
                    <span class="sub-normal-text" style="white-space: nowrap">错误类目：</span>
                    <el-select :size="'small'" v-model="errorSelect" placeholder="请选择">
                        <el-option
                                v-for="item in errorTypeData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="cluster-analysis-header-right">
                <time-picker @changeTime="renderData"></time-picker>
            </div>
        </div>
        <!--      内容-->
        <div class="cluster-analysis-wrapper" v-if="!loading">
            <div class="cluster-analysis-body">
                <el-row :gutter="20" class="cluster-analysis-body-top">
                    <el-col :span="10" style="height: 100%">
                        <div class="flex-column hw100-oh">
                            <sub-header-title sub-title="概况"></sub-header-title>
                            <div class="cluster-analysis-body-top-content hw100-oh flex-row">
                                <view-item :view-item-data="v" :key="i" v-for="(v,i) in viewItemArr"></view-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="14" style="height: 100%">
                        <div class="flex-column hw100-oh">
                            <sub-header-title sub-title="错误统计"></sub-header-title>
                            <div class="cluster-analysis-body-top-content hw100-oh p-b-10" style="padding-top: 10px;">
                                <cluster-analysis-bar :bar-data="{xData: $store.getters.getXAxisData,barValue: errorValues}">
                                </cluster-analysis-bar>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="cluster-analysis-body-bottom">
                    <sub-header-title :sub-title="'错误列表'" style="margin-bottom: 18px">
                        <template v-slot:option>
                            <download-button @click="doDownLoad"></download-button>
                        </template>
                    </sub-header-title>
                    <div v-show="errorSelect == 1 || errorSelect == 0">
                        <div class="source-error-item flex-row" :key="index" v-for="(item,index) in errorListForJsError"
                             @click="onErrorItemClick(item.errorType)">
                            <span class="source-error-item-tip"></span>
                            <span class="source-error-item-title">{{ item.errorType }}</span>
                            <span style="color: #919dbd">【总共：{{item.errorTotalNum}}次 | 发生页面：{{item.appearPageNum}}个】</span>
                            <img class="source-error-item-img" :src="require('@img/common_icon/subscribers.svg')"
                                 alt="">
                            <span style="color: #505b73">（{{ item.affectUserNum }}）</span>
                        </div>
                    </div>
                    <div v-show="errorSelect == 2 || errorSelect == 0">
                        <div class="js-error-item flex-row" :key="index" v-for="(item,index) in errorListForResource">
                            <span style="color: #505b73">{{ item.errorType }}</span>
                            <span style="color: #919dbd">【总共：{{item.errorTotalNum}}次 | 发生页面：{{item.appearPageNum}}个】</span>
                            <img class="js-error-item-img" :src="require('@img/common_icon/subscribers.svg')" alt="">
                            <span style="color: #505b73">（{{ item.affectUserNum }}）</span>
                        </div>
                    </div>
                    <!--            展示的错误列表为空-->
                    <div style="height: 350px" v-show="(errorListForJsError.length + errorListForResource.length) == 0">
                        <no-data :img-width="200" :font-size="18"></no-data>
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import ServiceSelect from "@/components/common/ServiceSelect";
    import TimePicker from "@/components/common/TimePicker";
    import SubHeaderTitle from "@/components/common/SubHeaderTitle";
    import ViewItem from "@/components/common/cluster_analysis/ViewItem";
    import ClusterAnalysisBar from "@/components/common/cluster_analysis/ClusterAnalysisBar";
    import httpReq from "@js/clusterAnalysis.js";
    import DownloadButton from "@/components/common/DownloadButton";
    import XLSX from 'xlsx';
    import NoData from "@/components/common/NoData";

    export default {
        name: "ClusterAnalysis",
        components: {ServiceSelect, TimePicker, SubHeaderTitle, ViewItem, ClusterAnalysisBar, DownloadButton, NoData},
        data() {
            return {
                //是否加载
                loading: false,
                //概况数据
                viewItemArr: [
                    {
                        name: '总发生',
                        value: '--',
                        imgUrl: require('@img/common_icon/error_big.svg'),
                        mainColor: '#fe9289',
                        shadowStyle: {
                            boxShadow: '0px 4px 10px 4px #fdcabf',
                            borderRadius: '25px'
                        }
                    },
                    {
                        name: '影响页面',
                        value: '--',
                        imgUrl: require('@img/common_icon/page_big.svg'),
                        mainColor: '#57d9f9',
                        shadowStyle: {boxShadow: '0px 4px 10px 4px #d5f1f5'}
                    },
                    {
                        name: '影响用户',
                        value: '--',
                        imgUrl: require('@img/common_icon/mumber.svg'),
                        mainColor: '#75e7d6',
                        shadowStyle: {}
                    }
                ],
                //错误统计
                errorValues: [],
                errorSelect: '0',
                errorTypeData: [
                    {
                        value: '0',
                        label: '全部',
                    },
                    {
                        value: '1',
                        label: 'js错误',
                    },
                    {
                        value: '2',
                        label: '静态资源加载异常'
                    }
                ],
                errorList: []
            }
        },
        computed: {
            errorListForJsError() {
                return this.errorList.filter(item => item.errorFlag == "1").sort(function (x, y) {
                    return y.errorTotalNum - x.errorTotalNum;
                });
            },
            errorListForResource() {
                return this.errorList.filter(item => item.errorFlag == "2").sort(function (x, y) {
                    return y.errorTotalNum - x.errorTotalNum;
                });
            },
        },
        methods: {
            //渲染数据
            renderData() {
                this.loading = true;
                let serviceName = this.$store.getters.getSelectServiceName;
                let serviceId = this.$store.state.selectedServiceId;
                let time = this.$store.state.time;
                httpReq.getAllData(serviceName, serviceId, time).then(appInfo => {
                    //  赋值操作
                    this.viewItemArr[0].value = appInfo.errorTotalNum;
                    this.viewItemArr[1].value = appInfo.appearPageNum;
                    this.viewItemArr[2].value = appInfo.affectUserNum;

                    this.errorValues = appInfo.errorValues
                    this.errorList = appInfo.errorList;
                    // 取消加载中
                    this.loading = false;
                })
            },
            // 跳转至详情页
            onErrorItemClick(errorType) {
                this.$store.commit('setErrorItemClickType', errorType);
                this.$emit('change-content', {from: 'ClusterAnalysis', to: 'ClusterAnalysisDetail'});
            },
            // 下载
            doDownLoad() {
                // 表格数据
                let errorData = [];
                // 设置表头
                errorData.push({A: '错误信息', B: '发生次数', C: '影响页面数', D: '影响用户数',});
                // 写入每行数据
                this.errorList.forEach(function (item, index) {
                    let row = {
                        A: item.errorType,
                        B: item.errorTotalNum,
                        C: item.appearPageNum,
                        D: item.affectUserNum
                    };
                    errorData.push(row);
                });

                //创建book
                let wb = XLSX.utils.book_new();
                //json转sheet
                let ws = XLSX.utils.json_to_sheet(errorData, {
                    header: ['A', 'B', 'C', 'D', 'E', 'F'],
                    skipHeader: true
                });
                //设置列宽
                ws['!cols'] = [
                    {width: 100},
                    {width: 20},
                    {width: 20},
                    {width: 20}
                ];
                let timestamp = (new Date()).getTime();
                //sheet写入book
                XLSX.utils.book_append_sheet(wb, ws, '错误列表');
                //输出
                XLSX.writeFile(wb, '错误列表' + timestamp + '.xlsx');
            }
        },
        created() {
            this.$nextTick(() => {
                this.renderData();
            });
        }
    };
</script>

<style lang="scss">
    @import '@css/style.scss';

    .js-error-item, .source-error-item {
        height: 52px;
        border-radius: 3px;
        border: solid 1px #dae6f1;
        background: #f3f9ff;
        align-items: center;
        padding: 0 30px;
        margin-bottom: 22px;

        &-img {
            padding: 0 8px 0 12px;
            height: 18px;
        }

        &-tip {
            width: 12px;
            height: 12px;
            background-color: #fe9289;
            box-shadow: 0px 3px 6px 0px #ffe0dc;
            border-radius: 6px;
        }

        &-title {
            color: #00baff;
            font-size: 16px;
            font-weight: bold;
            padding: 0 22px 0 16px;
        }
    }

    .source-error-item:hover {
        border: solid 1px #00baff;
        background: #f2fbff;
        cursor: pointer;
    }


    .cluster-analysis {
        &-header {
            min-height: 52px;
            background-color: #ffffff;
            box-shadow: 0px 4px 8px 0px #b7c4e0;
            padding: 0 24px;
            justify-content: space-between;
            align-items: center;

            &-left {
                flex: 1;
            }
        }

        &-wrapper {
            height: 100%;
            overflow: hidden;
            padding: 20px;
        }

        &-body {
            height: 100%;
            width: 100%;
            background: #fff;
            overflow: hidden;
            overflow-y: auto;
            box-shadow: 0px 4px 8px 0px #b7c4e0;
            border-radius: 4px;
            padding: 34px 32px;

            &-top {
                height: 308px;

                &-content {
                    justify-content: space-around;
                    align-items: center;
                }
            }

            &-content {
                height: 53px;
                background: #f3f9ff;
                border-radius: 3px;
                border: solid 1px #dae6f1;
            }
        }

    }

    .p-b-10 {
        padding-bottom: 10px;
    }


</style>
