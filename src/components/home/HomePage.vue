<template>
  <div class="home-page">
    <div class="home-page-head">
      <div class="home-page-head-input">
        <el-input
            placeholder="请输入应用名称"
            suffix-icon="el-icon-search"
            size="small"
            v-model="searchInput">
        </el-input>
      </div>
      <div class="home-page-head-radio">
        <span class="home-page-head-radio-title">状态</span>
        <el-radio v-for="(item,index) in satisfactionData"
                  :key="index"
                  class="home-page-head-radio-item"
                  v-model="satisfactionSelect"
                  :label="item.label">{{ item.title }}</el-radio>
      </div>
      <div class="home-page-head-option">
        <span class="home-page-head-option-download"></span>
            <download-button @click="clickDownLoad"></download-button>
      </div>
    </div>
    <div class="home-page-content">
      <div class="home-page-content-body">
        <div class="home-page-content-body-item">
          <div class="view-card">
            <div class="view-card-chart"></div>
            <div class="view-card-info">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DownloadButton from "@c/common/DownloadButton";
export default {
  name: "HomePage",
  components: {
    DownloadButton
  },
  data(){
    return {
      //搜索文本
      searchInput: '',
      //满意度数据源配置
      satisfactionData:[
        {
          'title': '全部',
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
      //满意度筛选选择项
      satisfactionSelect: '1',
      appInfo: [
        {
          name: 'testPG',
          satisfaction: '1',
          vp: 212309,
          uv: 59,
          error: 5,
          warning: 14,
          sys: '98%'
        },
        {
          name: 'testPG',
          satisfaction: '2',
          vp: 212309,
          uv: 59,
          error: 5,
          warning: 14,
          sys: '98%'
        },
        {
          name: 'testPG',
          satisfaction: '3',
          vp: 212309,
          uv: 59,
          error: 5,
          warning: 14,
          sys: '98%'
        },
      ]


    }
  },
  methods: {
    clickDownLoad(){
      //todo 下载事件
      alert('do download')
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
      border-radius: 4px;
      padding: 24px 24px 4px;

      &-item{
        display: inline-block;
        width: calc(50% - 14px);
        height: 268px;
        margin-bottom: 20px;
        background-color: #f3f9ff;
        border-radius: 3px;
        border: solid 1px #dae6f1;
      }

      &-item:nth-child(2n+1) {
        margin-right: 20px;
      }
    }

  }
}


.view-card{
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;

  &-chart{
    width: 100%;
  }

  &-info{
    width: 150px;
  }


}

</style>
