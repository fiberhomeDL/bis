import axios from 'axios';

const id = '$id: ID!';

// 用户行为记录列表
const queryBehaviorDetailData = {
    variable: `${id}`,
    fragment: `queryUserBehaviorDetail: queryUserBehaviorDetail(id: $Id) {
     id
     userIp
     pcNumber
     browserType
     browserVersion
     operatingSystem
     operatingSystemVersion
     resolution
     pagePath
     startTime
     errorNum
     browserPerfDataStr
    }`
};
const queryBehaviorErrorData = {
    fragment: `queryUserBehaviorErrorLog: queryUserBehaviorErrorLog(id: $Id) {
    logs { 
          errorType
          startTime
          pagePath
          errorCategory
          errorContent
}
    }`
};


const queryBehaviorDetail = `query queryData(${queryBehaviorDetailData.variable}){${queryBehaviorDetailData.fragment},${queryBehaviorErrorData.fragment}}`;

// graphql
let graphqlBehaviorDetailData = {
    query: queryBehaviorDetail,
    variables: {id: {}}
}

let httpReq = {
    // 获取用户行为记录列表
    getBehaviorDetailData: function (id) {
        graphqlBehaviorDetailData.variables = {id}
        return axios.post('/graphql', graphqlBehaviorDetailData);
    }
}

export default httpReq;
