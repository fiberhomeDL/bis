<template>
    <div class="probe">
        <div class="content">
            <div class="content-inner">
            <div class="content-inner_code">
                    <div class="select-item_1">
                        <div class="select-input">
                            <span>应用名称：</span>
                            <el-input v-model="serviceName" placeholder="请输入应用英文名称"></el-input>
                        </div>
                    </div>
                    <div class="select-item_2">
                        <div class="select-radio">
                            <i class="el-icon-question"></i>
                            <el-tooltip effect="light" :visible-arrow=false content="单页面应用:刷新" placement="top">
                                <span class="select-radio-span_first">单页面应用：</span>
                            </el-tooltip>
                            <el-radio v-model="isSPA" label="true">是</el-radio>
                            <el-radio v-model="isSPA" label="false">否</el-radio>
                        </div>
                        <div class="select-radio">
                            <span>vue项目：</span>
                            <el-radio v-model="isVue" label="true">是</el-radio>
                            <el-radio v-model="isVue" label="false">否</el-radio>
                        </div>
                        <div class="select-input">
                            <div v-show="isVue==='true'" class="select-item">
                                <span>Vue对象：</span>
                                <el-input v-model="vueObject" placeholder="请输入vue对象"></el-input>
                            </div>
                        </div>
                    </div>
                    <h1>探针代码：</h1>
                    <div class="dynamic-code"><code>{{probeCode}}</code></div>
                    <div class="attention" v-show="isSPA==='false'">
                        <i class="el-icon-warning"></i>
                        <span >注意：pagePath为页面名称，可自定义设置，类型为字符串</span>
                    </div>
            </div>
            <div class="content-example_code">
                    <h1>探针部署示例展示：</h1>
                    <el-tabs v-model="activeType" type="card" >
                        <el-tab-pane label="多页面应用" name="mpa">
                            <div class="example-type-content">
                                <p>复制下方的代码，将其粘贴在监控页面的第一行</p>
                                <div class="mpa-code"><code>{{mpaProbeCode}}</code></div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="单页面应用" name="spa">
                            <div class="example-type-content">
                                <p>在编译后index.html 文件的第一行加入以下代码：</p>
                                <div class="spa-code_1"><code>{{spaProbeCodeFirst}}</code></div>
                                <p>在编译后主js中找到vue对象，添加如下代码：</p>
                                <div class="spa-code_2" ><code>{{spaProbeCodeSecond}}</code></div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Probe",
        data() {
            return {
                // 应用名称
                serviceName: '',
                // 是否为单应用
                isSPA: 'false',
                // 是否为vue项目
                isVue: 'false',
                // vue对象
                vueObject: null,
                // 探针部署代码
                probeCode: '<script type="text/javascript" src="http://localhost:13800/index.js">',
                // 示例类型
                activeType:'mpa',
                // 多页面应用示例代码
                mpaProbeCode:'<script type="text/javascript" src="http://localhost:13800/index.js">',
                // 单页面应用示例第一段代码
                codeFrag1:'<script type="text/javascript" src="http://localhost:13800/index.js"></'+'script>',
                // 单页面应用示例第二段代码
                spaProbeCodeSecond:'<script type="text/javascript" src="http://localhost:13800/index.js">',
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import '@css/style.scss';

    ::-webkit-scrollbar {
        width: 8px;
        height: 1px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #d9dcea;
    }
    ::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #f3f6f8;
    }

    .probe {
        height: 100%;
        width: 100%;
        overflow: hidden;

        .content {
<<<<<<< HEAD
            height: calc(100% - 108px);
=======
            height: calc(100% - 46px);
>>>>>>> parent of 34b7094... Update Probe.vue
            margin: 22px;
            padding:32px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            border-radius: 5px;
            .content-inner{
                height: 100%;
                overflow: auto;
            }

<<<<<<< HEAD
            .content-inner_code {
                padding-bottom: 22px;
                border-bottom: dashed 1px #d0d0dd;
            }

            .content-example_code {
                padding-top: 22px;
=======
            .content-code {
                height: 60%;
                border-bottom: dashed 1px #d0d0dd;
            }

            .content-example {
                height: 40%;
>>>>>>> parent of 34b7094... Update Probe.vue
            }
        }
        h1{
            font-size: 16px;
            font-weight: bold;
        }
        code{
            padding:20px;
            display: block;
            color: #909db9;
        }
        i{
            margin-right:8px;
        }
    }

<<<<<<< HEAD
    .select-item_1 {
=======
    .content-code-main, .content-example-main {
        height: 100%;
        padding: 32px;
    }
    .select-item_1{
>>>>>>> parent of 34b7094... Update Probe.vue
        width: 100%;
    }

    .select-input{
        display: inline-block;
        span {
            margin-top: 10px;
        }

        .el-input {
            width: 428px;
            margin-left:16px;
            ::v-deep .el-input__inner {
                height: 32px;
            }
        }

    }

    .select-item_2 {
        margin:32px 0;
        span {
            margin-left: 110px;
        }
        .select-radio{
            display: inline-block;
        }
        .select-radio-span_first{
            margin-left: 0;
        }
    }

    ::v-deep .el-radio__input {
        margin-left: 14px;
    }
    .dynamic-code{
        width:100%;
        height: 150px;
        margin: 20px 0;
        background-color: #f3f9ff;
    }
    .attention{
        margin-bottom: 16px;
        span{
            color: #f8897c;
        }
    }
<<<<<<< HEAD

    .el-tabs {
        margin-top: 22px;
=======
    .content-example-main .el-tabs{
        margin-top:12px;
>>>>>>> parent of 34b7094... Update Probe.vue

    }
    ::v-deep .el-tabs__content {
        border-radius: 3px;
        border-right:1px solid #E4E7ED;
        border-bottom:1px solid #E4E7ED;
        border-left:1px solid #E4E7ED;
    }
    ::v-deep .el-tabs__header {
        margin: 0;
    }
    .example-type-content{
        margin:20px;
    }
    .mpa-code{
        width:100%;
        height: 100px;
        margin: 20px 0;
        background-color: #f3f9ff;
    }
    .spa-code_1{
        width:100%;
        height: 50px;
        background-color: #f3f9ff;
    }
    .spa-code_2{
        width:100%;
        height: 200px;
        background-color: #f3f9ff;
    }

    .el-icon-question{
        color: #a7b4ce;
    }

    .el-icon-warning{
        color: #f8897c;
    }



</style>
