<template>
    <div class="content-errorlog">
        <div class="select-area">
            <div class="select-area_item">
                <service-select></service-select>
            </div>
            <div class="select-area_item">
                <span>页面：</span>
                <el-autocomplete
                        class="inline-input"
                        v-model="page"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect">
                </el-autocomplete>
            </div>
            <div class="select-area_item">
                <span>错误类别：</span>
                <el-select v-model="errorType" placeholder="请选择" :size="'small'">
                    <el-option
                            v-for="item in errorTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select-area_item">
                <span>错误等级：</span>
                <el-select v-model="errorGrade" placeholder="请选择" :size="'small'">
                    <el-option
                            v-for="item in errorGradeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select-area_item">
                <time-picker></time-picker>
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
    </div>
</template>

<script>
    import ServiceSelect from "../common/ServiceSelect";
    import TimePicker from "../common/TimePicker";
    import DownloadButton from "../common/DownloadButton";

    export default {
        name: "ErrorLog",
        components: {DownloadButton,ServiceSelect,TimePicker},
        data(){
            return{
                // 错误数据，一页13个
                errorData:[
                    {service:'sim',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim2',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim2',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim2',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim2',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim2',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim2',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                    {service:'sim',pageName:'index.html',errorInfo:'xxxx',time:'xxxx',type:'ajax',grade:'warining'},
                ],
                // 应用
                service:'',
                // 页面
                page:'index.html',
                pageData:[ { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },],
                // 错误类型
                errorType:'',
                // 错误类型选项
                errorTypeOptions:[],
                // 错误等级
                errorGrade:'',
                // 错误等级选项
                errorGradeOptions:[],
            }
        },
        methods:{
            querySearch(queryString, cb) {
                var restaurants = this.pageData;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            },
            // 设置表格header样式
            tableHeaderCellStyle(){
                return 'background-color: #def2ff';
            },
            // 分页
            handleCurrentChange(){},
            currentPage(){},
            currentPageSize(){},
        }
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
    .content-errorlog{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        .select-area{
            min-height: 52px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            width:100%;
            padding: 10px 22px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            .select-area_item{
                display: inline-block;
                margin-left:10px;
                .el-icon-search{
                    margin-right: 8px;
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
            height: 100%;
            padding:32px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            border-radius: 5px;
            position: relative;

            .table-container{
                width: 100%;
                height: calc(100% - 44px);
                overflow: auto;
            }
            .page-area{
                width: 100%;
                height: 28px;
                margin-top:14px;
            }
        }

    }

.el-table{
    border-radius: 3px;
    border:solid 1px #dfe8f7;
    padding:2px;
    color:#575777;
}
    @media screen and (max-width: 1680px){
        .content-errorlog .select-area {height: 100px;}
        .content-errorlog .select-area .select-area_item:nth-child(5){margin-left:0;}
    }

</style>
