<template>
    <div class="content-page-monitor">
        <div class="select-area">
            <div class="select-area_item">
                <service-select></service-select>
            </div>
            <div class="right">
                <div class="select-area_item">
                    <time-picker></time-picker>
                </div>
            </div>
        </div>
        <div class="page-information">
            <div class="page-information-container">
                <div class="page-information-container-left">
                    <div class="page-name-container">
                        <div class="page-select-area_item">
                            <span>排序:</span>
                            <el-select v-model="orderData" placeholder="请选择" :size="'small'" class="order-select">
                                <el-option
                                        v-for="item in orderDataOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="page-select-area_item">
                            <el-input
                                    placeholder="请输入用户IP地址"
                                    suffix-icon="el-icon-search"
                                    size="small"
                                    clearable
                                    v-model="userIp"
                                    @keydown.enter.native="searchByIp">
                            </el-input>
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
        name: "PageMonitor",
        components: {ServiceSelect, TimePicker},
        data(){
            return{
                // 排序数据
                orderData:'',
                // 排序数据选项
                orderDataOptions:[],
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
    .content-page-monitor{
        width: 100%;
        height: 100%;
        .select-area {
            width: 100%;
            height: 52px;
            padding: 10px 22px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            .select-area_item {
                display: inline-block;
            }
            .right {
                float: right;
            }
        }
        .page-information {
            width: calc(100% - 44px);
            height: calc(100% - 96px);
            margin: 22px;
            padding: 32px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            border-radius: 3px;
            &-container{
                height: 100%;
                width: 100%;
                &-left{
                    height: 100%;
                    width: 20%;
                    border-right: solid 1px #dfe8f7;
                    .page-name-container{
                        height: 100%;
                        width:100%;
                        padding-right: 32px;
                        .page-select-area_item {
                            margin-bottom: 22px;
                            span{
                                @extend .sub-normal-text;
                            }
                            .order-select{
                                width: calc(100% - 40px);
                                margin-left:8px;
                                position: relative;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
