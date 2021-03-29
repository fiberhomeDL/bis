<template>
    <div class="progress-container" @click="selectItem(category)">
        <el-progress type="circle" :percentage=errorRate :show-text=false color="#ed5145"></el-progress>
        <div class="progress-content">
            <p class="progress-content-rate">{{errorRate}}%</p>
            <p class="progress-content-type">{{errorType}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ErrorRateProgress",
        props: ['errorType', 'category','errorRate'],
        methods: {
            // 选中该项
            selectItem(category) {
                this.$emit('show-detail', category);
            }
        }
    };
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.progress-container{
    display: inline-block;
    position: relative;
    text-align: center;
    width:150px;
    cursor: pointer;
    .progress-content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &-type {
            margin-top:16px;
            font-size: 13px;
            color: #575777;
        }
        &-rate {
            font-size: 24px;
            color: #ed5145;
        }
    }
}

</style>
