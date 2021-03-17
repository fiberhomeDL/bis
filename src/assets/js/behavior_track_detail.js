import axios from 'axios';

const id = '$id:String!';

// 用户行为记录列表
const queryBehaviorDetailData = {
    variable: `${id}`,
    fragment: `queryUserBehaviorDetail: queryUserBehaviorDetail(id: $id) {
     id
     userIp
     policeId
     browserType
     browserVersion
     operatingSystem
     operatingSystemVersion
     screenHeight
     screenWidth
     pagePath
     startTime
     pagePerfDataStr
    }`
};
const queryBehaviorErrorData = {
    fragment: `queryUserBehaviorErrorLog: queryUserBehaviorErrorLog(id: $id) {
    logs { 
          errorType
          startTime
          pagePath
          category
          grade
          message
          line
          col
          stack
          errorUrl
        }
    }`
};

const queryBehaviorDetail = `query queryData(${queryBehaviorDetailData.variable}){${queryBehaviorDetailData.fragment},${queryBehaviorErrorData.fragment}}`;

// graphql
let graphqlBehaviorDetailData = {
    query: queryBehaviorDetail,
    variables: {id: ''}
};

let httpReq = {
    // 获取用户行为记录列表
    getBehaviorDetailData: function (beId) {
        graphqlBehaviorDetailData.variables = {id: beId};
        return axios.post('/graphql', graphqlBehaviorDetailData);
    }
};

export default httpReq;
