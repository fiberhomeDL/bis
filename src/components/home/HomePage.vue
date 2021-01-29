<template>
  <div class="home-page hw100-oh">
    <div class="home-page-head">
      <div class="home-page-head-input">
        <el-input
            placeholder="请输入应用名称"
            suffix-icon="el-icon-search"
            size="small"
            v-model.trim="searchInput">
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
        <div :class="['home-page-content-body-item','satisfaction-'+value.satisfaction]" v-for="(value, index) in appInfoByFilter" :key="index">
          <div :class="'tag-satisfactionSelect tag-satisfactionSelect-' + value.satisfaction">{{ value.satisfactionSelectName }}</div>
          <view-card :info="value"></view-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DownloadButton from "@c/common/DownloadButton";
import ViewCard from "@/components/home/ViewCard";
export default {
  name: "HomePage",
  components: {
    ViewCard,
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
      satisfactionSelect: '0',
      appInfo: [
        {
          name: 'testPG1',
          satisfaction: '1',
          satisfactionSelectName: '满意',
          infoData: [
            {
              title: '访问量',
              value: '21239',
              icon: require('@img/common_icon/views.svg')
            },
            {
              title: '用户量',
              value: '59位',
              icon: require('@img/common_icon/subscribers.svg')
            },
            {
              title: '错误数',
              value: '5个',
              icon: require('@img/common_icon/error.svg')
            },
            {
              title: '警告数',
              value: '14个',
              icon: require('@img/common_icon/warning.svg')
            },
            {
              title: '性能指数',
              value: '99%',
              icon: require('@img/common_icon/performance.svg')
            },
          ],
        },
        {
          name: 'testPG2',
          satisfaction: '2',
          satisfactionSelectName: '一般',
          infoData: [
            {
              title: '访问量',
              value: '21239',
              icon: require('@img/common_icon/views.svg')
            },
            {
              title: '用户量',
              value: '59位',
              icon: require('@img/common_icon/subscribers.svg')
            },
            {
              title: '错误数',
              value: '5个',
              icon: require('@img/common_icon/error.svg')
            },
            {
              title: '警告数',
              value: '14个',
              icon: require('@img/common_icon/warning.svg')
            },
            {
              title: '性能指数',
              value: '99%',
              icon: require('@img/common_icon/performance.svg')
            },
          ],
        },
        {
          name: 'testPG3',
          satisfaction: '3',
          satisfactionSelectName: '不满意',
          infoData: [
            {
              title: '访问量',
              value: '21239',
              icon: require('@img/common_icon/views.svg')
            },
            {
              title: '用户量',
              value: '59位',
              icon: require('@img/common_icon/subscribers.svg')
            },
            {
              title: '错误数',
              value: '5个',
              icon: require('@img/common_icon/error.svg')
            },
            {
              title: '警告数',
              value: '14个',
              icon: require('@img/common_icon/warning.svg')
            },
            {
              title: '性能指数',
              value: '99%',
              icon: require('@img/common_icon/performance.svg')
            },
          ],
        },
      ]


    }
  },
  methods: {
    clickDownLoad(){
      //todo 下载事件
      alert('do download')
    }
  },
  computed:{
    appInfoByFilter(){
      return this.appInfo.filter(item=>{
        return item.name.includes(this.searchInput);
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

.tag-satisfactionSelect{
  position: absolute;
  color: white;
  line-height: 26px;
  width: 100px;
  text-align: center;
  transform: rotate(45deg);
  //right: -30px;
  //top: 6px;
  right: -25px;
  top: 12px;
  &-1{
    background: #42d275;
  }
  &-2{
    background: #fec055;
  }
  &-3{
    background: rgb(248,137,124);
  }
}








</style>
