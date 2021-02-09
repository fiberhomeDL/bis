<template>
  <div class="home-page hw100-oh">
<!--    顶栏-->
    <div class="home-page-head">
<!--      应用名称搜索框-->
      <div class="home-page-head-input">
        <el-input
            placeholder="请输入应用名称"
            suffix-icon="el-icon-search"
            size="small"
            v-model.trim="searchInput">
        </el-input>
      </div>
<!--      满意度单选框-->
      <div class="home-page-head-radio">
        <span class="home-page-head-radio-title">状态</span>
        <el-radio class="home-page-head-radio-item"
                  v-for="(item,index) in satisfactionData"
                  :key="index"
                  v-model="satisfactionSelect"
                  :label="item.label">{{ item.title }}
        </el-radio>
      </div>
<!--      操作栏: 下载-->
      <div class="home-page-head-option">
        <download-button @click="doDownLoad"></download-button>
      </div>
    </div>
    <div class="home-page-content">
      <div class="home-page-content-body" :class="{'nodata': appInfoByFilter.length == 0}">
<!--        拼写满意度样式名称-->
        <div v-for="(value, index) in appInfoByFilter"
             :key="index"
             :class="[
                'home-page-content-body-item',
                'satisfaction-'+value.satisfaction,
                appInfoByFilter.length == 0 ? 'nodata' : ''
             ]"
             @click="doServiceClick(value)" >
<!--          满意度标识(右上角↗)-->
          <satisfaction-tag :level="value.satisfaction"></satisfaction-tag>
<!--          应用卡片-->
          <view-card
              :service-name="value.name"
              :service-info="value.infoData"
              :charts-data="value.chartsData"
          >
          </view-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DownloadButton from "@c/common/DownloadButton";
import ViewCard from "@/components/home/ViewCard";
import SatisfactionTag from "@/components/common/home_page/SatisfactionTag";
export default {
  name: "HomePage",
  components: {
    SatisfactionTag,
    ViewCard,
    DownloadButton
  },
  data(){
    return {
      //应用名称搜索文本
      searchInput: '',
      //满意度选择项 及 默认值
      satisfactionSelect: '0',
      //满意度数据源配置
      satisfactionData:[
        {
          //展示名称 必填
          'title': '全部',
          //对应value值
          'label': '0'
        },
        {
          'title': '满意',
          'label': '1'
        },{
          'title': '一般',
          'label': '2'
        },{
          'title': '不满意',
          'label': '3'
        }
      ],
      //应用详情
      appInfo: [
        {
          id: '1',
          //应用名
          name: 'testPG1',
          //满意度 '1'满意 '2'一般 '3'不满意
          satisfaction: '1',
          //数据面板
          infoData: {
            viewCount: "21239",
            subscribersCount: '59',
            errorCount: '5',
            warningCount: '14',
            performanceCount: '99',
          },
          //柱状图数据
          chartsData: {
            //x轴坐标名
            xData: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
            //y轴数据
            uvData: [100,200,300,400,500,600,700,800,300,100,200,100,100,200,300,400,500,600,700,800,300,100,200,100],
            pvData: [100,200,100,300,800,700,600,500,400,300,200,100,100,200,100,300,800,700,600,500,400,300,200,100],
          }
        },
        {
          id: '1',
          //应用名
          name: 'testPG2',
          //满意度 '1'满意 '2'一般 '3'不满意
          satisfaction: '2',
          //数据面板
          infoData: {
            viewCount: "21239",
            subscribersCount: '59',
            errorCount: '5',
            warningCount: '14',
            performanceCount: '99',
          },
          //柱状图数据
          chartsData: {
            //x轴坐标名
            xData: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
            //y轴数据
            uvData: [100,200,300,400,500,600,700,800,300,100,200,100,100,200,300,400,500,600,700,800,300,100,200,100],
            pvData: [100,200,100,300,800,700,600,500,400,300,200,100,100,200,100,300,800,700,600,500,400,300,200,100],
          }
        },
        {
          id: '1',
          //应用名
          name: 'testPG3',
          //满意度 '1'满意 '2'一般 '3'不满意
          satisfaction: '3',
          //数据面板
          infoData: {
            viewCount: "21239",
            subscribersCount: '59',
            errorCount: '5',
            warningCount: '14',
            performanceCount: '99',
          },
          //柱状图数据
          chartsData: {
            //x轴坐标名
            xData: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
            //y轴数据
            uvData: [100,200,300,400,500,600,700,800,300,100,200,100,100,200,300,400,500,600,700,800,300,100,200,100],
            pvData: [100,200,100,300,800,700,600,500,400,300,200,100,100,200,100,300,800,700,600,500,400,300,200,100],
          }
        }
      ]
    }
  },
  methods: {
    doDownLoad(){
      alert('do download')
    },
    doServiceClick(value){
      this.$router.push({
        name: 'Detail',
        params: {
          id: value.id,
          name: value.name
        }
      })
    }
  },
  computed:{
    //绑定筛选条件 前端动态筛选
    appInfoByFilter(){
      //是否启用满意度筛选
      let satisfactionSelectFlag = this.satisfactionSelect == 0;
      return this.appInfo.filter(item=>{
        return item.name.includes(this.searchInput) && (satisfactionSelectFlag || item.satisfaction == this.satisfactionSelect)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.home-page{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-size: 14px;

  &-head{
    display: flex;
    height: 52px;
    box-shadow: 0px 4px 8px 0px #b7c4e0;
    align-items: center;
    padding: 0 22px;
    background: #ffffff;
    &-input{
      width: 280px;
      height: 32px;
    }

    &-radio{
      display: flex;
      padding: 0 24px;
      align-items: center;
      color: #8a9db1;
      &-item{
        margin-left: 16px;
      }
    }
    &-option{
      flex-grow: 1;
      text-align: right;
      padding-right: 12px;
      &-btn{
        color: #a7b4ce;
        font-size: 18px;
        cursor: pointer;
      }
      &-btn:hover{
        color: #409EFF;
      }
    }
  }

  &-content{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 20px 24px 24px;

    &-body{
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      background-color: #ffffff;
      box-shadow: 0px 4px 8px 0px #b7c4e0;
      border-radius: 5px;
      padding: 24px 24px 4px;

      &-item{
        display: inline-block;
        width: calc(50% - 14px);
        height: 268px;
        margin-bottom: 20px;
        background-color: #f3f9ff;
        border-radius: 3px;
        border: solid 1px #dae6f1;
        padding: 30px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      &-item:nth-child(2n+1) {
        margin-right: 20px;
      }
    }

  }
}

.satisfaction-1:hover{
  background: rgb(235,252,244);
  border-color: rgb(66,210,117);
}

.satisfaction-2:hover{
  background: #fdfbf5;
  border-color: #fec055;
}

.satisfaction-3:hover{
  background: rgb(253,245,245);
  border-color: rgb(248,137,124);
}







</style>
