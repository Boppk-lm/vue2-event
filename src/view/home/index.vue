<template>
    <div>
        <!-- 头部 -->
        <div class="container-head">
            <el-row :gutter="10">
                <el-col :sm="6" :xs="12">
                    <div class="spannel">
                        <em>10015</em><span>篇</span>
                    <b>总文章数</b>
                    </div>
                </el-col>
                <el-col :sm="6" :xs="12">
                    <div class="spannel color1">
                        <em>123</em><span>篇</span>
                    <b>日新增文章数</b>
                    </div>
                </el-col>
                <el-col :sm="6" :xs="12">
                    <div class="spannel color2">
                        <em>35</em><span>条</span>
                    <b>评论总数</b>
                    </div>
                </el-col>
                <el-col :sm="6" :xs="12">
                    <div class="spannel color3">
                        <em>123</em><span>条</span>
                    <b>日新增评论数</b>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 主体 -->
         <div class="container-main">
            <el-row :gutter="10">
                <el-col :sm="16" :xs="16">
                    <div class="gragh_pannel" id="curve_show">
                    </div>
                </el-col>
                <el-col :sm="8" :xs="8">
                    <div class="gragh_pannel" id="pie_show">
                    </div>
                </el-col>
            </el-row>
         </div>
         <!-- 底部 -->
          <div class="container-foot">
            <div class="column_pannel" id="column_show"></div>
          </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'my-home',
  mounted () {
    // 初始化折线图
    this.initCurveFn()
    // 初始化饼图
    this.initPieFn()
    // 初始化柱状图
    this.initColumnFn()
  },
  methods: {
    // 折线图
    initCurveFn () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('curve_show'))
      // 指定图表的配置项和数据
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    // 饼图
    initPieFn () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('pie_show'))
      // 指定图表的配置项和数据
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    // 柱状图
    initColumnFn () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('column_show'))
      // 指定图表的配置项和数据
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Email',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Search Engine',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            emphasis: {
              focus: 'series'
            },
            markLine: {
              lineStyle: {
                type: 'dashed'
              },
              data: [[{ type: 'min' }, { type: 'max' }]]
            }
          },
          {
            name: 'Baidu',
            type: 'bar',
            barWidth: 5,
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: 'Google',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: 'Bing',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: 'Others',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
.container-head {
    .spannel {
    line-height: 90px;
    text-align: center;
    background-color: #ffffff;
    color: #7fa3ee;
    em {
        font-style: normal;
        font-size: 46px;
        font-weight: 500;
    }
    span {
        margin: 7px;
    }
    b {
        line-height: 25px;
        display: block;
        background-color: #e5e5e5;
        color: #000;
        font-weight: normal;
    }
}
.color1 {
        color: #66bbd9;
    }
    .color2 {
        color: #58cbde;
    }
    .color3 {
        color: #53c291;
    }
}
.container-main {
    margin-top: 20px;
    .gragh_pannel{
        height: 500px;
        background-color: #fff;
    }
}
.container-foot {
    .column_pannel{
        margin-top: 20px;
        height: 250px;
        background-color: #fff;
    }
}
</style>
