import axios from 'axios';

const serviceId = '$serviceId: ID!';
const keyword = '$keyword: String!';
const condition = '$condition: TopNCondition!';
const duration = '$duration: Duration!';
const pvCondition = '$pvConditionVar: MetricsCondition!';
const errorSumCondition = '$errorSumConditionVar: MetricsCondition!';
const jsSumCondition = '$jsSumConditionVar: MetricsCondition!';
const resSumCondition = '$resSumConditionVar:MetricsCondition!';
const ajaxSumCondition = '$ajaxSumConditionVar:MetricsCondition!';
const unknowSumCondition = '$unknowSumConditionVar:MetricsCondition!';
const dnsTimeCondition = '$dnsTimeConditionVar:MetricsCondition!';
const tcpTimeCondition = '$tcpTimeConditionVar:MetricsCondition!';
const sslTimeCondition = '$sslTimeConditionVar:MetricsCondition!';
const ttfbTimeCondition = '$ttfbTimeConditionVar:MetricsCondition!';
const transTimeCondition = '$transTimeConditionVar:MetricsCondition!';
const domReadyTimeCondition = '$domReadyTimeConditionVar:MetricsCondition!';
const resTimeCondition = '$resTimeConditionVar:MetricsCondition!';
const fptTimeCondition = '$fptTimeConditionVar:MetricsCondition!';
const fmpTimeCondition = '$fmpTimeConditionVar:MetricsCondition!';
const loadTimeCondition = '$loadTimeConditionVar:MetricsCondition!';
const loadPerCondition = '$loadPerConditionVar:MetricsCondition!';
const labels = '$labels: [String!] !';


const TopNCondition = {
    name: "browser_app_page_fpt_avg",
    normal: true,
    order: "DES",
    parentService: "test-ui",
    scope: "Endpoint",
    topN: 10
}
const pvConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_pv"
}

const errorSumConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_error_sum"
}

const jsSumConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_js_error_sum"
}

const resSumConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_resource_error_sum"
}
const ajaxSumConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_ajax_error_sum"
}
const unknowSumConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_unknown_error_sum"
}
const dnsTimeConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_dns_avg"
}
const tcpTimeConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_tcp_avg"
}
const sslTimeConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_ssl_avg"
}
const ttfbTimeConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_ttfb_avg"
}
const transTimeConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_trans_avg"
}
const domReadyTimeConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_dom_ready_avg"
}
const resTimeConditionVar = {
    entity: {
        endpointName: "index.html",
        normal: true,
        scope: "Endpoint",
        serviceName: "test-ui",
    },
    name: "browser_app_page_res_avg"
}
const fptTimeConditionVar = {
    entity: {
        scope: "Endpoint",
        serviceName: "test-ui",
        endpointName: "index.html",
        normal: true
    },
    name: "browser_app_page_fpt_avg"
}
const fmpTimeConditionVar = {
    entity: {
        scope: "Endpoint",
        serviceName: "test-ui",
        endpointName: "index.html",
        normal: true
    },
    name: "browser_app_page_fmp_avg"
}
const loadTimeConditionVar = {
    entity: {
        scope: "Endpoint",
        serviceName: "test-ui",
        endpointName: "index.html",
        normal: true
    },
    name: "browser_app_page_load_page_avg"
}
const loadPerConditionVar = {
    entity: {
        scope: "Endpoint",
        serviceName: "test-ui",
        endpointName: "index.html",
        normal: true
    },
    name: "browser_app_page_load_page_percentile"
}
const labelsVar = ["0", "1", "2", "3", "4"];


// 应用下的页面
const queryPageData = {
    variable: `${serviceId},${keyword}`,
    fragment: `getEndpoints: searchEndpoint(serviceId: $serviceId, keyword: $keyword, limit: 100){ 
    id 
    name
    }`
};
// 页面白屏时间、首屏时间等
const queryPageTimeTopData = {
    variable: `${condition},${duration}`,
    fragment: `sortMetrics: sortMetrics(condition: $condition, duration: $duration) {↵    name↵    id↵    value↵ }`
};
// 页面浏览量
const queryPagePvData = {
    variable: `${pvCondition},${duration}`,
    fragment: `pv: readMetricsValue(condition: $pvConditionVar, duration: $duration)`
}
// 页面错误总量
const queryPageErrorSum = {
    variable: `${errorSumCondition}`,
    fragment: `totalErrorSum: readMetricsValue(condition: $errorSumConditionVar, duration: $duration)`
}
// 页面js错误数量
const queryPageJsErrorSum = {
    variable: `${jsSumCondition}`,
    fragment: `jsErrorSum: readMetricsValue(condition: $jsSumConditionVar, duration: $duration)`
}
// 页面静态资源错误数量
const queryPageResErrorSum = {
    variable: `${resSumCondition}`,
    fragment: `resErrorSum: readMetricsValue(condition: $resSumConditionVar, duration: $duration)`
}
// 页面ajax错误数量
const queryPageAjaxErrorSum = {
    variable: `${ajaxSumCondition}`,
    fragment: `ajaxErrorSum: readMetricsValue(condition: $ajaxSumConditionVar, duration: $duration)`
}
// 页面未知错误数量
const queryPageUnknowErrorSum = {
    variable: `${unknowSumCondition}`,
    fragment: `unknowErrorSum: readMetricsValue(condition: $unknowSumConditionVar, duration: $duration)`
}
// 页面dns时间
const queryPageDnsTime = {
    variable: `${dnsTimeCondition}`,
    fragment: `dnsTime: readMetricsValue(condition: $dnsTimeConditionVar, duration: $duration)`
}
// 页面tcp时间
const queryPageTcpTime = {
    variable: `${tcpTimeCondition}`,
    fragment: `tcpTime: readMetricsValue(condition: $tcpTimeConditionVar, duration: $duration)`
}
// 页面ssl时间
const queryPageSslTime = {
    variable: `${sslTimeCondition}`,
    fragment: `sslTime: readMetricsValue(condition: $sslTimeConditionVar, duration: $duration)`
}
// 页面TTFB时间
const queryPageTTFBTime = {
    variable: `${ttfbTimeCondition}`,
    fragment: `ttfbTime: readMetricsValue(condition: $ttfbTimeConditionVar, duration: $duration)`
}
// 页面Trans时间
const queryPageTransTime = {
    variable: `${transTimeCondition}`,
    fragment: `transTime: readMetricsValue(condition: $transTimeConditionVar, duration: $duration)`
}
// 页面Dom Ready时间
const queryPageDomReadyTime = {
    variable: `${domReadyTimeCondition}`,
    fragment: `domReadyTime: readMetricsValue(condition: $domReadyTimeConditionVar, duration: $duration)`
}
// 页面Resource时间
const queryPageResTime = {
    variable: `${resTimeCondition}`,
    fragment: `resTime: readMetricsValue(condition: $resTimeConditionVar, duration: $duration)`
}
// 页面fpt时间
const queryPageFptTime = {
    variable: `${fptTimeCondition}`,
    fragment: `fptTime: readMetricsValues(condition: $fptTimeConditionVar, duration: $duration){↵
values {
    values {
        value
    }↵
   }↵
}`
}
// 页面fmp时间
const queryPageFmpTime = {
    variable: `${fmpTimeCondition}`,
    fragment: `fmpTime: readMetricsValues(condition: $fmpTimeConditionVar, duration: $duration){↵
values {
    values {
        value
    }↵
   }↵
}`
}
// 页面domReady时间（时间段）
const queryPageFmpTimeDuration = {
    variable: `${domReadyTimeCondition}`,
    fragment: `domReadyTimeDuration: readMetricsValues(condition: $domReadyTimeConditionVar, duration: $duration){↵
values {
    values {
        value
    }↵
   }↵
}`
}
// 页面load时间
const queryPageLoadTime = {
    variable: `${loadTimeCondition},${labels}`,
    fragment: `loadTime: readMetricsValues(condition: $loadTimeConditionVar, duration: $duration){↵
values {
    values {
        value
    }↵
   }↵
}`
}
// 页面加载延时时间百分比
const queryPageLoadPerTime = {
    variable: `${loadPerCondition}`,
    fragment: `loadPerTime: readLabeledMetricsValues(↵condition: $loadPerConditionVar, ↵labels: $labels, ↵duration: $duration) {↵
label↵ 
values {↵
values {
value
}↵
}↵
}`
}
// 页面错误总量（时间段）
const queryPageErrorSumDuration = {
    fragment: `totalErrorSumDuration: readMetricsValues(condition: $errorSumConditionVar, duration: $duration){↵
        label↵    
        values {↵      
        values {
        value}↵    }↵  }`
}


const queryPage = `query queryEndpoints(${queryPageData.variable}){${queryPageData.fragment}}`;
const queryPageTimeTop = `query queryData(${queryPageTimeTopData.variable}){${queryPageTimeTopData.fragment}}`;
const queryPageDetail = `query queryData(
    ${queryPagePvData.variable},
    ${queryPageErrorSum.variable},
    ${queryPageJsErrorSum.variable},
    ${queryPageResErrorSum.variable},
    ${queryPageAjaxErrorSum.variable},
    ${queryPageUnknowErrorSum.variable},
    ${queryPageDnsTime.variable},
    ${queryPageTcpTime.variable},
    ${queryPageSslTime.variable},
    ${queryPageTTFBTime.variable},
    ${queryPageTransTime.variable},
    ${queryPageDomReadyTime.variable},
    ${queryPageResTime.variable},
    ${queryPageFptTime.variable},
    ${queryPageFmpTime.variable},
    ${queryPageFmpTimeDuration.variable},
    ${queryPageLoadTime.variable},
    ${queryPageLoadPerTime.variable},
    ){
       ${queryPagePvData.fragment},
       ${queryPageErrorSum.fragment},
       ${queryPageJsErrorSum.fragment},
       ${queryPageResErrorSum.fragment},
       ${queryPageAjaxErrorSum.fragment},
       ${queryPageUnknowErrorSum.fragment},
       ${queryPageDnsTime.fragment},
       ${queryPageTcpTime.fragment},
       ${queryPageSslTime.fragment},
       ${queryPageTTFBTime.fragment},
       ${queryPageTransTime.fragment},
       ${queryPageDomReadyTime.fragment},
       ${queryPageResTime.fragment},
       ${queryPageFptTime.fragment},
       ${queryPageFmpTime.fragment},
       ${queryPageFmpTimeDuration.fragment},
       ${queryPageLoadTime.fragment},
       ${queryPageLoadPerTime.fragment},
       ${queryPageErrorSumDuration.fragment},
       }`;

let graphqlPageData = {
    query: queryPage,
    variables: {keyword: "", serviceId: ""}
}
let graphqlPageTimeAvgTop = {
    query: queryPageTimeTop,
    variables: {condition: TopNCondition}
}
let graphqlGetPageDetail = {
    query: queryPageDetail,
    variables: {
        pvConditionVar: pvConditionVar,
        errorSumConditionVar: errorSumConditionVar,
        jsSumConditionVar: jsSumConditionVar,
        resSumConditionVar: resSumConditionVar,
        ajaxSumConditionVar: ajaxSumConditionVar,
        unknowSumConditionVar: unknowSumConditionVar,
        dnsTimeConditionVar: dnsTimeConditionVar,
        tcpTimeConditionVar: tcpTimeConditionVar,
        sslTimeConditionVar: sslTimeConditionVar,
        ttfbTimeConditionVar: ttfbTimeConditionVar,
        transTimeConditionVar: transTimeConditionVar,
        domReadyTimeConditionVar: domReadyTimeConditionVar,
        resTimeConditionVar: resTimeConditionVar,
        fptTimeConditionVar: fptTimeConditionVar,
        fmpTimeConditionVar: fmpTimeConditionVar,
        loadTimeConditionVar: loadTimeConditionVar,

        loadPerConditionVar: loadPerConditionVar,
        labels: labelsVar,

    }
}


let httpReq = {
    // 获取应用下所有页面数据
    getAllPageData: function (serviceId) {
        graphqlPageData.variables.serviceId = serviceId;
        return axios.post('/graphql', graphqlPageData);
    },
    // 获取页面白屏时间等
    getPageTimeAvgTop: function (condition, duration) {
        graphqlPageTimeAvgTop.variables.condition = {
            name: condition.name,
            normal: true,
            order: "DES",
            parentService: condition.service,
            scope: "Endpoint",
            topN: condition.topN
        };
        graphqlPageTimeAvgTop.variables.duration = duration;
        return axios.post('/graphql', graphqlPageTimeAvgTop);
    },
    // 获取页面详情数据
    getPageDetail: function (duration) {
        graphqlGetPageDetail.variables.duration = duration;
        return axios.post('/graphql', graphqlGetPageDetail);
    }

}

export default httpReq;
