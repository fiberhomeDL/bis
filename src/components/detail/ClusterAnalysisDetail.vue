<template>
  <div class="ca-detail flex-column hw100-oh">
    <div class="ca-detail-header flex-row">
      <div class="ca-detail-header-left flex-row">
        <i class="el-icon-arrow-left"></i>
        <span class="back" @click="doBackClick">返回</span>
        <el-divider class="ca-detail-header-left-divider" direction="vertical"></el-divider>
        <span class="normal-text">Script error.</span>
      </div>
      <div class="">
        <time-picker></time-picker>
      </div>
    </div>
    <div class="ca-detail-wrapper hw100-oh">
      <div class="ca-detail-body hw100-oh">
        <div class="flex-row ca-detail-body-header">
          <el-divider class="ca-detail-body-header-divider"></el-divider>
          <span class="ca-detail-body-header-title">概况</span>
        </div>
        <div class="flex-row ca-detail-body-middle">
          <view-item-for-detail :view-item-data="v" :key="i" v-for="(v,i) in viewItemArr"></view-item-for-detail>
        </div>
        <div ca-detail-body-bottom>
          <el-table
              :data="new Array(10).fill(errorTableData.tableData[0],0,10)"
              style="width: 100%">
            <el-table-column
                v-for="(item,index) in errorTableData.tableHead"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                >
              <template slot-scope="scope">
                <img v-if="item.prop == 'browserType'" width="24" :src="require(`@img/terminal_icon/${scope.row[item.prop]}.svg`)" alt="">
                <img v-else-if="item.prop == 'os'" width="24" :src="require(`@img/terminal_icon/${scope.row[item.prop]}.svg`)" alt="">


                <span v-else>
                  {{scope.row[item.prop]}}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimePicker from "@/components/common/TimePicker";
import SubHeaderTitle from "@/components/common/SubHeaderTitle";
import ViewItemForDetail from "@/components/common/cluster_analysis/ViewItemForDetail";
export default {
  name: "ClusterAnalysisDetail.vue",
  components: {
    TimePicker,
    SubHeaderTitle,
    ViewItemForDetail
  },
  data(){
    return {
      viewItemArr: [
        {
          name: '总发生',
          value: '5002',
          imgUrl: require('@img/common_icon/error_big.svg'),
          mainColor: '#fe9289',
          shadowStyle: {
            boxShadow: '0px 4px 10px 4px #fdcabf',
            borderRadius: '25px'
          },
        },
        {
          name: '影响用户',
          value: '2483',
          imgUrl: require('@img/common_icon/mumber.svg'),
          mainColor: '#75e7d6',
        },
        {
          name: '出现次数最多',
          value: '2483',
          imgUrl: require('@img/terminal_icon/chrome.svg'),
          mainColor: '#72b5fa',
          borderColor: 'white',
          imgSize: 66,
        },
        {
          name: '出现次数最多',
          value: '2483',
          imgUrl: require('@img/terminal_icon/windows.svg'),
          mainColor: '#37dcff',
          borderColor: 'white',
          imgSize: 60,

        }
      ],
      errorTableData: {
        tableHead: [
          {
            prop: 'errorInfo',
            label: '错误信息',
            // width: '300'
          },
          {
            prop: 'page',
            label: '页面'
          },
          {
            prop: 'ip',
            label: '用户IP地址',
            width: '160'
          },
          {
            prop: 'browserType',
            label: '浏览器类型',
            width: '120'
          },
          {
            prop: 'browserVersion',
            label: '浏览器版本',
            width: '160'
          },
          {
            prop: 'os',
            label: '操作系统',
            width: '120'
          },
          {
            prop: 'osVersion',
            label: '操作系统版本',
            width: '160'
          },
          {
            prop: 'time',
            label: '发生时间',
            width: '160'
          },
        ],
        tableData: [
          {
            errorInfo: 'UncaughtInPromiseError: r[t] is not a function',
            page:'index.html',
            ip: '10.0.23.78',
            browserType: 'google',
            browserVersion: '73.0',
            os: 'windows',
            osVersion: 'win10',
            time: '2021-01-07 13:51:37'
          }
        ]
      }
    }
  },
  methods: {
    doBackClick(){
      this.$emit('change-content',{
        from: 'ClusterAnalysisDetail',
        to: 'ClusterAnalysis'
      })
    }
  }
}
</script>

<style lang="scss">
@import '@css/style.scss';
.ca-detail{
  .back{
    cursor: pointer;
  }

  font-size: 14px;
  &-header{
    background: white;
    min-height: 52px;
    box-shadow: 0px 4px 8px 0px #b7c4e0;
    padding: 0 24px;
    justify-content: space-between;
    align-items: center;

    &-left{
      color: #919dbd;
      align-items: center;

      &-divider{
        margin: 0 14px;
      }
    }
  }
  &-wrapper{
    padding: 20px;
  }
  &-body{
    background: #fff;
    padding: 32px;
    overflow-y: auto;

    &-header{
      align-items: center;
      &-divider{
        width: 4px;
        height: 13px;
        background-color: #00baff;
        //margin-right: 8px;
        margin: 0 8px 0 0;
      }

      &-title{
        font-size: 16px;
        color: #505b73;
      }
    }
    &-middle{
      padding: 30px 0;
      justify-content: space-around;
      align-items: center;
    }
  }


  .el-table th{
    background: #def2ff;
  }

  .el-table .cell{
    color: #575777;
  }
}

</style>
