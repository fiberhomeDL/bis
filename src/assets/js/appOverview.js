import axios from 'axios';
import util from '@js/common'
import de from "element-ui/src/locale/lang/de";

function getPieData(data){
    return data.map(item => {

        if(!item.version){
            item.version = "";
        }

        return {
            value:  item.value,
            name:  (item.category + item.version).split(".").slice(0,2).join(".")
        }
    })
}

//echarts x时间轴

let httpReq = {
    appInfo: {
        pv: undefined,
        uv: undefined,
        error: undefined,
        fpt: undefined,
        fmp: undefined,
        domReady: undefined,
        load: undefined
    },
    //初始化
    getPageData(serviceName,serviceId,time){
        let that = this;
        let duration = util.formatStartAndEndTime(time);
        return new Promise(function (resolve, reject){
            axios.post('/graphql',{
                query: `
                    query 
                    (
                        $d: Duration!,
                        $cd1: MetricsCondition!,
                        $cd2: MetricsCondition!,
                        $cd3: TopNCondition!,
                        $cd4: TopNCondition!,
                        $cd5: TopNCondition!,
                        $cd6: TopNCondition!,
                        $cd7: BrowserAppNumDistributionQueryCondition!
                        $cd8: BrowserAppNumDistributionQueryCondition!
                        $cd9: BrowserAppNumDistributionQueryCondition!
                        $serviceId: String!
                    ) {
                        pv: readMetricsValues(condition: $cd1, duration: $d) {
                            values {
                                values {
                                    value
                                }
                            }
                        }
                        error: readMetricsValues(condition: $cd2, duration: $d) {
                            values {
                                values {
                                    value
                                }
                            }
                        }
                        fpt: sortMetrics(condition: $cd3, duration: $d) {
                             name
                             id
                             value
                        }
                        fmp: sortMetrics(condition: $cd4, duration: $d) {
                             name
                             id
                             value
                        }
                        domReady: sortMetrics(condition: $cd5, duration: $d) {
                             name
                             id
                             value
                        }
                        load: sortMetrics(condition: $cd6, duration: $d) {
                             name
                             id
                             value
                        }
                        browserData: queryAppNumByCategory(condition: $cd7, duration: $d){
                            category
                            version
                            value
                        }
                        
                        osData: queryAppNumByCategory(condition: $cd8, duration: $d){
                            category
                            version
                            value
                        }
                        
                        screenData: queryAppNumByCategory(condition: $cd9, duration: $d){
                            category
                            value
                        }
                        
                        uv: readUVMetricsValues(serviceId: $serviceId, duration: $d){
                            values {
                                values {
                                    value
                                }
                            }
                        },
                        
                        
                    }
`,
                variables: {
                    "d": duration,
                    "cd1": {
                        "name": "browser_app_pv",
                        "entity": {
                            "scope": "Service",
                            "serviceName": serviceName,
                            "normal": true
                        }
                    },
                    "cd2": {
                        "name": "browser_app_error_sum",
                        "entity": {
                            "scope": "Service",
                            serviceName: serviceName,
                            "normal": true
                        }
                    },
                    "cd3": {
                        "name":"browser_app_page_fpt_avg",
                        "parentService":serviceName,
                        "normal":true,
                        "scope":"Endpoint",
                        "topN":4,
                        "order":"DES"
                    },
                    "cd4": {
                        "name":"browser_app_page_fmp_avg",
                        "parentService":serviceName,
                        "normal":true,
                        "scope":"Endpoint",
                        "topN":4,
                        "order":"DES"
                    },
                    "cd5": {
                        "name":"browser_app_page_dom_ready_avg",
                        "parentService":serviceName,
                        "normal":true,
                        "scope":"Endpoint",
                        "topN":4,
                        "order":"DES"
                    },
                    "cd6": {
                        "name":"browser_app_page_load_page_avg",
                        "parentService":serviceName,
                        "normal":true,
                        "scope":"Endpoint",
                        "topN":4,
                        "order":"DES"
                    },
                    "cd7": {
                        "name": "browser_type",
                        "serviceId": serviceId,
                        "serviceName": serviceName
                    },
                    "cd8": {
                        "name": "browser_system",
                        "serviceId": serviceId,
                        "serviceName": serviceName
                    },
                    "cd9": {
                        "name": "browser_resolution",
                        "serviceId": serviceId,
                        "serviceName": serviceName
                    },
                    "serviceId": serviceId
                }
            }).then(data => {
                //赋值pv
                that.appInfo.pv = data.pv.values.values.map(item=>{return item.value});
                that.appInfo.uv = data.uv.values.values.map(item=>{return item.value});
                //错误数
                that.appInfo.error = data.error.values.values.map(item=>{return item.value});
                that.appInfo.fpt = data.fpt;
                that.appInfo.fmp = data.fmp;
                that.appInfo.domReady = data.domReady
                that.appInfo.load = data.load;

                /*饼图数据*/
                that.appInfo.browserUseData = getPieData(data.browserData);
                that.appInfo.osData = getPieData(data.osData);
                that.appInfo.screenData = getPieData(data.screenData);

                resolve(that.appInfo);
            })
        })
    },
}
export default httpReq;
