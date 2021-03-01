import axios from 'axios';

const duration = '$duration: Duration!';
const condition = '$condition: Condition!';

// 用户行为记录列表
const queryBehaviorData = {
    variable: `${condition},${duration}`,
    fragment: `queryUserBehaviorRecord: queryUserBehaviorRecord(condition: $condition, duration: $duration) {
     values {
         id
         userIp
         policeId:pcNumber
         browserType
         browserVersion
         OperateType:operatingSystem
         OperateVersion:operatingSystemVersion
         resolution
         pageName:pagePath
         startTime
         errorNum
        }
    }`
};

const queryBehavior = `query queryData(${queryBehaviorData.variable}){${queryBehaviorData.fragment}}`;

// graphql
let graphqlBehaviorData = {
    query: queryBehavior,
    variables: {condition: {}, duration: {}}
}

let httpReq = {
    // 获取用户行为记录列表
    getBehaviorData: function (condition, duration) {
        graphqlBehaviorData.variables = {
            condition,
            duration
        }
        return axios.post('/graphql', graphqlBehaviorData);
    }
}

export default httpReq;
