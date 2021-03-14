import Vue from 'vue'
import Vuex from 'vuex'
import util from "@js/common"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //应用数据数组
        services: [],
        //被选中服务ID
        selectedServiceId: undefined,
        // 时间
        time: [new Date((new Date().getTime() - 15 * 60 * 1000)).toLocaleString(), new Date().toLocaleString()],
        // 聚合分析-错误列表-跳转的ID
        clusterAnalysisId: '',
        // 用户行为追踪-行为列表-跳转ID
        behaviorTraceId: '',
        //应用总览 跳转到 页面监控 页面 所带的页面信息
        toPageMonitorParam: {
            id: undefined,
            name: undefined
        },
        // 页面监控跳转至错误日志  参数
        monitorToLogParam: {
            page: undefined,
            category: undefined
        },
        // 错误类型点击项
        errorItemClickType: ''
    },
    getters: {
        //获取选中的服务名称
        getSelectServiceName: state => {
            return state.services.find(item => {
                return item.id == state.selectedServiceId;
            }).name
        },
        //获取echarts图x轴数据
        getXAxisData: state => {
            return util.initXAxisData(state.time);
        }
    },
    mutations: {
        //设置应用总览跳转至页面监控参数
        setMonitorParam(state, payload) {
            state.toPageMonitorParam = payload;
        },
        // 清除应用总览跳转至页面监控参数
        clearMonitorParam(state) {
            /*获取值后调用*/
            state.toPageMonitorParam = {
                id: undefined,
                name: undefined
            }
        },
        // 清除页面监控跳转至错误日志参数
        clearMonitorToLogParam(state) {
            /*获取值后调用*/
            state.monitorToLogParam = {
                page: undefined,
                category: undefined
            }
        },
        // 设置页面监控跳转至错误日志参数
        setMonitorToLogParam(state, payload) {
            state.monitorToLogParam = payload;
        },
        //为应用列表赋值
        setServices(state, payload) {
            state.services = payload;
        },
        //变更选中应用id
        changeSelectedServiceId(state, selectedId) {
            state.selectedServiceId = selectedId;
        },
        changeClusterAnalysisId(state, id) {
            state.clusterAnalysisId = id;
        },
        changeBehaviorTraceId(state, id) {
            state.behaviorTraceId = id;
        },
        setErrorItemClickType(state, payload){
            state.errorItemClickType = payload;
        }
    },
    actions: {},
    modules: {}
})
