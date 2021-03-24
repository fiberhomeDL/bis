<template>
  <div class="home-page hw100-oh"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
  >
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
      <div class="home-page-content-body" :class="{'nodata': appInfoByFilter.length === 0}" ref="pdfContent">
<!--        拼写满意度样式名称-->
        <div v-for="(value, index) in appInfoByFilter"
             :key="index"
             :class="[
                'home-page-content-body-item',
                'satisfaction-'+value.satisfaction,
                appInfoByFilter.length === 0 ? 'nodata' : ''
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
import httpReq from '@js/homePage';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';

export default {
  name: "HomePage",
  components: {
    SatisfactionTag,
    ViewCard,
    DownloadButton
  },
  data(){
    return {
      loading: false,
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
      appInfo: []
    };
  },
  methods: {
    doDownLoad(){
      window.pageXOffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      let target = this.$refs.pdfContent;;
      html2canvas(target, { dpi: 172 }).then(function(canvas) {
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        //一页pdf显示html页面生成的canvas高度;
        let pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        let leftHeight = contentHeight;
        //pdf页面偏移
        let position = 0;
        //html页面生成的canvas在pdf中图片的宽高（a4纸的尺寸[595.28,841.89]）
        let imgWidth = 595.28;
        let imgHeight = 592.28 / contentWidth * contentHeight;

        let pageData = canvas.toDataURL('image/jpeg', 1.0);
        let pdf = new jsPDF('', 'pt', 'a4');

        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            //避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage();
            }
          }
        }
        pdf.save('应用.pdf');
      });
    },
    doServiceClick(value){
      this.$store.commit('changeSelectedServiceId',value.id);
      this.$router.push({
        name: 'Detail',
        query: {
          id: value.id,
          name: value.name
        }
      });
    }
  },
  computed:{
    //绑定筛选条件 前端动态筛选
    appInfoByFilter(){
      //是否启用满意度筛选
      let satisfactionSelectFlag = this.satisfactionSelect == 0;
      return this.appInfo.filter(item=>{
        return item.name.includes(this.searchInput) && (satisfactionSelectFlag || item.satisfaction == this.satisfactionSelect);
      });
    }
  },
  created() {
    //获取应用信息
    this.$nextTick(()=>{
      this.loading = true;
      httpReq.init().then(data => {
        this.appInfo = data;
        this.loading = false;
      });
    });
  }
};
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
