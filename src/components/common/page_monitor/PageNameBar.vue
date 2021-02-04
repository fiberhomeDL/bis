<template>
    <div>
        <div v-for="(item,index) in data"
             :key="index"
             v-model="pageSelected">
            <div class="bar-out">
                <div class="top-bar" :style="{backgroundColor:barColor[index]}"></div>
                <div class="bar-area-inner">
                    <div class="bar-inner" :style="{width:data[index].data/maxTime*100+'%'}"></div>
                </div>
                <div v-if="item.name.length>22" class="font-page-name">...{{item.name.substring(item.name.length-22)}}</div>
                <div v-else class="font-page-name">{{item.name}}</div>
                <div class="font-page-data">{{item.data}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PageNameBar",
        props: ['data'],
        data() {
            return {
                // 选中页面
                pageSelected: '',
                barColor: ['#ed5145', '#ffaf67', '#ffd943', '#86ebdc', '#7fd3fc'],
            }
        },
        methods: {
        },
        computed: {
            // 最大时间
            maxTime: function () {
                return Math.max.apply(Math,this.data.map(item => { return item.data }));
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@css/style.scss';

    .bar-out {
        width: 258px;
        height: 32px;
        /*display: flex;*/
        background-color: #f3f5f8;
        border-radius: 3px;
        color: #667085;
        cursor: pointer;
        margin-bottom: 12px;
        .top-bar {
            width: 4px;
            height: 100%;
            background-color: #d6f6f2;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            float:left;
        }
        .bar-area-inner{
            width:calc(100% - 4px);
            height: 100%;
            .bar-inner {
                /*margin-left:4px;*/
                height: 100%;
                background-color: #d6f6f2;
                box-shadow: 0 2px 6px 0 rgba(222, 246, 253, 0.5);
                border-radius: 3px;
                float:left;
            }
        }
        .font-page-name {
            position: absolute;
            font-size: 14px;
            margin: 8px 8px 8px 14px;
            float:left;
        }

        .font-page-data {
            /*text-align: right;*/
            /*flex: 1;*/
            margin: 8px;
            float:right;
            z-index: 999;
        }
    }

    .bar-out:hover {
        border-top: solid 1px #00baff;
        border-right: solid 1px #00baff;
        border-bottom: solid 1px #00baff;

        .font-page-name, .font-page-data {
            font-weight: bold;
            color: #00baff;
        }
    }

</style>
