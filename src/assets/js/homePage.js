import axios from 'axios';
import de from "element-ui/src/locale/lang/de";

let moment = require('moment');
//当前时间
let endTime = moment().format('YYYY-MM-DD HH');
//24H前
let startTime = moment(new Date().getTime() - 3600 * 24 * 1000).format('YYYY-MM-DD HH');
//2个月前
let twoMonthAgo = moment(new Date().getTime() - 3600 * 24 * 1000 * 60).format('YYYY-MM-DD HH');

//echarts x时间轴
let xData = [];
for (let index = 24; index >= 0; index--) {
    xData.push(`${new Date(new Date().getTime() - 3600 * index * 1000).getHours()}时`);
}

let httpReq = {
    //存放应用信息
    appInfo: [],
    //初始化
    init() {
        this.appInfo = [];
        let that = this;
        //获取所有应用 -- 近2月（数据只存近两个月）
        return new Promise(function (resolve) {
            that.getAllService().then(serviceData => {
                if (serviceData) {
                    that.appInfo.push(...serviceData.services);
                }
                Promise.all(that.appInfo.map(function (item) {
                    return new Promise((resolve) => {
                        item.infoData = {};
                        item.chartsData = {};
                        that.getAppInfo(item.name, item.id).then(data => {
                            //错误数量
                            item.infoData.errorCount = eval(data.errorCount.values.values.map(item => item.value).join("+"));
                            //pv总量
                            item.infoData.viewCount = eval(data.pvData.values.values.map(item => item.value).join("+"));
                            //uv总量
                            item.infoData.uvCount = eval(data.uvData.values.values.map(item => item.value).join("+"));

                            item.infoData.performanceCount = data.lp < 0 ? 0 : (data.lp / 10000).toFixed(2);

                            //echarts pv
                            item.chartsData.pvData = data.pvData.values.values.map(item => item.value);
                            //echarts uv
                            item.chartsData.uvData = data.uvData.values.values.map(item => item.value);

                            //echarts x轴数据
                            item.chartsData.xData = xData;

                            //满意度
                            if (item.infoData.performanceCount < 0.3) {
                                item.satisfaction = '3';
                            } else if (item.infoData.performanceCount >= 0.3 && item.infoData.performanceCount < 0.75) {
                                item.satisfaction = '2';
                            } else {
                                item.satisfaction = '1';
                            }
                            resolve();
                        });
                    });
                })).then(() => {
                    resolve(that.appInfo);
                });
            });
        });
    },
    //获取应用列表
    getAllService() {
        return axios.post('/graphql', {
            query: `query queryBrowserServices($duration: Duration!) {
                services: getAllBrowserServices(duration: $duration) {
                    id 
                    name
                }
            }`,
            variables: {
                duration: {
                    end: endTime,
                    start: twoMonthAgo,
                    step: "DAY"
                }
            }
        });
    },
    //获取应用列表
    getAppInfo(serviceName, serviceId) {
        return axios.post('/graphql', {
            query: `
                query (
                        $d: Duration!,
                        $mcPv: MetricsCondition!,
                        $mcError: MetricsCondition!,
                        $serviceId: String!,
                        $mcRate: MetricsCondition!
                        $valueColumnName: String!
                        $lpName: String!
                    ){
                    pvData: readMetricsValues(duration: $d, condition: $mcPv){
                        values{
                            values {
                                value
                            }
                        }
                    }
                    errorCount: readMetricsValues(duration: $d, condition: $mcError){
                        values{
                            values {
                                value
                            }
                        }
                    }
                    uvData: readUVMetricsValues(serviceId: $serviceId, duration: $d){
                        values {
                            values {
                                value
                            }
                        }
                    },
                    
                    errorRate: readMetricsValue(condition: $mcRate, duration: $d)
                    
                    lp: readBrowserPageMetricsToApp(
                        name: $lpName, 
                        serviceId: $serviceId, 
                        valueColumnName: $valueColumnName, 
                        duration: $d)
            
                }
            `,
            variables: {
                "lpName": "browser_app_page_load_page_avg",
                "d": {
                    "start": startTime,
                    "end": endTime,
                    "step": "HOUR"
                },
                "mcPv": {
                    "name": "browser_app_pv",
                    "entity": {
                        "scope": "Service",
                        "serviceName": serviceName,
                        "normal": true
                    }
                },
                "mcError": {
                    "name": "browser_app_error_sum",
                    "entity": {
                        "scope": "Service",
                        "serviceName": serviceName,
                        "normal": true
                    }
                },
                "serviceId": serviceId,
                "serviceName": serviceName,
                "mcRate": {
                    "name": "browser_app_error_rate",
                    "entity": {
                        "scope": "Service",
                        "serviceName": serviceName,
                        "normal": true
                    }
                },
                "valueColumnName": "value",
            }
        });
    }
};
export default httpReq;
