import axios from 'axios';
import util from '@js/common'

let httpReq = {
    /*获取浏览器和操作系统的使用量*/
    getBrowserAndOsData(serviceName,serviceId,time){
        let duration = util.formatStartAndEndTime(time);
        return new Promise(function (resolve){
            axios.post('/graphql', {
                query: `
                    query (
                        $condition_bw: BrowserAppNumDistributionQueryCondition!
                        $condition_os: BrowserAppNumDistributionQueryCondition!
                        $duration: Duration!
                    ){
                        bw: queryAppNumByCategory(condition: $condition_bw, duration: $duration){
                            category
                            version
                            value
                        }
                        os: queryAppNumByCategory(condition: $condition_os, duration: $duration){
                            category
                            version
                            value
                        }
                    }
                `,
                variables: {
                    condition_bw: {
                        "name": "browser_type",
                        "serviceId": serviceId,
                        "serviceName": serviceName
                    },
                    condition_os: {
                        "name": "browser_system",
                        "serviceId": serviceId,
                        "serviceName": serviceName
                    },
                    duration
                }
            }).then(data => {
                /*保留数据类型关键词 二次请求数据需要用*/
                data.bw = data.bw.map(item => {
                    return Object.assign({},item,{type: 'browser_type'})
                }).map(item => {
                    return Object.assign({},item,{
                        name: (item.category + item.version).split(".").slice(0,2).join(".")
                    })
                }).sort(function(x, y){
                    return y.value - x.value;
                });
                data.os = data.os.map(item => {
                    return Object.assign({},item,{type: 'browser_system'})
                }).map(item => {
                    return Object.assign({},item,{
                        name: (item.category + item.version).split(".").slice(0,2).join(".")
                    })
                }).sort(function(x, y){
                    return y.value - x.value;
                });
                resolve(data);
            })
        })
    },
    /*获取错误统计和各类速度指标*/
    getErrorCountAndSpeed(reqObj,serviceId,time){
        debugger;
        let duration = util.formatStartAndEndTime(time);
        return new Promise(function (resolve){
            axios.post('/graphql', {
                query: `
                    query(
                        $serviceId: String!,
                        $category: String!, 
                        $name: String!, 
                        $version: String, 
                        $duration: Duration!
                    ){
                        errorData: queryTerminalErrorStat(serviceId: $serviceId, category: $category, name: $name, version: $version, duration: $duration){
                            values {
                                values {
                                    value
                                }
                            }
                        }
                        speed: queryTerminalAccessSpeed(serviceId: $serviceId, category: $category, name: $name, version: $version, duration: $duration)
                    }
                `,
                variables: {
                    serviceId,
                    category: reqObj.type,
                    name: reqObj.category,
                    version: reqObj.version,
                    duration
                }
            }).then(data => {
                data.errorData = data.errorData.values.values.map(item => item.value);
                data.speed = [
                    {
                        name: "页面白屏时间",
                        value: data.speed[0]
                    },
                    {
                        name: "页面首屏时间",
                        value: data.speed[1]
                    },
                    {
                        name: "Html加载时间",
                        value: data.speed[2]
                    },
                    {
                        name: "页面完全加载时间",
                        value: data.speed[3]
                    },
                ];
                resolve(data);

            })
        })

    },
    /*获取使用统计数据*/
    getUseCount(category,serviceName,serviceId,time){
        let duration = util.formatStartAndEndTime(time);
        return new Promise(function (resolve){
            axios.post('/graphql', {
                query: `
                    query (
                        $condition: BrowserAppNumDistributionQueryCondition!,
                        $duration: Duration!
                    ){
                        use: queryAppNumByCategory(condition: $condition, duration: $duration) {
                            category
                            version
                            value
                        }
                    }
                `,
                variables: {
                    "condition": {
                        "name": category,
                        "serviceId": serviceId,
                        "serviceName": serviceName
                    },
                    duration
                }

            }).then(data => {
                resolve(data);
            })
        })
    },
    /*获取使用性能数据*/
    getPerf(category,serviceId,time){
        let duration = util.formatStartAndEndTime(time);
        return new Promise(function (resolve) {
            axios.post('/graphql', {
                query: `
                    query($serviceId: String!, $category: String!, $duration: Duration!){
                        perf: queryTerminalUsedPerf(serviceId: $serviceId, category: $category,duration: $duration){
                            category
                            version
                            value
                        }
                    }
                `,
                variables: {
                    serviceId: serviceId,
                    category: category,
                    duration
                }
            }).then(data => {
                resolve(data);
            })
        });
    }

};

export default httpReq
