import axios from 'axios';

const serviceId = '$serviceId: ID!';
const keyword = '$keyword: String!';
const condition = '$condition:BrowserErrorLogQueryCondition';
let BrowserErrorLogQueryCondition = {
    category: '',
    pagePathId: '',
    paging: {},
    queryDuration: {},
    serviceId: '',
    serviceVersionId: ''
};
const queryPageData = {
    variable: `${serviceId},${keyword}`,
    fragment: `getEndpoints: searchEndpoint(serviceId: $serviceId, keyword: $keyword, limit: 100){ 
    key: id 
    label: name
    }`
};
const queryErrorLogData = {
    variable: `${condition}`,
    fragment: `queryBrowserErrorLogs(condition: $condition) { logs {
    message
    service
    time
    pagePath
    category
    errorUrl
    stack
    grade
    }
    total
    }`
};

const queryPage = `query queryEndpoints(${queryPageData.variable}){${queryPageData.fragment}}`;
const queryErrorLog = `query queryBrowserErrorLogs(${queryErrorLogData.variable}){${queryErrorLogData.fragment}}`;

let graphqlPageData = {
    query: queryPage,
    variables: {keyword: "", serviceId: ""}
}

let graphqlErrorLog = {
    query: queryErrorLog,
    variables: {
        condition: BrowserErrorLogQueryCondition
    }
}

let httpReq = {
    // 获取应用下所有页面数据
    getAllPageData: function (serviceId) {
        graphqlPageData.variables.serviceId = serviceId;
        return axios.post('/graphql', graphqlPageData);
    },
    // 获取错误日志数据
    getErrorLogData: function (serviceId,pagePathId,category,paging,duration) {
        graphqlErrorLog.variables.condition = {
            serviceId,
            serviceVersionId: '',
            pagePathId,
            category,
            queryDuration:duration,
            paging,
        }
        return axios.post('/graphql', graphqlErrorLog);
    }
}

export default httpReq;




