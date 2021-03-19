<template>
    <div class="probe">
        <div class="content">
            <div class="content-inner">
                <div class="content-inner_code">
                    <div class="select-item_1">
                        <div class="select-input">
                            <span>Nginx部署IP：</span>
                            <el-input v-model.trim="nginxIp" placeholder="请输入Nginx部署IP" size="small"
                                      clearable></el-input>
                        </div>
                    </div>
                    <div class="select-item_1">
                        <div class="select-input">
                            <span>应用名称：</span>
                            <el-input v-model.trim="serviceName" placeholder="请输入应用英文名称" size="small"
                                      style="margin-left: 40px;" clearable></el-input>
                            <span class="select-vue-input_error" v-show="isServiceNameError">请输入英文名称</span>
                        </div>
                    </div>
                    <div class="select-item_2">
                        <div class="select-radio">
                            <el-tooltip effect="light" :visible-arrow=false
                                        content="加载单个页面并在用户与应用程序交互时动态更新该页面的Web应用程序" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                            <span class="select-radio-span_first">单页面应用：</span>
                            <el-radio v-model="isSPA" label="true">是</el-radio>
                            <el-radio v-model="isSPA" label="false">否</el-radio>
                        </div>
                        <div class="select-radio">
                            <span>Vue项目：</span>
                            <el-radio v-model="isVue" label="true">是</el-radio>
                            <el-radio v-model="isVue" label="false">否</el-radio>
                        </div>
                        <div class="select-input">
                            <div v-show="isVue==='true'" class="select-item">
                                <span>Vue对象：</span>
                                <el-input v-model.trim="vueObject" placeholder="请输入vue对象" size="small"
                                          clearable></el-input>
                                <span class="select-vue-input_error" v-show="isVueObjectError">请输入英文名称</span>
                            </div>
                        </div>
                    </div>
                    <h1>探针代码：</h1>
                    <div class="dynamic-code">
                        <pre><el-tooltip effect="light" :visible-arrow=false placement="top"><div
                                slot="content">复制</div><i class="el-icon-document-copy" @click="copyProbeCode"></i>
                        </el-tooltip><code v-text="probeCode"></code></pre>
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
                                <p v-text="mpaExplain"></p>
                                <div class="mpa-code">
                                    <pre><code v-text="mpaProbeCode"></code></pre>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="单页面应用" name="spa">
                            <div class="example-type-content">
                                <p v-text="spaExplain"></p>
                                <div class="spa-code_1">
                                    <pre><code v-text="spaCodeFrag1"></code></pre>
                                </div>
                                <p>在程序入口js文件中的vue实例下，添加以下代码：</p>
                                <div class="spa-code_2">
                                    <pre><code v-text="spaCodeFrag2"></code></pre>
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
    // 探针部署代码片段2
    const codeFrag2 = ':13800\',\n' +
        '        useFmp: true,\n' +
        '        serviceVersion: \'default\',\n' +
        '        service: ';
    // 多页面应用探针部署代码片段
    const mpaCodeFrag = '<script>\n' +
        '    ClientMonitor.register({\n' +
        '        collector: \'http://127.0.0.1:13800\',\n' +
        '        service: \'serviceName\',\n' +
        '        serviceVersion: \'default\',\n' +
        '        pagePath: location.pathname,\n' +
        '        useFmp: true\n' +
        '    });\n</' +
        'script>';
    // 单页面应用探针部署代码片段1
    const spaCodeFrag1 = '<script type="text/javascript" src="http://127.0.0.1:13800/index.js"></' + 'script>\n';
    // 单页面应用探针部署代码片段
    const spaCodeFrag2 = 'watch: {\n' +
        '  \'$route.path\': function (newVal) {\n' +
        '      ClientMonitor.register({\n' +
        '        collector: \'http://127.0.0.1:13800\',\n' +
        '        service: \'serviceName\',\n' +
        '        serviceVersion: \'default\',\n' +
        '        pagePath:newVal,\n' +
        '        useFmp: true,\n' +
        '        enableSPA:true,\n' +
        '        vue: Vue\n' +
        '      });\n' +
        '  }\n' +
        '}';
    // 多页面应用示例解释
    const mpaExplain = '在每个监控页面的<head></head>第一行,添加以下代码：';
    //  单页面应用示例解释
    const spaExplain = '在项目入口html文件的<head></head>第一行,添加以下代码：';

    export default {
        name: "Probe",
        data() {
            return {
                // nginx IP
                nginxIp: '',
                // 应用名称
                serviceName: '',
                // 应用名称是否输入错误
                isServiceNameError: false,
                // 是否为单应用
                isSPA: 'false',
                // 是否为vue项目
                isVue: 'false',
                // vue对象
                vueObject: '',
                // vue对象是否输入错误
                isVueObjectError: false,
                // 代码_应用名称
                probeCodeServiceName: '\'\',\n',
                // 代码_spa部分
                probeCodeSPA: '',
                // 代码_vue部分
                probeCodeVue: '',
                // 代码_页面路径
                probeCodePagePath: '        pagePath: location.pathname,\n',
                // 示例类型
                activeType: 'mpa',
                // 多页面应用示例解释
                mpaExplain: mpaExplain,
                // 单页面应用示例解释
                spaExplain: spaExplain,
                // 多页面应用示例代码
                mpaProbeCode: spaCodeFrag1 + mpaCodeFrag,
                // 单页面应用示例第一段代码
                spaCodeFrag1: spaCodeFrag1,
                // 单页面应用示例第二段代码
                spaCodeFrag2: spaCodeFrag2
            };
        },
        methods: {
            // 复制探针部署代码
            copyProbeCode() {
                // 创建input对象
                let inputEle = document.createElement('input');
                // 将input对象加入body中
                document.body.appendChild(inputEle);
                // 将探针代码设置到input对象value中
                inputEle.setAttribute('value', this.probeCode);
                inputEle.select();
                // 执行复制操作
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
                // 移除对象
                document.body.removeChild(inputEle);
            },
        },
        computed: {
            // 动态生成部署探针代码
            probeCode: function () {
                return '<script type="text/javascript" src="http://' + this.nginxIp + ':13800/index.js"></' + 'script>\n' +
                    '<script>\n ClientMonitor.register({\n        collector: \'http://' + this.nginxIp + ':13800\',\n' +
                    '        useFmp: true,\n' +
                    '        serviceVersion: \'default\',\n' +
                    '        service: ' +
                    this.probeCodeServiceName + this.probeCodePagePath + this.probeCodeSPA + this.probeCodeVue +
                    '    });\n</' + 'script>';
            }
        },
        watch: {
            // 1.检验应用名称
            // 2.修改代码中应用名称
            serviceName: function (val) {
                // 校验是否为英文/数字
                let reg = new RegExp("^[0-9a-zA-Z]+$");
                this.isServiceNameError = !reg.test(val) ? true : false;
                // 修改代码中应用名称
                this.probeCodeServiceName = '\'' + val + '\',\n';
            },
            // 根据spa选项更改代码
            isSPA: function (val) {
                if ('true' === val) {
                    this.probeCodeSPA = '        enableSPA: true,\n';
                    this.probeCodePagePath = '        pagePath: newVal,\n';
                } else {
                    this.probeCodeSPA = '';
                    this.probeCodePagePath = '        pagePath: location.pathname,\n';
                }
            },
            // 修改代码vue部分
            isVue: function (val) {
                if ('false' === val) {
                    // 清空部署代码中的vue代码
                    this.probeCodeVue = '';
                } else {
                    this.vueObject = '';
                }
            },
            // 修改代码vue对象名称
            vueObject: function (val) {
                // 校验是否为英文/数字
                let reg = new RegExp("^[0-9a-zA-Z]+$");
                this.isVueObjectError = !reg.test(val) ? true : false;
                // 探针部署代码更换
                this.probeCodeVue = '        vue: ' + val + '\n';
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '@css/style.scss';

    .probe {
        height: 100%;
        width: 100%;
        overflow: hidden;

        .content {
            height: calc(100% - 44px);
            margin: 22px;
            padding: 32px;
            background-color: #fff;
            box-shadow: 0 4px 8px 0 #b7c4e0;
            border-radius: 5px;

            .content-inner {
                height: 100%;
                overflow: auto;
                padding-right: 20px;
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
            line-height: 1.4em;
        }

        i {
            margin-right: 8px;
        }
    }

    .select-item_1 {
        width: 100%;
        margin-bottom: 28px;
    }

    .select-input {
        display: inline-block;

        span {
            margin-top: 10px;
            @extend .sub-normal-text;
        }

        .el-input {
            width: 428px;
            margin-left: 16px;
        }

        .select-input_error {
            color: #f8897c;
            margin: 6px 0 6px 88px;
        }

        .select-vue-input_error {
            color: #f8897c;
            margin-left: 20px;
        }
    }

    .select-item_2 {
        margin-bottom: 28px;

        span {
            margin-left: 110px;
            @extend .sub-normal-text;
        }

        .select-radio {
            display: inline-block;

            .el-icon-question {
                cursor: pointer;
            }

            .el-icon-question:hover {
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
        margin: 20px 0;
        background-color: #f3f9ff;

        pre {
            padding: 4px;
        }

        i {
            position: relative;
            left: 20px;
            top: 10px;
            color: #00baff;
            cursor: pointer;
        }
    }

    .attention span {
        color: #f8897c;
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
        margin: 20px 0;
        background-color: #f3f9ff;
    }

    .spa-code_1, .spa-code_2 {
        width: 100%;
        margin: 20px 0;
        background-color: #f3f9ff;
    }

    .el-icon-question {
        color: #a7b4ce;
    }

    .el-icon-warning {
        color: #f8897c;
    }

</style>
