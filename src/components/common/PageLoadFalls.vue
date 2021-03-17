<template>
    <div class="load-falls">
        <div v-for="(item,index) in data"
             :key="index">
            <div class="load-falls-item">
                <div class="load-falls-item-title">{{item.title}}</div>
                <div class="load-falls-item-bar">
                    <div class="load-falls-item-bar_inner"
                         :style="{backgroundColor: barColor[index],width:data[index].consumeTime/totalTime*100+'%',left:data[index].startTime*100/totalTime+'%', background: item.consumeTime===0?'transparent':'default'}">
                    </div>
                </div>
                <div class="load-falls-item-time">
                    <span>{{item.consumeTime}}ms</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PageLoadFalls",
        props: ['data'],
        data() {
            return {
                // 颜色
                barColor: ['#ffc7b9', '#fee5ac', '#fbd1ab', '#86ebdc', '#a1d9f5', '#c2d0fc', '#e1c9f7']
            }
        },
        computed: {
            // 计算总耗时
            totalTime: function () {
                let result = 0;
                for (let i in this.data) {
                    result += this.data[i].consumeTime;
                }
                result -= this.data[2].consumeTime;
                return result;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '@css/style.scss';

    .load-falls {
        width: 100%;
        height: 100%;

        &-item {
            display: flex;
            margin-bottom: 20px;

            &-title {
                width: 180px;
                color: #575777;
                text-align: right;
            }

            &-bar {
                width: calc(100% - 216px);
                height: 8px;
                margin: 0 12px;

                .load-falls-item-bar_inner {
                    height: 8px;
                    border-radius: 2px;
                    position: relative;
                }
            }

            &-time {
                width: 50px;
                float: right;
                text-align: right;
            }
        }
    }

</style>
