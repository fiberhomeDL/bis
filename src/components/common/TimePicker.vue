<template>
    <div class="time-picker">
        <span>时间选择：</span>
        <el-date-picker
                v-model="$store.state.time"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                align="right"
                size="small"
                @change="$emit('changeTime')">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        name: "TimePicker",
        data(){
            return{
                // 时间组件快捷菜单
                pickerOptions: {
                    shortcuts: [{
                        text: '最近15分钟',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 250);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近30分钟',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 500);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近1小时',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近1天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近1周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近1月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '@css/style.scss';
    .time-picker {
        span{
            @extend .sub-normal-text;
        }
        .el-range-editor.el-input__inner{
            border: solid 1px #cfd6e4;
        }
        ::v-deep .el-date-editor .el-range-separator {
            padding: 0;
        }
        ::v-deep .el-range-editor--small .el-range-input {
            font-size: 14px;
        }
        .el-date-editor--datetimerange.el-input__inner {
            width: 360px;
        }
    }

</style>
