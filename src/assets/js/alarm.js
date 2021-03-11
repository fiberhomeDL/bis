import axios from 'axios';

const keyword = '$keyword: String';
const serviceId =  '$serviceId: String!';
const metricsName =  '$metricsName: String';
const duration = '$duration: Duration!';
const paging = '$paging: Pagination!';

// 应用下的页面
const queryAlarmData = {
    variable: `${keyword},${serviceId},${metricsName},${duration},${paging}`,
    fragment: `getAlarm: getBrowserAlarmList(keyword: $keyword,serviceId:$serviceId,metricsName:$metricsName,duration: $duration, paging: $paging) {↵      
    items: 
    msgs { ↵
    key: id↵ 
    message↵        
    startTime↵        
    scope↵      
    }↵      
    total↵ 
    }`
};

const queryAlarm = `query queryAlarms(${queryAlarmData.variable}){${queryAlarmData.fragment}}`;

// graphql
let graphqlAlarmData = {
    query: queryAlarm,
    variables: {keyword: "",serviceId:"", metricsName:"",duration: {}, paging: {}}
}

let httpReq = {
    // 获取告警数据
    getAlarmData: function (keyword,serviceId,metricsName,duration,paging) {
        graphqlAlarmData.variables = {
            keyword,
            serviceId,
            metricsName,
            duration,
            paging
        }
        return axios.post('/graphql', graphqlAlarmData);
    }
}

export default httpReq;
