<template>
    <div class="ca-detail flex-column hw100-oh"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div class="ca-detail-header flex-row">
            <div class="ca-detail-header-left flex-row">
                <i class="el-icon-arrow-left"></i>
                <span class="back" @click="doBackClick">返回</span>
                <el-divider class="ca-detail-header-left-divider" direction="vertical"></el-divider>
                <span class="normal-text">{{ $store.state.errorItemClickType }}.</span>
            </div>
        </div>
        <div class="ca-detail-wrapper hw100-oh" v-if="!loading">
            <div class="ca-detail-body hw100-oh">
                <div class="flex-row ca-detail-body-header">
                    <el-divider class="ca-detail-body-header-divider"></el-divider>
                    <span class="ca-detail-body-header-title">概况</span>
                </div>
                <div class="flex-row ca-detail-body-middle">
                    <view-item-for-detail :view-item-data="v" :key="i"
                                          v-for="(v,i) in viewItemArr"></view-item-for-detail>
                </div>
                <div ca-detail-body-bottom>
                    <el-table
                            :data="errorList"
                            style="width: 100%">
                        <el-table-column
                                v-for="(item,index) in errorTableData.tableHead"
                                :key="index"
                                :prop="item.prop"
                                :label="item.label"
                                :width="item.width">
                            <template slot-scope="scope">
                                <img v-if="item.prop == 'browserType'" width="24"
                                     :src="require(`@img/terminal_icon/${scope.row[item.prop]}.svg`)" alt="">
                                <img v-else-if="item.prop == 'operatingSystem'" width="24"
                                     :src="require(`@img/terminal_icon/${scope.row[item.prop]}.svg`)" alt="">
                                <span v-else-if="item.prop == 'startTime'">
                                    {{new Date(scope.row[item.prop]).toLocaleString()}}
                                </span>
                                <span v-else>{{scope.row[item.prop]}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TimePicker from "@/components/common/TimePicker";
    import SubHeaderTitle from "@/components/common/SubHeaderTitle";
    import ViewItemForDetail from "@/components/common/cluster_analysis/ViewItemForDetail";
    import util from '@js/common';

    export default {
        name: "ClusterAnalysisDetail.vue",
        components: {
            TimePicker,
            SubHeaderTitle,
            ViewItemForDetail
        },
        data() {
            return {
                loading: false,
                errorList: [],
                errorTableData: {
                    tableHead: [
                        {
                            prop: 'message',
                            label: '错误信息'
                        },
                        {
                            prop: 'pagePath',
                            label: '页面'
                        },
                        {
                            prop: 'userIp',
                            label: '用户IP地址',
                            width: '160'
                        },
                        {
                            prop: 'browserType',
                            label: '浏览器类型',
                            width: '120'
                        },
                        {
                            prop: 'browserVersion',
                            label: '浏览器版本',
                            width: '160'
                        },
                        {
                            prop: 'operatingSystem',
                            label: '操作系统',
                            width: '120'
                        },
                        {
                            prop: 'operatingSystemVersion',
                            label: '操作系统版本',
                            width: '160'
                        },
                        {
                            prop: 'startTime',
                            label: '发生时间',
                            width: '160'
                        }
                    ],
                    tableData: []
                }
            }
        },
        methods: {
            doBackClick() {
                this.$emit('change-content', {
                    from: 'ClusterAnalysisDetail',
                    to: 'ClusterAnalysis'
                });
            }
        },
        computed: {
            viewItemArr() {
                if (this.errorList.length == 0) {
                    return [];
                }
                //获取所有错误的浏览器数组
                let browserArr = this.errorList.map(item => item.browserType);
                let osArr = this.errorList.map(item => item.operatingSystem);
                let userCount = new Set(this.errorList.map(item => item.userIp)).size;
                /*内部方法用于获取name在arr中的数量*/
                function getCount(name, arr) {
                    return arr.filter(item => item == name).length
                }
                /*['a','a','b'] => {key: 'a', count: 2}*/
                function getCountObj(arr) {
                    let dba = Array.from(new Set(arr));
                    return dba.map(item => {
                        return {
                            key: item,
                            count: getCount(item, arr)
                        }
                    }).sort(function (x, y) {
                        return y.count - x.count
                    })[0];
                }
                return [
                    {
                        name: '总发生',
                        value: this.errorList.length,
                        imgUrl: require('@img/common_icon/error_big.svg'),
                        mainColor: '#fe9289',
                        shadowStyle: {
                            boxShadow: '0px 4px 10px 4px #fdcabf',
                            borderRadius: '25px'
                        },
                    },
                    {
                        name: '影响用户',
                        value: userCount,
                        imgUrl: require('@img/common_icon/mumber.svg'),
                        mainColor: '#75e7d6'
                    },
                    {
                        name: '出现次数最多',
                        value: getCountObj(browserArr).count,
                        imgUrl: require(`@img/terminal_icon/${getCountObj(browserArr).key}.svg`),
                        mainColor: '#72b5fa',
                        borderColor: 'white',
                        imgSize: 66
                    },
                    {
                        name: '出现次数最多',
                        value: getCountObj(osArr).count,
                        imgUrl: require(`@img/terminal_icon/${getCountObj(osArr).key}.svg`),
                        mainColor: '#37dcff',
                        borderColor: 'white',
                        imgSize: 60
                    }
                ]
            }
        },
        filter: {},
        created() {
            this.$nextTick(() => {
                this.loading = true;
                let errorType = this.$store.state.errorItemClickType;
                let serviceId = this.$store.state.selectedServiceId;
                let duration = util.formatStartAndEndTime(this.$store.state.time);

                this.$http.post('/graphql', {
                    query: `
          query
          ($condition: BrowserAggregateAnalyzerQueryCondition!) {
            errorList: queryAggregateAnalyzerLogDetail(condition: $condition){
              logs {
                errorType
                pagePath
                userIp
                policeId
                browserType
                browserVersion
                operatingSystem
                operatingSystemVersion
                screenHeight
                screenWidth
                startTime
                grade
                message
                line
                col
                stack
                errorUrl
                firstReportedError
              }
            }
          }

        `,
                    variables: {
                        "condition": {
                            "serviceId": serviceId,
                            "errorType": errorType,
                            "duration": duration
                        }
                    }
                }).then(data => {
                    if (data && data.errorList) {
                        this.errorList = data.errorList.logs;
                        this.loading = false;
                    }
                })
            })
        }
    }
</script>

<style lang="scss">
    @import '@css/style.scss';

    .ca-detail {
        .back {
            cursor: pointer;
        }

        font-size: 14px;

        &-header {
            background: white;
            min-height: 52px;
            box-shadow: 0px 4px 8px 0px #b7c4e0;
            padding: 0 24px;
            justify-content: space-between;
            align-items: center;

            &-left {
                color: #919dbd;
                align-items: center;

                &-divider {
                    margin: 0 14px;
                }
            }
        }

        &-wrapper {
            padding: 20px;
        }

        &-body {
            background: #fff;
            padding: 32px;
            overflow-y: auto;

            &-header {
                align-items: center;

                &-divider {
                    width: 4px;
                    height: 13px;
                    background-color: #00baff;
                    margin: 0 8px 0 0;
                }

                &-title {
                    font-size: 16px;
                    color: #505b73;
                }
            }

            &-middle {
                padding: 30px 0;
                justify-content: space-around;
                align-items: center;
            }
        }

        .el-table th {
            background: #def2ff;
        }

        .el-table .cell {
            color: #575777;
        }
    }

</style>
