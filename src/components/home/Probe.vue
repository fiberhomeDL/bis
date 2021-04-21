<template>
    <div class="probe">
        <div class="content">
            <div class="content-inner">
                <div class="content-inner_code">
                    <div class="select-item_1">
                        <div class="select-input">
                            <span>ThemisRUM服务部署IP：</span>
                            <el-input v-model.trim="nginxIp" placeholder="请输入ThemisRUM服务部署IP" size="small"
                                      clearable></el-input>
                        </div>
                    </div>
                    <div class="select-item_1">
                        <div class="select-input">
                            <span style="margin-left: 94px;">应用名称：</span>
                            <el-input v-model.trim="serviceName" placeholder="请输入应用英文名称" size="small"
                                      clearable></el-input>
                            <span class="select-vue-input_error" v-show="isServiceNameError">请输入英文名称</span>
                        </div>
                    </div>
                    <div class="select-item_1">
                        <span style="margin-left: 96px;">ACE项目：</span>
                        <div class="radio-group">
                            <el-radio v-model="isAce" label="true">是</el-radio>
                            <el-radio v-model="isAce" label="false">否</el-radio>
                        </div>
                    </div>
                    <h1>探针代码：</h1>
                    <p v-text="agentExplain" class="agent-explain-label"></p>
                    <div class="dynamic-code">
                        <pre><el-tooltip effect="light" :visible-arrow=false placement="top"><div
                                slot="content">复制</div><i class="el-icon-document-copy" @click="copyProbeCode"></i>
                        </el-tooltip><code v-text="probeCode"></code></pre>
                    </div>
                    <div class="attention">
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
                        <el-tab-pane name="spa">
                            <span slot="label">单页面应用
                                <el-tooltip effect="light" :visible-arrow=false
                                                                 content="由单个页面组成,在用户与应用程序交互时动态更新该页面的Web应用程序" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip></span>
                            <div class="example-type-content">
                                <p>待后续支持......</p>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 多页面应用探针部署代码片段
    const mpaCodeFrag = '<script>\n' +
        '    ClientMonitor.register({\n' +
        '        collector: \'http://127.0.0.1:13800\',\n' +
        '        service: \'test\',\n' +
        '        serviceVersion: \'default\',\n' +
        '        pagePath: location.pathname,\n' +
        '        useFmp: true\n' +
        '    });\n</' +
        'script>';
    // 探针部署代码片段1
    const codeFirst = '<script type="text/javascript" src="http://127.0.0.1:13800/index.js"></' + 'script>\n';
    // 多页面应用示例解释
    const agentExplain = '在每个监控页面的<head></head>第一行,添加如下代码：';
    // 多页面应用示例解释
    const mpaExplain = '在项目test的每个html或jsp的<head></head>第一行,添加探针代码（服务部署在127.0.0.1），如下所示：';

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
                // 是否为ace项目
                isAce:'false',
                // 代码_应用名称
                probeCodeServiceName: '\'\',\n',
                // 代码_页面路径
                probeCodePagePath: '        pagePath: location.pathname,\n',
                // 示例类型
                activeType: 'mpa',
                // 探针部署解释
                agentExplain:agentExplain,
                // 多页面应用示例解释
                mpaExplain: mpaExplain,
                // 多页面应用示例代码
                mpaProbeCode: codeFirst + mpaCodeFrag
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
                    '        service: ' + this.probeCodeServiceName+
                    '        serviceVersion: \'default\',\n' +
                    this.probeCodePagePath +
                    '        useFmp: true\n' +
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
            // ace项目的pathname只读取/最后内容
            isAce:function (val) {
                if ('false' === val) {
                    this.probeCodePagePath =  '        pagePath: location.pathname,\n';
                } else {
                    this.probeCodePagePath =  '        pagePath: location.pathname.substring(location.pathname.lastIndexOf("/")+1),\n';
                }
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
        span{
            @extend .sub-normal-text;
        }
        .radio-group{
            display: inline-block;
        }
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

    .el-icon-question {
        color: #a7b4ce;
    }

    .el-icon-warning {
        color: #f8897c;
    }
    .agent-explain-label{
        margin-top:20px;
    }

    .el-icon-question {
        cursor: pointer;
    }

    .el-icon-question:hover {
        color: #00baff;
    }

</style>
