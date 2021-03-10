import axios from 'axios';

const condition = '$condition: BrowserUserBehaviorQueryCondition!';
const id = '$id: String!';

// 用户行为记录列表
const queryBehaviorData = {
    variable: `${condition}`,
    fragment: `queryUserBehaviorRecord: queryUserBehaviorRecord(condition: $condition) {
     behaviors  {
         id
         userIp
         policeId
         browserType
         browserVersion
         OperateType:operatingSystem
         OperateVersion:operatingSystemVersion
         screenHeight
         screenWidth
         pageName:pagePath
         startTime
        }
        total
    }`
};
// 记录错误数量
const queryRecordErrorData = {
    variable: `${id}`,
    fragment: `queryUserBehaviorErrorLog: queryUserBehaviorErrorLog(id: $id) {
    logs { 
          userIp
          policeId
         }
    }`
};

const queryBehavior = `query queryData(${queryBehaviorData.variable}){${queryBehaviorData.fragment}}`;
const queryRecordError = `query queryData(${queryRecordErrorData.variable}){${queryRecordErrorData.fragment}}`;

// graphql
let graphqlBehaviorData = {
    query: queryBehavior,
    variables: {condition: {}}
}

let graphqlRecordError = {
    query: queryRecordError,
    variables: {id: {}}
}

let httpReq = {
    // 初始化
    init(condition) {
        let that = this;
        // 查询数据
        return new Promise(function (resolve, reject) {
            // 获取用户行为记录列表
            that.getBehaviorData(condition).then(data => {
                // 用户行为列表
                let userBehaviorRecordList = data.queryUserBehaviorRecord;
                //
                Promise.all(
                    userBehaviorRecordList.behaviors.map((item) => {
                        //每一项记录对应生成一个请求错误数据的promise
                        return new Promise((resolve, reject) => {
                            that.getRecordErrorData(item.id).then(data => {
                                //错误数量
                                item.errorCount = data.queryUserBehaviorErrorLog.logs.length;
                                resolve();
                            });
                        });
                    }),
                )
                    //只有当每一项记录的请求对应的promise都执行完成并且resolve后，才会执行then里面的代码
                    .then(() => {
                        resolve(userBehaviorRecordList)
                    });
            })
        })
    },
    // 获取用户行为记录列表
    getBehaviorData: function (condition) {
        graphqlBehaviorData.variables = {condition}
        return axios.post('/graphql', graphqlBehaviorData);
    },
    // 获取一项记录的错误数量
    getRecordErrorData: function (id) {
        graphqlRecordError.variables = {id}
        return axios.post('/graphql', graphqlRecordError);
    }
}

export default httpReq;
