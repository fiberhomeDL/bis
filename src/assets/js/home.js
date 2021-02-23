import axios from 'axios';

function toDateFormatter(date){
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

let now = new Date();

//数据最多储存两个月
let startTime = toDateFormatter(new Date((now.getTime() - 3600 * 24 * 60 * 1000)));
let endTime = toDateFormatter(now);


let httpReq = {
    //获取应用列表
    getAllService(){
        return axios.post('/graphql',{
            query: `query queryBrowserServices($duration: Duration!) {
                services: getAllBrowserServices(duration: $duration) {
                    id
                    name
                }
            }`,
            variables: {
                duration: {
                    end: endTime,
                    start: startTime,
                    step: "DAY"
                }
            }
        })
    }
}
export default httpReq;

