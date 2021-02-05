<template>
    <div class="content-alarm">
        <div class="select-area">
            <div class="select-area_item">
                <service-select></service-select>
            </div>
            <div class="select-area_item">
                <el-input
                        placeholder="关键词搜索"
                        suffix-icon="el-icon-search"
                        size="small"
                        clearable
                        v-model="keywords"
                        @keydown.enter.native="searchByKeywords">
                </el-input>
            </div>
            <div class="select-area_item">
                <time-picker></time-picker>
            </div>
        </div>
        <div class="hw100-oh" style="padding: 22px;">
            <div class="hw100-oh alarm-info">
                <div class="pagination-area">
                    <span class="el-icon-arrow-left icon-page" @click="reducePage"></span>
                    <el-input v-model="pageInputNumber" size="mini" class="pagination-input"
                              @change="queryResultList"></el-input>
                    <span style="color:rgb(80,91,115);">/{{alarmTotal}}</span>
                    <span class="el-icon-arrow-right icon-add-page icon-page" @click="addPage"></span>
                </div>
                <div class="list-area">
                    <div v-for="(item,index) in alarmList">
                        <div class="time-group">
                            <div class="time-item-area">
                                <span class="circle-style circle-style-blue"></span>
                                <span class="time-text">{{item.startTime}}</span>
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
    import ServiceSelect from "../common/ServiceSelect";
    import TimePicker from "../common/TimePicker";

    export default {
        name: "Alarm",
        components: {ServiceSelect, TimePicker},
        data() {
            return {
                // 关键词
                keywords: '',
                // 告警列表
                alarmList: [
                    {startTime: '2020-03-23 12:00:00', message: '在最近十分钟，应用test-index.htmlTCP连接时间大于2s'},
                    {startTime: '2020-03-23 12:00:00', message: '在最近十分钟，应用test-index.htmlTCP连接时间大于2s'},
                    {startTime: '2020-03-23 12:00:00', message: '在最近十分钟，应用test-index.htmlTCP连接时间大于2s'},
                    {startTime: '2020-03-23 12:00:00', message: '在最近十分钟，应用test-index.htmlTCP连接时间大于2s'},
                    {startTime: '2020-03-23 12:00:00', message: '在最近十分钟，应用test-index.htmlTCP连接时间大于2s'},
                    {startTime: '2020-03-23 12:00:00', message: '在最近十分钟，应用test-index.htmlTCP连接时间大于2s'},
                    {startTime: '2020-03-23 12:00:00', message: '在最近十分钟，应用test-index.htmlTCP连接时间大于2s'},
                    {startTime: '2020-03-23 12:00:00', message: '在最近十分钟，应用test-index.htmlTCP连接时间大于2s'},
                    {startTime: '2020-03-23 12:00:00', message: '在最近十分钟，应用test-index.htmlTCP连接时间大于2s'},
                ],
                // 输入的页码
                pageInputNumber: 1,
            }
        },
        methods: {
            handleSelect() {
            },
            // 减少页面
            reducePage() {
                if (1 !== this.pageInputNumber) {
                    this.pageInputNumber--;
                    // 更新数据
                }
            },
            // 增加页面
            addPage() {
                if (this.alarmTotal !== this.pageInputNumber) {
                    this.pageInputNumber++;
                    // 更新数据
                }
            },
            // 查询结果
            queryResultList() {
            },
            // 关键词搜索
            searchByKeywords() {
            },
        },
        computed: {
            // 告警数量
            alarmTotal: function () {
                return this.alarmList.length;
            }
        },

    }
</script>

<style lang="scss" scoped>
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
                    width: 3%;
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
