import axios from 'axios';
import util from '@js/common';

let httpReq = {
    appInfo: {},
    getAllData(serviceName,serviceId,time){
        let that = this;
        let duration = util.formatStartAndEndTime(time);
        return new Promise(function (resolve){
            axios.post('/graphql',{
                query: `
                query(
                    $duration: Duration!,
                    $cd1: MetricsCondition!, 
                    $cd2:BrowserAggregateAnalyzerQueryCondition!
                ) {
                    errorValues: readMetricsValues(condition: $cd1, duration: $duration){
                        values{
                            values {
                                value
                            }
                        }
                    }
                    
                    total :queryAggregateAnalyzerLog(condition: $cd2) {
                        logs {
                            errorCategoryValue
                            errorType
                            errorTotalNum
                            appearPageNum
                            affectUserNum
                        }
                    }
                }
            `,
                variables: {
                    duration,
                    "cd1": {
                        "name":"browser_app_error_sum",
                        "entity":{
                            "scope":"Service",
                            "serviceName": serviceName,
                            "normal":true
                        }
                    },
                    "cd2": {
                        "serviceId": serviceId,
                        duration
                    }
                }

            }).then(data => {
                that.appInfo.errorValues = data.errorValues.values.values.map(item=>{return item.value});
                // that.appInfo.errorCount = 0;

                that.appInfo.errorTotalNum = 0;
                that.appInfo.appearPageNum = 0;
                that.appInfo.affectUserNum = 0;

                //获取概览各种数据
                data.total.logs.forEach(item => {
                    that.appInfo.errorTotalNum += item.errorTotalNum;
                    that.appInfo.appearPageNum += item.appearPageNum;
                    that.appInfo.affectUserNum += item.affectUserNum;
                });

                that.appInfo.errorList = data.total.logs.map(item => {
                    //AJAX(0), RESOURCE(1), VUE(2), PROMISE(3), JS(4), UNKNOWN(5);
                    let errorFlag = "1";
                    if(item.errorCategoryValue === 1){
                        errorFlag = "2";
                    }
                    return {
                        errorFlag: errorFlag, // 1 => js错误 2 => 静态资源加载错误
                        errorTotalNum: item.errorTotalNum, //错误数量
                        appearPageNum: item.appearPageNum, // 影响页面
                        affectUserNum: item.affectUserNum, // 影响用户
                        errorType: item.errorType
                    }
                });
                resolve(that.appInfo);
            });
        });
    }
};

export default httpReq;
