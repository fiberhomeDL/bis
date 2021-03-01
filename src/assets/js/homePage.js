import axios from 'axios';
import de from "element-ui/src/locale/lang/de";

let moment = require('moment');
let endTime = moment().format('YYYY-MM-DD HH');
let startTime = moment(new Date().getTime() - 3600 * 24 * 1000).format('YYYY-MM-DD HH');
let twoMonthAgo = moment(new Date().getTime() - 3600 * 24 * 1000 * 60).format('YYYY-MM-DD HH');

//echarts x时间轴
let xData = [];
for(let index = 24; index >= 0; index--){
    xData.push(`${new Date(new Date().getTime() - 3600 *  index * 1000).getHours()}时`)
}

let httpReq = {
    //存放应用信息
    appInfo: [],
    //初始化
    init(){
        this.appInfo = [];
        let that = this;
        //获取所有应用 -- 近2月（数据只存近两个月）
        return new Promise(function(resolve, reject){
            that.getAllService().then(data=>{
                that.appInfo.push(...data.services);
                that.appInfo.forEach(item => {
                    item.infoData = {};
                    item.chartsData = {};
                    //获取应用信息
                    that.getAppInfo(item.name).then(data => {
                        //错误数量
                        item.infoData.errorCount = eval(data.errorCount.values.values.map(item => item.value).join("+"));
                        //pv总量
                        item.infoData.viewCount = eval(data.pvData.values.values.map(item => item.value).join("+"));
                        //echarts pv
                        item.chartsData.pvData = data.pvData.values.values.map(item => item.value);
                        //echarts x轴数据
                        item.chartsData.xData = xData;

                        /*假数据*/
                        item.satisfaction = '1';
                        item.chartsData.uvData = [...item.chartsData.pvData].reverse();


                        // debugger;

                        // item.infoData.
                    }).finally(()=>{
                        resolve(that.appInfo);
                    })
                });
            })
        })

    },
    //获取应用列表
    getAllService(){
        return axios.post('/graphql',{
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
        })
    },
    //获取应用列表
    getAppInfo(serviceName){
        console.log(endTime);
        return axios.post('/graphql',{
            query: `
                query ($d: Duration!,$mcPv: MetricsCondition!,$mcError: MetricsCondition!){
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
                
                }
            `,
            variables: {
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
                }
            }

        })
    }
}
export default httpReq;
