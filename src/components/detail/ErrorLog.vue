<template>
    <div class="content-errorlog">
        <div class="select-area">
            <div class="select-area_item">
                <span>应用：</span>
                <el-select v-model="service" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select-area_item">
                <span>页面：</span>
                <el-select v-model="service" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select-area_item">
                <span>错误类别：</span>
                <el-select v-model="service" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select-area_item">
                <span>错误等级：</span>
                <el-select v-model="service" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select-area_item">
                <span>时间选择：</span>
                <el-date-picker
                        v-model="timeValue"
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        align="right"
                        size="small">
                </el-date-picker>
            </div>
            <div class="select-area_item">
                <el-button type="primary" size="small">
                    <i class="el-icon-search"></i>搜索
                </el-button>
            </div>
            <div class="select-area_item">
                <download-button class="download-icon"></download-button>
            </div>
        </div>
        <div class="error-information">
            <div class="table-container">
                <el-table
                        :data="errorData"
                        style="width: 100%"
                        :header-cell-style="tableHeaderCellStyle"
                        highlight-current-row>
                    <el-table-column
                            prop="service"
                            label="应用"
                            min-width="10%">
                    </el-table-column>
                    <el-table-column
                            prop="pageName"
                            label="错误页面"
                            min-width="20%">
                    </el-table-column>
                    <el-table-column
                            prop="errorInfo"
                            label="错误信息">
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="时间"
                            min-width="20%">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="类别"
                            min-width="20%">
                    </el-table-column>
                    <el-table-column
                            prop="grade"
                            label="等级"
                            min-width="20%">
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-area">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="currentPageSize"
                        layout="total,prev,pager,next"
                        :total="errorData.length">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import DownloadButton from "../common/DownloadButton";
    export default {
        name: "ErrorLog",
        components: {DownloadButton},
        data(){
            return{
                errorData:[{service:'sim',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim2',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},],
                // 时间
                timeValue:[],
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
        methods:{
            tableHeaderCellStyle(){
                return 'background-color: #def2ff';
            },
            handleCurrentChange(){},
            currentPage(){},
            currentPageSize(){},
        }
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
    .content-errorlog{
        width: 100%;
        height: 100%;
        .select-area{
            width:100%;
            height: 52px;
            padding: 10px 22px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            .select-area_item{
                display: inline-block;
                margin-left:14px;
                .el-icon-search{
                    margin-right: 8px;
                }
                .el-range-editor.el-input__inner{
                    border: solid 1px #cfd6e4;
                }
                ::v-deep .el-input__inner {
                    height: 32px;
                }
                .download-icon{
                    vertical-align: middle;
                }
                span{
                    @extend .sub-normal-text;
                }
            }
            .select-area_item:first-child{
                margin-left:0;
            }
        }
        .error-information{
            width:calc(100% - 44px);
            height:calc(100% - 96px);
            margin:22px;
            padding:32px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            border-radius: 3px;

            .table-container{
                width: 100%;
                height: calc(100% - 44px);
            }
            .page-area{
                width: 100%;
                height: 28px;
                margin-top:14px;
                .el-pagination{
                    text-align:right;
                }
                ::v-deep .el-pagination__total{
                    float:left;
                }
            }
        }

    }

.el-table{
    border-radius: 3px;
    border:solid 1px #dfe8f7;
    padding:2px;
    color:#575777;
}
::v-deep .el-date-editor .el-range-separator {
    padding: 0;
}



</style>
