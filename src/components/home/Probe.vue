<template>
    <div class="probe">
        <div class="content">
            <div class="content-inner">
            <div class="content-inner_code">
                    <div class="select-item_1">
                        <div class="select-input">
                            <span>应用名称：</span>
                            <el-input v-model.trim="serviceName" placeholder="请输入应用英文名称"></el-input>
                            <p class="select-input_error" v-show="isServiceNameError">请输入英文名称</p>
                        </div>
                    </div>
                    <div class="select-item_2">
                        <div class="select-radio">
                            <el-tooltip effect="light" :visible-arrow=false content="单页面应用:刷新" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                            <span class="select-radio-span_first">单页面应用：</span>
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
                                <el-input v-model.trim="vueObject" placeholder="请输入vue对象"></el-input>
                            </div>
                        </div>
                    </div>
                    <h1>探针代码：</h1>
                    <div class="dynamic-code">
                        <pre><i class="el-icon-document-copy" @click="copyProbeCode"></i><code
                                v-text="probeCode"></code></pre>
                    </div>
                    <div class="attention" v-show="isSPA==='false'">
                        <i class="el-icon-warning"></i>
                        <span>注意：pagePath为页面名称，可自定义设置，类型为字符串</span>
                    </div>
            </div>
            <div class="content-example_code">
                    <h1>探针部署示例展示：</h1>
                    <el-tabs v-model="activeType" type="card">
                        <el-tab-pane label="多页面应用" name="mpa">
                            <div class="example-type-content">
                                <p>复制下方的代码，将其粘贴在监控页面的第一行</p>
                                <div class="mpa-code">
                                    <pre><code v-text="mpaProbeCode"></code></pre>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="单页面应用" name="spa">
                            <div class="example-type-content">
                                <p>在编译后index.html 文件的第一行加入以下代码：</p>
                                <div class="spa-code_1">
                                    <pre><code v-text="codeFrag1"></code></pre>
                                </div>
                                <p>在编译后项目入口js文件中的vue对象，添加如下代码：</p>
                                <div class="spa-code_2">
                                    <pre><code v-text="spaProbeCodeSecond"></code></pre>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 探针部署代码片段1
    const codeFrag1 = '<script type="text/javascript" src="http://localhost:13800/index.js"></' + 'script>\n';
    // 探针部署代码片段2
    const codeFrag2 = '<script>\n' +
        'ClientMonitor.register({\n' +
        '        collector: \'http://localhost:13800\',\n' +
        '        useFmp: true,\n' +
        '        serviceVersion: \'default\',\n' +
        '        service: ';
    // 探针部署代码片段3
    const codeFrag3 = '\n});\n</' + 'script>';
    // 单页面应用探针部署代码片段
    const spaCodeFrag = 'watch: {\n' +
        '  \'$route.path\': function (newVal) {\n' +
        '    ClientMonitor.register({\n' +
        '        collector: \'http:/localhost:13800\',\n' +
        '        service: \'serviceName\',\n' +
        '        serviceVersion: \'default\',\n' +
        '        pagePath:newVal,\n' +
        '        useFmp: true,\n' +
        '        enableSPA:true,\n' +
        '        vue: Vue\n' +
        '    });\n' +
        '  }\n' +
        '}';
    // 多页面应用探针部署代码片段
    const mpaCodeFrag = '<script>\n' +
        'ClientMonitor.register({\n' +
        '        collector: \'http://localhost:13800\',\n' +
        '        service: \'serviceName\',\n' +
        '        serviceVersion: \'default\',\n' +
        '        pagePath: location.href,\n' +
        '        useFmp: true\n' +
        '    });\n</' +
        'script>';
    export default {
        name: "Probe",
        data() {
            return {
                // 应用名称
                serviceName: '',
                // 应用名称是否输入错误
                isServiceNameError: false,
                // 是否为单应用
                isSPA: 'false',
                // 是否为vue项目
                isVue: 'false',
                // vue对象
                vueObject: null,
                // 探针部署代码片段1
                codeFrag1: codeFrag1,
                // 动态代码部分
                dynamicProbeCode: '',
                // 代码_应用名称
                probeCodeServiceName: '\'\',\n',
                probeCodeSPA: '',
                probeCodeVue: '',
                probeCodePagePath: '        pagePath: location.href,\n',
                // 示例类型
                activeType: 'mpa',
                // 多页面应用示例代码
                mpaProbeCode: codeFrag1 + mpaCodeFrag,
                // 单页面应用示例第二段代码
                spaProbeCodeSecond: spaCodeFrag,
                // 是否进入代码区域
                isEnterCodeArea: false,
            }
        },
        methods: {
            // 复制代码
            copyProbeCode() {
                let inputEle = document.createElement('input');
                document.body.appendChild(inputEle);
                inputEle.setAttribute('value', this.probeCode);
                inputEle.select();
                if (document.execCommand('copy')) {
                    this.$message({
                        type: 'success',
                        message: '复制成功！'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '复制失败，请手动复制！'
                    });
                }
                document.body.removeChild(inputEle);
            },
        },
        computed: {
            // 动态生成部署探针代码
            probeCode: function () {
                return codeFrag1 + codeFrag2 + this.dynamicProbeCode +
                    this.probeCodeServiceName + this.probeCodePagePath + this.probeCodeSPA + this.probeCodeVue +
                    codeFrag3;
            }
        },
        watch: {
            isSPA: function (val) {
                if ('true' === val) {
                    this.probeCodeSPA = '        enableSPA: true,\n';
                    this.probeCodePagePath = '        pagePath: newVal,\n';
                } else {
                    this.probeCodeSPA = '';
                    this.probeCodePagePath = '        pagePath: location.href,\n';
                }
            },
            serviceName: function (val) {
                // 校验是否为英文/数字
                let reg = new RegExp("^[0-9a-zA-Z]+$");
                if (!reg.test(val)) {
                    this.isServiceNameError = true;
                } else {
                    this.isServiceNameError = false;
                }
                // 修改代码中应用名称
                this.probeCodeServiceName = '\'' + val + '\',\n';
            },
            vueObject: function (val) {
                this.probeCodeVue = '        vue:\' ' + val + '\',\n';
            },
            isVue: function (val) {
                if ('false' === val) {
                    this.probeCodeVue = '';
                }
            }

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
            height: calc(100% - 108px);
            margin: 22px;
            padding:32px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            border-radius: 5px;
            .content-inner{
                height: 100%;
                overflow: auto;
            }

            .content-inner_code {
                padding-bottom: 22px;
                border-bottom: dashed 1px #d0d0dd;
            }

            .content-example_code {
                padding-top: 22px;
            }
        }

        h1 {
            font-size: 16px;
            font-weight: bold;
        }

        code {
            padding: 20px;
            display: block;
            color: #909db9;
        }

        i {
            margin-right: 8px;
        }
    }

    .select-item_1 {
        width: 100%;
    }

    .select-input {
        display: inline-block;

        span {
            margin-top: 10px;
        }

        .el-input {
            width: 428px;
            margin-left: 16px;

            ::v-deep .el-input__inner {
                height: 32px;
            }
        }

        .select-input_error {
            color: #f8897c;
            margin: 6px 0 6px 88px;
        }

    }

    .select-item_2 {
        margin: 28px 0;

        span {
            margin-left: 110px;
        }

        .select-radio {
            display: inline-block;

            .el-icon-question {
                cursor: pointer;
            }

            .el-icon-question:hover {
                cursor: pointer;
                color: #00baff;
            }
        }

        .select-radio-span_first {
            margin-left: 0;
        }
    }

    ::v-deep .el-radio__input {
        margin-left: 14px;
    }

    .dynamic-code {
        width: 100%;
        /*height: 150px;*/
        margin: 20px 0;
        background-color: #f3f9ff;
        pre{
            padding:4px;
        }

        i {
            position: relative;
            left: 20px;
            top: 10px;
            color: #00baff;
            cursor: pointer;

        }
    }

    .attention {
        span {
            color: #f8897c;
        }
    }

    .el-tabs {
        margin-top: 22px;

    }

    ::v-deep .el-tabs__content {
        border-radius: 3px;
        border-right: 1px solid #E4E7ED;
        border-bottom: 1px solid #E4E7ED;
        border-left: 1px solid #E4E7ED;
    }

    ::v-deep .el-tabs__header {
        margin: 0;
    }

    .example-type-content {
        margin: 20px;
    }

    .mpa-code {
        width: 100%;
        /*height: 100px;*/
        margin: 20px 0;
        background-color: #f3f9ff;
    }

    .spa-code_1,.spa-code_2 {
        width: 100%;
        margin:20px 0;
        /*height: 50px;*/
        background-color: #f3f9ff;
    }

    .el-icon-question {
        color: #a7b4ce;
    }

    .el-icon-warning {
        color: #f8897c;
    }

</style>
