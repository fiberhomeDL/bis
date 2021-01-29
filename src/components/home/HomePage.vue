<template>
  <div class="home-page hw100-oh">
    <div class="home-page-head"></div>
    <div class="home-page-content">
      <div class="home-page-content-body">
        <div class="home-page-content-body-item">
          <div class="view-card">
            <div class="view-card-chart"></div>
            <div class="view-card-info">
              <div class="view-card-info-title">testPG</div>
              <div class="view-card-info-">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.home-page{
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
  justify-items: center;

  &-chart{
    width: 100%;
    overflow: hidden;
    padding: 26px 0 26px 26px;
  }

  &-info{
    width: 168px;
  }


}

</style>
