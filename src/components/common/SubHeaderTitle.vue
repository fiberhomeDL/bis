<template>
  <div class="sub-header-title primary-text">
    <div class="sub-header-title-border"></div>
    <span class="sub-header-title-sub">{{subTitle}}</span>
    <span class="sub-header-title-remark">{{remark}}</span>
    <div class="sub-header-title-option">
      <slot name="option">
      </slot>
    </div>

  </div>
</template>

<script>
export default {
name: "SubHeaderTitle",
props: ['subTitle','remark']
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.sub-header-title{
  line-height: 28px;
  background-color: #f3fafd;
  padding: 0 4px;
  display: flex;
  align-items: center;

  &-border{
   background: #00baff;
   width: 4px;
   height: 13px;
 }

  &-sub{
    font-size: 16px;
  }
  &-remark{
    color: #919dbd;
    font-size: 16px;
  }
  &-sub{
    padding-left: 8px;
  }

  &-remark{
    position: relative;
    top: 1px;
    padding-left: 6px;
  }

  &-option{
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

</style>
