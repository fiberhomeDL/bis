<template>
    <div class="lines-chart" ref="linesChart"></div>
</template>

<script>
    export default {
        name: "LinesChart",
        props: ['lengend', 'xAxisData', 'data'],
        mounted() {
            this.$nextTick(() => {
                this.initChart();
            });
        },
        methods:{
            // 初始化图
            initChart(){
                let myChart = this.$echarts.init(this.$refs.linesChart);
                let option = {
                    color: ['#86ebdc', '#ffc7b9', ' #ffcc55', ' #5ed2fd', '#babff4'],
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: '#fff',
                        borderColor: '#f5f6f8',
                        borderWidth: 2,
                        textStyle: {
                            color: '#575777'
                        },
                        axisPointer: {
                            type: 'line',
                            lineStyle: {
                                color: '#919dbd'
                            }
                        }
                    },
                    legend: {
                        itemHeight: 8,
                        itemWidth: 8,
                        itemGap: 10,
                        left: 8,
                        icon: 'circle',
                        textStyle: {
                            color: '#919dbd'
                        },
                        data: this.lengend
                    },
                    grid: {
                        x: 20,
                        x2: 20,
                        left: 14,
                        bottom: 0,
                        top: 40,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        axisTick: {
                            lineStyle: {
                                color: '#c1c5ca41',
                                alignWithLabel: true
                            }
                        },
                        splitLine: {show: false},
                        axisLine: {lineStyle: {color: 'rgba(0,0,0,0)'}},
                        axisLabel: {color: '#919dbd', fontSize: '11'},
                        boundaryGap: false,
                        data: this.xAxisData
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {show: false},
                        axisTick: {show: false},
                        splitLine: {lineStyle: {color: '#c1c5ca41', type: 'dashed'}},
                        axisLabel: {color: '#919dbd', fontSize: '11'}
                    },
                    series: this.data
                };
                myChart.setOption(option);
            }
        },
        watch:{
            data: {
                // 需要用到深度监视数据
                deep: true,
                handler() {
                    // 创建之前先销毁
                    this.$echarts.init(this.$refs.linesChart).dispose();
                    // 初始化
                    this.initChart();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '@css/style.scss';
    .lines-chart {
        width: 100%;
        height: 100%;
    }
</style>
