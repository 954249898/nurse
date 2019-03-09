<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chartOrder" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartTest" style="width:100%; height:400px;"></div>
            </el-col>
            <!-- <el-col :span="12">
                <div id="chartAge" style="width:100%; height:400px;"></div>
            </el-col> -->
            <!-- <el-col :span="12">
                <div id="chartSalary" style="width:100%; height:400px;"></div>
            </el-col> -->
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                chartOrder: null,
                chartAge: null,
                chartTest: null,
                chartSalary: null
            }
        },
        methods: {
            drawColumnChart() {
                this.chartOrder = echarts.init(document.getElementById('chartOrder'));
                this.chartOrder.setOption({
                    title: {
                        text: '年龄统计'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ["25岁以下", "25岁-30岁", "30岁-45岁", "45岁-50岁", "50岁以上"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [15, 20, 36, 10, 40]
                    }]
                });
            },
            drawAgeChart() {
                this.chartAge = echarts.init(document.getElementById('chartAge'));
                this.chartAge.setOption({
                    title: {
                        text: '月薪分布图',
                        subtext: '纯属虚构',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [{
                                value: 335,
                                name: '直接访问'
                            },
                            {
                                value: 310,
                                name: '邮件营销'
                            },
                            {
                                value: 234,
                                name: '联盟广告'
                            },
                            {
                                value: 135,
                                name: '视频广告'
                            },
                            {
                                value: 1548,
                                name: '搜索引擎'
                            }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
            },
            drawSalaryChart() {
                this.chartTest = echarts.init(document.getElementById('chartTest'));
                this.chartTest.setOption({
                    title: {
                        text: '月薪分布图',
                        subtext: '纯属虚构',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['2k以下', '2k-3k', '3k-5k', '5k-8k', '8k以上']
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [{
                                value: 335,
                                name: '2k以下'
                            },
                            {
                                value: 310,
                                name: '2k-3k'
                            },
                            {
                                value: 234,
                                name: '3k-5k'
                            },
                            {
                                value: 135,
                                name: '5k-8k'
                            },
                            {
                                value: 1548,
                                name: '8k以上'
                            }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
            },
            drawPieChart() {
                this.chartSalary = echarts.init(document.getElementById('chartSalary'));
                this.chartSalary.setOption({
                    title: {
                        text: '月薪分布图',
                        subtext: '纯属虚构',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [{
                                value: 335,
                                name: '直接访问'
                            },
                            {
                                value: 310,
                                name: '邮件营销'
                            },
                            {
                                value: 234,
                                name: '联盟广告'
                            },
                            {
                                value: 135,
                                name: '视频广告'
                            },
                            {
                                value: 1548,
                                name: '搜索引擎'
                            }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
            },
            drawCharts() {
                this.drawColumnChart()
                // this.drawAgeChart()
                this.drawSalaryChart()
                // this.drawPieChart()
            },
        },
        mounted: function() {
            this.drawCharts()
        },
        updated: function() {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
            height: 400px;
            float: left;
        }*/
    .el-col {
        padding: 30px 20px;
    }
</style>
