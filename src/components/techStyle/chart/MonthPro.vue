<template>
    <div class="echarts-class">
        <v-chart autoresize :option="option" style="width: 100%; height: 200px" ref="barEcharts" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            option: {
                legend: {
                    data: ['公交', '地铁', '步行', '骑行'],
                    left: 'right',
                    top: 'top',
                    itemWidth: 12,
                    itemHeight: 8,
                    textStyle: {
                        color: "#fff",
                        fontSize: 8
                    },
                },
                xAxis: {
                    data: ["第一周", "第二周", "第三周", "第四周"],
                    name: 'X Axis',
                },
                yAxis: {},
                series: [
                    {
                        name: '公交',
                        type: 'bar',
                        stack: 'one',
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0,0,0,0.3)'
                            }
                        },
                        data: [10, 20, 30, 40]
                    },
                    {
                        name: '地铁',
                        type: 'bar',
                        stack: 'one',
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0,0,0,0.3)'
                            }
                        },
                        data: [10, 20, 30, 40]
                    },
                    {
                        name: '步行',
                        type: 'bar',
                        stack: 'one',
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0,0,0,0.3)'
                            }
                        },
                        data: [10, 20, 30, 40]
                    },
                    {
                        name: '骑行',
                        type: 'bar',
                        stack: 'one',
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0,0,0,0.3)'
                            }
                        },
                        data: [10, 20, 30, 40]
                    }
                ]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.echarts-class {
    width: 100%;
    height: 100%;
}
</style>