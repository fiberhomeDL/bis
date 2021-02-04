<template>
    <div class="progress-bar">
        <div v-for="(item,index) in data" class="bar-outer" :class="isActive == index ? 'active' : '' " @click="seletItem(index,item.id)">
            <div class="top-bar" v-show="index<5" :style="{background:color[index]}"></div>
            <div v-if="item.name.length>20" class="title">...{{item.name.substring(item.name.length-20)}}</div>
            <div v-else class="title">{{item.name}}</div>
            <div class="number">{{item.data}}</div>
            <div class="bar-inner" :style="{width:item.data/max*100+'%'}"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProgressBar",
        props: ['data'],
        data() {
            return {
                color: ['#ed5145', '#ffaf67', '#ffd943', '#86ebdc', '#7fd3fc'],
                isActive:0,
            }
        },
        methods: {
            // 选中该项
            seletItem(index,id) {
                this.isActive = index;
                this.$emit('show-detail', id);
            }
        },
        computed: {
            // 最大时间
            max: function () {
                return Math.max.apply(Math,this.data.map(item => { return item.data }));
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@css/style.scss';
    .progress-bar{
        width:100%;
        height: 100%;
        .bar-outer{
            width:100%;
            height:32px;
            margin-bottom: 12px;
            background-color: #f3f5f8;
            border-radius: 3px;
            color: #667085;
            cursor:pointer;
            border-top:solid 1px #f3f5f8;
            border-right:solid 1px #f3f5f8;
            border-bottom:solid 1px #f3f5f8;
            .top-bar{
                width:4px;
                height:100%;
                border-radius:3px 0 0 3px;
                float:left;
                z-index:999;
            }
            .bar-inner{
                height:100%;
                width:100px;
                background-color: #d6f6f2;
                border-radius:3px 0 0 3px;
                box-shadow: 0 2px 6px 0 rgba(222, 246, 253, 0.5);
            }
            .title{
                margin:8px 0 8px 8px;
                float:left;
            }
            .number{
                margin:8px;
                float:right;
            }
        }
        .bar-outer:last-child{
            margin-bottom:0;
        }
        .bar-outer:hover{
            border-top:solid 1px #00baff;
            border-right:solid 1px #00baff;
            border-bottom:solid 1px #00baff;
            .title, .number {
                font-weight: bold;
                color: #00baff;
            }
        }
        .active{
            border-top:solid 1px #00baff;
            border-right:solid 1px #00baff;
            border-bottom:solid 1px #00baff;
            .title, .number {
                font-weight: bold;
                color: #00baff;
            }
        }
        .bar-outer:nth-child(n+6){
            border-left:solid 1px #f3f5f8;
            .title{
                margin-left:12px;
            }
        }
        .bar-outer:nth-child(n+6):hover{
            border-left:solid 1px #00baff;
        }
        .bar-outer:nth-child(n+6).active{
            border-left:solid 1px #00baff;
        }
    }

</style>
