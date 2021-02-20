<template>
    <div class="content-errorlog">
<!--        选择区域-->
        <div class="select-area">
            <div class="select-area_item">
                <service-select></service-select>
            </div>
            <div class="select-area_item">
                <span>页面:</span>
                <el-autocomplete
                        class="page-name-input"
                        v-model="page"
                        :fetch-suggestions="querySearch"
                        clearable
                        size="small"
                        placeholder="请输入内容">
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
                <time-picker></time-picker>
            </div>
            <div class="select-area_item select-button">
                <el-button type="primary" size="small" @click="getErrorLogData">
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
                        :total="errorData.length">
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
                page:'All',
                // 全部页面数据
                pageData:[
                    { "value": "index.html"},
                    { "value": "home.html"},
                ],
                // 错误类型
                errorType:'All',
                // 错误类型选项
                errorTypeOptions:[
                    {value:'All',label:'全部'},
                    {value:'Js',label:'Js错误'},
                    {value:'Ajax',label:'Ajax'},
                    {value:'Resource',label:'静态资源加载异常'},
                    {value:'Promise',label:'Promise错误'},
                    {value:'Vue',label:'Vue错误'},
                    {value:'Unknow',label:'未知错误'},
                ],
                // 当前页数
                currentPage:1,
            }
        },
        mounted() {
            // 查询所有页面
            this.getAllPage();

        },
        methods:{
            // 查询应用下所有页面
            getAllPage(){
                // 应用ID
                const serviceId = this.$store.state.selectedServiceId;

                // 。。。

                // 查询错误日志数据
                this.getErrorLogData();
            },
            // 查询错误日志数据
            getErrorLogData(){
                // 应用ID
                const serviceId = this.$store.state.selectedServiceId;
                // 时间
                const time = this.$store.state.time;
                // 页面ID

                // 错误类别

                // 页面大小对象{pageNum: 1, pageSize: 35, needTotal: true}

            },
            // 页面名称联想搜索
            querySearch(queryString, cb) {
                let pageData = this.pageData;
                let results = queryString ? pageData.filter(this.createFilter(queryString)) : pageData;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            // 页面名称过滤器
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            // 设置表格header样式
            tableHeaderCellStyle(){
                return 'background-color: #def2ff';
            },
            // 下载
            download(){

            },
            // 处理分页
            handleCurrentChange(val){
                // 设置当前页号
                this.currentPage = val;
                // 查询错误日志数据
                this.getErrorLogData();
            },
        }
    }
</script>

<style lang="scss">
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
                .page-name-input{
                    padding-left:8px;
                }
            }
            .select-area_item:first-child{
                margin-left:0;
            }
            .select-area_item:last-child{
                margin-left:auto;
            }
            .select-button{
                span{
                    color:#fff;
                }
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
    @media screen and (max-width: 1440px){
        .content-errorlog .select-area {height: 100px;}
        .content-errorlog .select-area .select-area_item:nth-child(4){margin-left:0;}
    }

</style>
