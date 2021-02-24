import axios from 'axios';

const serviceId = '$serviceId: ID!';
const keyword = '$keyword: String!';
const condition = '$condition: MetricsCondition!';
const duration = `$duration: Duration!`;


const MetricsCondition = {
    entity: {
        scope: "Endpoint",
        serviceName: "test",
        endpointName: "home.jsp",
        normal: true
    },
    name: "browser_app_page_fpt_avg"
}
const queryPageData = {
    variable: `${serviceId},${keyword}`,
    fragment: `getEndpoints: searchEndpoint(serviceId: $serviceId, keyword: $keyword, limit: 100){ 
    id 
    name
    }`
};
const queryPageFptData = {
    variable: `${condition},${duration}`,
    fragment: `readMetricsValues: readMetricsValues(condition: $condition, duration: $duration) {↵
                label↵ 
                values {↵
                     values {
                         value
                     }↵
                   }↵
                }`
};

const queryPage = `query queryEndpoints(${queryPageData.variable}){${queryPageData.fragment}}`;
const queryPageFpt = `query queryData(${queryPageFptData.variable}){${queryPageFptData.fragment}}`;

let graphqlPageData = {
    query: queryPage,
    variables: {keyword: "", serviceId: ""}
}
let graphqlPageFptAvg = {
    query: queryPageFpt,
    variables: {condition: MetricsCondition}
}


let httpReq = {
    // 获取应用下所有页面数据
    getAllPageData: function (serviceId) {
        graphqlPageData.variables.serviceId = serviceId;
        return axios.post('/graphql', graphqlPageData);
    },
    // 获取页面fpt
    getPageFptAvg: function (duration) {
        graphqlPageFptAvg.variables.duration = duration;
        return axios.post('/graphql', graphqlPageFptAvg);

    }

}

export default httpReq;
