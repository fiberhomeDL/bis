<template>
    <div class="progress-bar">
        <div v-for="(item,index) in data" class="bar-outer"
             :class="(isActiveIndex === index) ? 'active' : '' "
             @click="selectItem(index,item)">
            <div class="top-bar" v-show="index<5" :style="{background:color[index]}"></div>
            <div class="title rtl-text">&#x200E;{{item.name}}&#x200E;</div>
            <div class="number">{{item.value}}</div>
            <div class="bar-inner" :style="{width:item.value/max*100+'%'}"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProgressBar",
        props: {
            // 传入数据
            'data': Array,
            // 选中数据项序号
            'selectedItemIndex': {
                default: 0
            }
        },
        data() {
            return {
                // Top5左侧边颜色
                color: ['#ed5145', '#ffaf67', '#ffd943', '#86ebdc', '#7fd3fc'],
                // 活跃条目序号
                isActiveIndex: this.selectedItemIndex
            }
        },
        methods: {
            // 选中该项
            selectItem(index, item) {
                this.isActiveIndex = index;
                this.$emit('selectItem', item);
            }
        },
        computed: {
            // 最大时间
            max: function () {
                return Math.max.apply(Math, this.data.map(item => {
                    return item.value;
                }));
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@css/style.scss';

    .progress-bar {
        width: 100%;

        .bar-outer {
            width: 100%;
            height: 34px;
            margin-bottom: 12px;
            background-color: #f3f5f8;
            border-radius: 3px;
            color: #667085;
            cursor: pointer;
            border-top: solid 1px #f3f5f8;
            border-right: solid 1px #f3f5f8;
            border-bottom: solid 1px #f3f5f8;

            .top-bar {
                width: 4px;
                height: 100%;
                border-radius: 3px 0 0 3px;
                float: left;
                z-index: 999;
            }

            .bar-inner {
                height: 100%;
                background-color: #d6f6f2;
                border-radius: 3px 0 0 3px;
                box-shadow: 0 2px 6px 0 rgba(222, 246, 253, 0.5);
            }

            .title {
                max-width: calc(100% - 64px);
                margin: 8px;
                float: left;
                line-height: 18px;
            }

            .number {
                max-width: 36px;
                margin: 8px 8px 8px 0;
                float: right;
                line-height: 18px;
            }
        }

        .bar-outer:last-child {
            margin-bottom: 0;
        }

        .bar-outer:hover {
            border-top: solid 1px #00baff;
            border-right: solid 1px #00baff;
            border-bottom: solid 1px #00baff;

            .title, .number {
                font-weight: bold;
                color: #00baff;
            }
        }

        .active {
            border-top: solid 1px #00baff;
            border-right: solid 1px #00baff;
            border-bottom: solid 1px #00baff;

            .title, .number {
                font-weight: bold;
                color: #00baff;
            }
        }

        .bar-outer:nth-child(n+6) {
            border-left: solid 1px #f3f5f8;

            .title {
                margin-left: 12px;
            }
        }

        .bar-outer:nth-child(n+6):hover {
            border-left: solid 1px #00baff;
        }

        .bar-outer:nth-child(n+6).active {
            border-left: solid 1px #00baff;
        }
    }

    .rtl-text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        direction: rtl;
    }

</style>
