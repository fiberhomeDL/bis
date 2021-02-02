<template>
    <div class="content-behavior-track">
        <div class="select-area">
            <div class="select-area_item">
                <service-select></service-select>
            </div>
            <div class="select-area_item">
                <el-input
                        placeholder="请输入用户IP地址"
                        suffix-icon="el-icon-search"
                        size="small"
                        clearable
                        v-model="userIp"
                        @keydown.enter.native="searchByIp">
                </el-input>
            </div>
            <div class="right">
                <div class="select-area_item">
                    <time-picker></time-picker>
                </div>
                <div class="select-area_item">
                    <download-button class="download-icon"></download-button>
                </div>
            </div>
        </div>
        <div class="trace-information">
            <div class="trace-container">
                <div v-for="(item,index) in traceData"
                     :key="index"
                     v-model="traceDataSelected">
                    <div class="trace-container-item" @click="goToDetail(item.id)">
                        <div class="trace-container-item_col item-user-ip">
                            <span class="item-title"> 用户IP:</span>
                            {{item.ip}}
                            <el-tooltip effect="light" :visible-arrow=false placement="top">
                                <div slot="content">{{item.browserVersion}}</div>
                                <img class="item-icon_user" :src="require('../../assets/img/terminal_icon/'+item.browserType+'.svg')"/>
                            </el-tooltip>
                            <el-tooltip effect="light" :visible-arrow=false placement="top">
                                <div slot="content">{{item.OperateVersion}}</div>
                                <img class="item-icon_user" :src="require('../../assets/img/terminal_icon/'+item.OperateType+'.svg')"/>
                            </el-tooltip>
                            <el-tooltip effect="light" :visible-arrow=false placement="top">
                                <div slot="content">{{item.screenHeight}}*{{item.screenWidth}}</div>
                                <img class="item-icon_user" :src="require('../../assets/img/terminal_icon/pc.svg')"/>
                            </el-tooltip>
                        </div>
                        <div class="trace-container-item_col item-page">
                            <img class="item-icon" :src="require('../../assets/img/common_icon/page.svg')"/>
                            <span class="item-title">页面:</span>
                            <span class="item-content">{{item.pageName}}</span>
                        </div>
                        <div class="trace-container-item_col item-time">
                            <img class="item-icon" :src="require('../../assets/img/common_icon/time.svg')"/>
                            <span class="item-title">访问时间:</span>
                            <span class="item-content">{{item.time}}</span>
                        </div>
                        <div class="trace-container-item_col item-exist-error">
                            <img class="item-icon" :src="require('../../assets/img/common_icon/error.svg')"/>
                            <span class="item-title">有无错误:</span>
                            <span v-if="item.isError" class="item-content item-content_error">有<span class="red-circle"></span></span>
                            <span v-else>无</span>
                        </div>
                        <div class="trace-container-item_col item-detail">
                            <span class="item-titile_detail">查看详情>></span>
                        </div>
                    </div>

                </div>
            </div>
            <div class="page-area">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="currentPageSize"
                        layout="total,prev,pager,next"
                        :total="traceData.length">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import ServiceSelect from "../common/ServiceSelect";
    import TimePicker from "../common/TimePicker";
    import DownloadButton from "../common/DownloadButton";

    export default {
        name: "BehaviorTrack",
        components: {DownloadButton, ServiceSelect, TimePicker},
        data() {
            return {
                // 用户ip
                userIp: '',
                // 追踪数据
                traceData:[
                    {id:1,ip:'10.0.23.78',browserType:'Google',browserVersion:'87.1',
                        OperateType:'Windows',OperateVersion:'Win10',pageName:'index.html',screenHeight:1920,screenWidth:1080,time:'2020-02-01 12:00:00',isError:true},
                    {id:2,ip:'10.0.23.88',browserType:'Google',browserVersion:'83.22',
                        OperateType:'Windows',OperateVersion:'Win8',pageName:'/sdfe/sefe/sfefeg/safae/sfe/index.html',screenHeight:1366,screenWidth:768,time:'2020-02-01 12:00:00',isError:false}],
                // 选中追踪条目
                traceDataSelected:'',
            }
        },
        methods: {
            // 根据ip搜索数据
            searchByIp() {

            },
            // 查看详情
            goToDetail(id){
                console.info(id);
            },

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
            border-radius: 3px;

            .trace-container {
                width: 100%;
                height: calc(100% - 44px);
                .trace-container-item:hover{
                    border: solid 1px #00baff;
                }
                .trace-container-item{
                    height: 53px;
                    width: 100%;
                    padding:10px 40px;
                    margin-bottom: 28px;
                    background-color: #f3f9ff;
                    border-radius: 3px;
                    border: solid 1px #dae6f1;
                    cursor: pointer;
                    .trace-container-item_col{
                        display: inline-block;
                        .item-title{
                            color: #919dbd;
                            margin-right: 8px;
                        }
                        .item-titile_detail{
                            color: #00baff;
                            float:right;
                        }
                        .item-content{
                            color: #575777;
                        }
                        .item-content_error{
                            color: #ea4335;
                        }
                        .item-icon_user{
                            height: 22px;
                            width: 22px;
                            margin-left:22px;
                            position: relative;
                            top:4px;
                        }
                        .item-icon{
                            height: 18px;
                            width: 18px;
                            margin-right:8px;
                            position: relative;
                            top:4px;
                        }
                        .item-col-detail{
                            color: #00baff;
                            float:right;
                            cursor: pointer;
                        }
                        .red-circle{
                            width: 12px;
                            height: 12px;
                            margin-left:10px;
                            position: relative;
                            top: 2px;
                            background-color: #fe9289;
                            border-radius: 50%;
                            display: inline-block;
                            box-shadow: 0 3px 6px 0 #ffe0dc;
                        }
                    }
                    .item-user-ip{
                        width:25%;
                        font-size: 16px;
                        font-weight: bold;
                        .item-title{
                            font-size: 16px;
                            font-weight: bold;
                            margin-right: 8px;
                            color: #505b73;
                        }
                    }
                    .item-page{
                        width:30%;
                    }
                    .item-time{
                        width:20%;
                    }
                    .item-exist-error{
                        width:15%;
                    }
                    .item-detail{
                        width:10%;
                    }
                }
            }

            .page-area {
                width: 100%;
                height: 28px;
                margin-top: 14px;
            }
        }

    }


</style>
