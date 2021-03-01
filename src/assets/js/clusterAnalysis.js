import axios from 'axios';
import util from '@js/common'

let httpReq = {
    appInfo: {

    },
    getAllData(serviceName,time){
        let that = this;
        let duration = util.formatStartAndEndTime(time);
        return new Promise(function (resolve, reject){
            axios.post('/graphql',{
                query: `
                query($condition: MetricsCondition!, $duration: Duration!) {
                    errorValues: readMetricsValues(condition: $condition, duration: $duration){
                        values{
                            values {
                                value
                            }
                        }
                    }
                
                    errorCount: readMetricsValue(condition: $condition, duration: $duration)
                }
            `,
                variables: {
                    duration,
                    "condition":{
                        "name":"browser_app_error_sum",
                        "entity":{
                            "scope":"Service",
                            "serviceName": serviceName,
                            "normal":true
                        }
                    }
                }

            }).then(data => {
                that.appInfo.errorValues = data.errorValues.values.values.map(item=>{return item.value});
                that.appInfo.errorCount = data.errorCount;
                resolve(that.appInfo);
            })
        })
    }
}



export default httpReq;
