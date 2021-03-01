<template>
    <div class="cluster-analysis flex-column hw100-oh"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
<!--      头部-->
      <div class="cluster-analysis-header flex-row">
        <div class="cluster-analysis-header-left flex-row">
          <service-select @onSelectChange="renderData"></service-select>
          <div class="flex-row" style="align-items: center;padding: 0 12px">
            <span class="sub-normal-text" style="white-space: nowrap">错误类目：</span>
            <el-select :size="'small'" v-model="errorSelect" placeholder="请选择">
              <el-option
                  v-for="item in errorTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="cluster-analysis-header-right">
          <time-picker @changeTime="renderData"></time-picker>
        </div>
      </div>
<!--      内容-->
      <div class="cluster-analysis-wrapper" v-if="!loading">
        <div class="cluster-analysis-body">
          <el-row :gutter="20" class="cluster-analysis-body-top">
            <el-col :span="10" style="height: 100%">
              <div class="flex-column hw100-oh">
                <sub-header-title sub-title="概况"></sub-header-title>
                <div class="cluster-analysis-body-top-content hw100-oh flex-row">
                  <view-item :view-item-data="v" :key="i" v-for="(v,i) in viewItemArr"></view-item>
                </div>
              </div>
            </el-col>
            <el-col :span="14" style="height: 100%">
              <div class="flex-column hw100-oh">
                <sub-header-title sub-title="错误统计"></sub-header-title>
                <div class="cluster-analysis-body-top-content hw100-oh p-b-10" style="padding-top: 10px;">
                  <cluster-analysis-bar
                    :bar-data="{
                      xData: $store.getters.getXAxisData,
                      barValue: errorValues
                    }"
                  >

                  </cluster-analysis-bar>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="cluster-analysis-body-bottom">
            <sub-header-title :sub-title="'错误列表'" style="margin-bottom: 18px"></sub-header-title>
            <div v-show="errorSelect == 1 || errorSelect == 0">
              <div class="js-error-item flex-row" v-for="n in 10" @click="onErrorItemClick">
                <span style="color: #505b73">https://jingyan.baidu.com/article/08b6a59191b95f14a80922b8.html.js.</span>
                <span style="color: #919dbd">【总共：1230次 | 发生页面：168个】</span>
                <img class="js-error-item-img" :src="require('@img/common_icon/subscribers.svg')" alt="">
                <span style="color: #505b73">（98）</span>
              </div>
            </div>
            <div v-show="errorSelect == 2 || errorSelect == 0">
              <div class="source-error-item flex-row" v-for="n in 10" @click="onErrorItemClick">
                <span class="source-error-item-tip"></span>
                <span class="source-error-item-title">Script error.</span>
                <span style="color: #505b73">Script error.</span>
                <span style="color: #919dbd">【总共：11次 | 发生页面：1个】</span>
                <img class="source-error-item-img" :src="require('@img/common_icon/subscribers.svg')" alt="">
                <span style="color: #505b73">（18）</span>
              </div>
            </div>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
import ServiceSelect from "@/components/common/ServiceSelect";
import TimePicker from "@/components/common/TimePicker";
import SubHeaderTitle from "@/components/common/SubHeaderTitle";
import ViewItem from "@/components/common/cluster_analysis/ViewItem";
import ClusterAnalysisBar from "@/components/common/cluster_analysis/ClusterAnalysisBar";
import httpReq from "@js/clusterAnalysis.js";
export default {
  name: "ClusterAnalysis",
  components: {ServiceSelect, TimePicker, SubHeaderTitle, ViewItem, ClusterAnalysisBar},
  data(){
    return {
      //是否加载
      loading: false,
      //概况数据
      viewItemArr: [
        {
          name: '总发生',
          value: '--',
          imgUrl: require('@img/common_icon/error_big.svg'),
          mainColor: '#fe9289',
          shadowStyle: {
            boxShadow: '0px 4px 10px 4px #fdcabf',
            borderRadius: '25px'
          },
        },
        {
          name: '影响页面',
          value: '1005',
          imgUrl: require('@img/common_icon/page_big.svg'),
          mainColor: '#57d9f9',
          shadowStyle: {
            boxShadow: '0px 4px 10px 4px #d5f1f5'
          },
        },
        {
          name: '影响用户',
          value: '2483',
          imgUrl: require('@img/common_icon/mumber.svg'),
          mainColor: '#75e7d6',
          shadowStyle: {
            // boxShadow: '0px 4px 10px 4px #d9f6ef',
            // borderRadius: '25px'
          },
        }
      ],

      //错误统计
      errorValues: [],

      errorSelect: '0',
      errorTypeData: [
        {
          value: '0',
          label: '全部错误',
        },
        {
          value: '1',
          label: 'js错误',
        },
        {
          value: '2',
          label: '静态资源加载异常'
        }
      ]
    }
  },
  methods:{
    //渲染数据
    renderData(){
      this.loading = true;
      let serviceName = this.$store.getters.getSelectServiceName;
      let time = this.$store.state.time;
      httpReq.getAllData(serviceName, time).then(appInfo => {
      //  赋值操作
        this.viewItemArr[0].value = appInfo.errorCount;
        this.errorValues = appInfo.errorValues

        this.loading = false;
      })
    },

    onErrorItemClick(id){
      //todo 从数据中接收点击的错误id 跳转高亮问题
      // id = "CA00001"; // =id
      // this.$store.commit('changeSelectedServiceId', id);
      this.$emit('change-content',{from: 'ClusterAnalysis',to: 'ClusterAnalysisDetail'})
    },

  },
  created() {
    this.$nextTick(()=> {
      this.renderData();
    })
  }
}
</script>

<style lang="scss">
@import '@css/style.scss';

.js-error-item,.source-error-item{
  height: 52px;
  border-radius: 3px;
  border: solid 1px #dae6f1;
  background: #f3f9ff;
  align-items: center;
  padding: 0 30px;
  margin-bottom: 22px;
  cursor: pointer;
  &-img{
    padding: 0 8px 0 12px;
    height: 18px;
  }

  &-tip{
    width: 12px;
    height: 12px;
    background-color: #fe9289;
    box-shadow: 0px 3px 6px 0px
    #ffe0dc;
    border-radius: 6px;
  }

  &-title{
    color: #00baff;
    font-size: 16px;
    font-weight: bold;
    padding: 0 22px 0 16px;
  }
}

.js-error-item:hover,.source-error-item:hover{
  border: solid 1px #00baff;
  background: #f2fbff;
}



.cluster-analysis{
  &-header{
    min-height: 52px;
    background-color: #ffffff;
    box-shadow: 0px 4px 8px 0px #b7c4e0;
    padding: 0 24px;
    justify-content: space-between;
    align-items: center;
    &-left{
      flex: 1;
    }
  }

  &-wrapper{
    height: 100%;
    overflow: hidden;
    padding: 20px;
  }

  &-body{
    height: 100%;
    width: 100%;
    background: #fff;
    overflow: hidden;
    overflow-y: auto;
    box-shadow: 0px 4px 8px 0px #b7c4e0;
    border-radius: 4px;
    padding: 34px 32px;

    &-top{
      height: 308px;

      &-content{
        justify-content: space-around;
        align-items: center;
      }
    }

    &-content{
      height: 53px;
      background: #f3f9ff;
      border-radius: 3px;
      border: solid 1px #dae6f1;
    }
  }

}

.p-b-10{
  padding-bottom: 10px;
}


</style>
