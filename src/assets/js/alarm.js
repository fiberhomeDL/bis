import axios from 'axios';

const keyword = '$keyword: String!';
const scope = '$scope: Scope';
const duration = '$duration: Duration!';
const paging = '$paging: Pagination!';

// 应用下的页面
const queryAlarmData = {
    variable: `${keyword},${scope},${duration},${paging}`,
    fragment: `getAlarm: getAlarm(keyword: $keyword, scope: $scope, duration: $duration, paging: $paging) {↵      
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
    variables: {keyword: "", duration: {}, paging: {}}
}

let httpReq = {
    // 获取告警数据
    getAlarmData: function (duration, keyword, paging) {
        graphqlAlarmData.variables = {
            keyword,
            duration,
            paging
        }
        return axios.post('/graphql', graphqlAlarmData);
    }
}

export default httpReq;
