<template>
    <div class="number-block">
        <div v-for="(item,index) in dataArr" class="number-block-bk">
            <div class="number-block-data">{{item}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NumberBlock",
        props: ['data'],
        computed: {
            // 将数据转换为数组
            dataArr: function () {
                return this.data.toString().split("");
            }
        }
    };
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
    .number-block{
        width:100%;
        height: 100%;
        .number-block-bk{
            width: 36px;
            height: 65px;
            position: relative;
            margin-right: 4px;
            background-color: #f3fafd;
            display: inline-block;
            .number-block-data{
                font-size: 56px;
                color: #37cbf9;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .number-block-bk:last-child{margin-right: 0;}
    }

</style>
