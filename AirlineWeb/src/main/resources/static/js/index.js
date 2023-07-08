// 立即执行函数，防止变量污染 (function() {})();

// 柱状图模块1
//航空公司航班情况
(function () {
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar .chart"));
    // 2.指定配置项和数据

    $.getJSON("/airportavegeprice", function (values) {
        console.log(values)
        var xdata = []
        var ydata = []
        var zdata = []
        var xdata1 = []
        var ydata1 = []
        var zdata1 = []
        var yuefen = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        for (var i = 0; i < values.length; i++) {
            //
            xdata.push(values[i]["Months_of_price"])
            ydata.push(values[i]["everymoths_of_day"])
            zdata.push(((values[i]["Date_of_total_Price"]) / (values[i]["everymoths_of_day"])).toFixed(2))
            // zdata.push(values[i]["Date_of_total_Price"])
        }
        var n = 0
        for (var i = 0; i < yuefen.length; i++) {
            // var t = '0'+i
            if (xdata.indexOf(yuefen[i]) == -1) {
                xdata1.push(yuefen[i])
                ydata1.push(0)
                zdata1.push(0)
            } else {
                xdata1.push(values[n]["Months_of_price"])
                ydata1.push(values[n]["everymoths_of_day"])
                zdata1.push(((values[n]["Date_of_total_Price"]) / (values[n]["everymoths_of_day"])).toFixed(2))
                n++
            }
        }

        console.log(xdata)
        console.log(ydata)
        console.log(xdata1)
        console.log(ydata1)
        var option = {
            legend: {
                // 当serise 有name值时， legend 不需要写data
                // 修改图例组件文字颜色
                textStyle: {
                    color: '#4c9bfd'
                },
                right: '10%',
            },

            color: ['#00f2f1', '#ed3f35'],
            // 提示框组件
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            // 修改图表位置大小
            grid: {
                left: '0%',
                top: '10px',
                right: '0%',
                bottom: '4%',
                containLabel: true
            },
            // x轴相关配置
            xAxis: [{
                type: 'category',
                // data: ["旅游行业", "教育培训", "游戏行业", "医疗行业", "电商行业", "社交行业", "金融行业"],
                data: xdata1,
                axisTick: {
                    alignWithLabel: true
                },
                // 修改刻度标签，相关样式
                axisLabel: {
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 10
                },
                // x轴样式不显示
                axisLine: {
                    show: false
                }
            }],
            // y轴相关配置
            yAxis: [{
                type: 'value',
                // 修改刻度标签，相关样式
                axisLabel: {
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 12
                },
                // y轴样式修改
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,0.6)",
                        width: 2
                    }
                },
                // y轴分割线的颜色
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,0.1)"
                    }
                }
            }],
            // 系列列表配置
            series: [{
                name: '航班数',
                type: 'bar',
                barWidth: '35%',
                // ajax传动态数据
                // data: [200, 300, 300, 900, 1500, 1200, 600],
                data: ydata1,
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5
                }
            },
                {
                    type: 'bar',
                    barWidth: '35%',
                    smooth: true, //
                    name: '平均价格',
                    data: zdata1,
                    itemStyle: {
                        // 修改柱子圆角
                        barBorderRadius: 5
                    }
                },
            ]

        };
        // 3.把配置项给实例对象
        myChart.setOption(option);

        // 4.让图表随屏幕自适应
        window.addEventListener('resize', function () {
            myChart.resize();
        })


        /* // 5.点击切换2020 和 2021 的数据
         $('.bar h2 a').on('click', function () {
             // console.log($(this).index());
             // 点击a 之后 根据当前a的索引号 找到对应的 yearData 相关对象
             // console.log(yearData[$(this).index()]);
             var obj = yearData[$(this).index()];
             option.series[0].data = obj.data[0];
             option.series[1].data = obj.data[1];
             // 选中年份高亮
             $('.bar h2 a').removeClass('a-active');
             $(this).addClass('a-active');

             // 需要重新渲染
             myChart.setOption(option);
         })*/



    })
})();
// 柱状图模块2
(function () {
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    $.getJSON("/the_Airline", function (values) {
        console.log(values)
        var xdata = []
        var ydata = []
        var totalariport = 0;
        var zdata = []//记录占比

        for (var i = 0; i < values.length; i++) {
            xdata.push((values[i]["Airline_of_Journey"]))
            ydata.push(parseInt(values[i]["Airlinecount_of_journey"]))
            totalariport = totalariport + parseInt(values[i]["Airlinecount_of_journey"])
        }
        for (var i = 0; i < values.length; i++) {
            zdata.push(parseInt((parseInt(values[i]["Airlinecount_of_journey"]) / totalariport)*100))
        }
        // 声明颜色数组
        var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
        // 2.指定配置项和数据
        var option = {
            grid: {
                top: "10%",
                left: '22%',
                bottom: '10%',
                // containLabel: true
            },
            xAxis: {
                // 不显示x轴相关信息
                show: false
            },
            yAxis: [{
                type: 'category',
                // y轴数据反转，与数组的顺序一致
                inverse: true,
                // 不显示y轴线和刻度
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                // 将刻度标签文字设置为白色
                axisLabel: {
                    color: "#fff"
                },
                // data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"]
                data: xdata
            }, {
                // y轴数据反转，与数组的顺序一致
                inverse: true,
                show: true,
                // 不显示y轴线和刻度
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                // 将刻度标签文字设置为白色
                axisLabel: {
                    color: "#fff"
                },
                // data: [702, 350, 610, 793, 664]
                data : ydata
            }],
            series: [{
                // 第一组柱子（条状）
                name: '条',
                type: 'bar',
                // 柱子之间的距离
                barCategoryGap: 50,
                // 柱子的宽度
                barWidth: 10,
                // 层级 相当于z-index
                yAxisIndex: 0,
                // 柱子更改样式
                itemStyle: {
                    barBorderRadius: 20,
                    // 此时的color可以修改柱子的颜色
                    color: function (params) {
                        // params 传进来的是柱子的对象
                        // dataIndex 是当前柱子的索引号
                        // console.log(params);
                        return myColor[params.dataIndex];
                    }
                },
                // data: [70, 34, 60, 78, 69],
                data:zdata,
                // 显示柱子内的百分比文字
                label: {
                    show: true,
                    position: "inside",
                    // {c} 会自动解析为数据（data内的数据）
                    formatter: "{c}%"
                }
            },
                {
                    // 第二组柱子（框状 border）
                    name: '框',
                    type: 'bar',
                    // 柱子之间的距离
                    barCategoryGap: 50,
                    // 柱子的宽度
                    barWidth: 14,
                    // 层级 相当于z-index
                    yAxisIndex: 1,
                    // 柱子修改样式
                    itemStyle: {
                        color: "none",
                        borderColor: "#00c1de",
                        borderWidth: 2,
                        barBorderRadius: 15,
                    },
                    data: [100, 100, 100, 100, 100]
                }
            ]
        };
        // 3.把配置项给实例对象
        myChart.setOption(option);

        // 4.让图表随屏幕自适应
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    })
})();

// 折线图模块1
(function () {
    var myChart = echarts.init(document.querySelector(".line .chart"));
    // 月份对应数据
    var xdata12 = []
    var ydata12 = []
    var zdata12 = []

    $.getJSON("/everydayairport", function (values) {
        console.log(values)
        var xdata = []
        var ydata = []
        var xdata1 = []
        var ydata1 = []
        var zdata1 = []
        var DYAS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'
            , '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        var zdata = []//记录平局价格

        for (var i = 0; i < values.length; i++) {
            xdata.push(values[i]["Everyday_of_Mouths"])
            ydata.push(values[i]["everymoths_of_tooal"])
            zdata.push((((values[i]["everyday_of_avePrice"]) / (values[i]["everymoths_of_tooal"]))  / 10).toFixed(2))
        }
        var n = 0
        // let result = ""; //定义一个空字符串
        for (var i = 0; i < DYAS.length; i++) {
            // // var t = '0'+i
            // if(i < 10){
            // result = "0" + i;
            if (xdata.indexOf(DYAS[i]) == -1) {
                xdata1.push(DYAS[i])
                ydata1.push(0)
                zdata1.push(0)
            } else {
                xdata1.push(values[n]["Everyday_of_Mouths"])
                ydata1.push(values[n]["everymoths_of_tooal"])
                zdata1.push((((values[n]["everyday_of_avePrice"]) / (values[n]["everymoths_of_tooal"])) / 10).toFixed(2))
                n++
            }
        }
        console.log(xdata)
        console.log(ydata)
        console.log(zdata)
        console.log(xdata1)
        console.log(ydata1)
        console.log(zdata1)
        ydata12 = ydata1
        zdata12 = zdata1
        console.log(ydata12)
        console.log(zdata12)
        // yearData[0].data = [ydata1,zdata1]


        var yearData = [{
            year: "三月",
            data : [ydata12,
                zdata12]
        },
            {
                year: "四月",
                data : 0
            },
            {
                year: "五月",
                data : 0
            },
            {
                year: "六月",
                data : 0
            },
        ]
        var option = {
            // 修改两条线的颜色
            color: ['#00f2f1', '#ed3f35'],
            tooltip: {
                trigger: 'axis'
            },
            // 图例组件
            legend: {
                // 当serise 有name值时， legend 不需要写data
                // 修改图例组件文字颜色
                textStyle: {
                    color: '#4c9bfd'
                },
                right: '10%',
            },
            grid: {
                top: "20%",
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
                show: true, // 显示边框
                borderColor: '#012f4a' // 边框颜色
            },
            xAxis: {
                type: 'category',
                boundaryGap: false, // 去除轴间距
                name:"/号",
                data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'
                    , '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
                // 去除刻度线
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#4c9bfb", // x轴文本颜色
                    show: true,
                    inside: false,
                    rotate: 60,
                    margin: 8
                },
                axisLine: {
                    show: false // 去除轴线
                }
            },
            yAxis: {
                type: 'value',
                name:"航班数-价格（/10元）",
                // 去除刻度线
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#4c9bfb" // x轴文本颜色
                },
                axisLine: {
                    show: false // 去除轴线
                },
                splitLine: {
                    lineStyle: {
                        color: "#012f4a"
                    }
                }
            },
            series: [{
                type: 'line',
                smooth: true, // 圆滑的线
                name: '航班数',
                data: yearData[0].data[0]
            },
                {
                    type: 'line',
                    smooth: true, // 圆滑的线
                    name: '平均价格',
                    data: yearData[0].data[1]
                }
            ]
        };

        myChart.setOption(option);

        // 4.让图表随屏幕自适应
        window.addEventListener('resize', function () {
            myChart.resize();
        })
        function everymouthsData(url,xName,YValue,zValue,v) {
            $.getJSON(url, function (values) {
                console.log(values)
                var xdata = []
                var ydata = []
                var zdata = []
                var xdata1 = []
                var ydata1 = []
                var zdata1 = []
                var DYAS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'
                    , '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
                for (var i = 0; i < values.length; i++) {
                    xdata.push(values[i][xName])
                    ydata.push(values[i][YValue])
                    zdata.push((((values[i][zValue]) / (values[i][YValue])) / 10).toFixed(2))
                }
                var n = 0
                // let result = ""; //定义一个空字符串
                for (var i = 0; i < DYAS.length; i++) {
                    if (xdata.indexOf(DYAS[i]) == -1) {
                        xdata1.push(DYAS[i])
                        ydata1.push(0)
                        zdata1.push(0)
                    } else {
                        xdata1.push(values[n][xName])
                        ydata1.push(values[n][YValue])
                        zdata1.push((((values[n][zValue]) / (values[n][YValue]))/ 10).toFixed(2))
                        n++
                    }
                }

                console.log(xdata)
                console.log(ydata)
                console.log(zdata)
                console.log(xdata1)
                console.log(ydata1)
                console.log(zdata1)
                yearData[v].data = [ydata1,zdata1]

            })
        }
        everymouthsData("/everydayairport","Everyday_of_Mouths","everymoths_of_tooal", "everyday_of_avePrice",0)
        everymouthsData("/everyday_of_april","Everyday_of_April","April_of_tooal", "April_of_avePrice",1)
        everymouthsData("/everyday_of_may","Everyday_of_May","May_of_tooal", "May_of_avePrice",2)
        everymouthsData("/everyday_of_june","Everyday_of_June","June_of_tooal", "June_of_avePrice",3)

        // var yearData = [{
        //     year: "三月", // 年份
        //     data: [
        //         // 两个数组是因为有两条线
        //         [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        //         [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        //     ]
        // },
        //     {
        //         year: "四月", // 年份
        //         data: [
        //             // 两个数组是因为有两条线
        //             [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
        //             [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
        //         ]
        //     }
        // ];





        // 5.点击切换2020 和 2021 的数据
        $('.line h2 a').on('click', function () {
            // console.log($(this).index());
            // 点击a 之后 根据当前a的索引号 找到对应的 yearData 相关对象
            // console.log(yearData[$(this).index()]);
            var obj = yearData[$(this).index()];
            option.series[0].data = obj.data[0];
            option.series[1].data = obj.data[1];
            // 选中年份高亮
            $('.line h2 a').removeClass('a-active');
            $(this).addClass('a-active');

            // 需要重新渲染
            myChart.setOption(option);
        })
    })
})();

// 折线图模块2
(function () {
    var myChart = echarts.init(document.querySelector('.line2 .chart'));
    //每个时间段的数据
    $.getJSON("/everyhourirport", function (values) {
        console.log(values)
        var xdata = []
        var ydata = []
        var zdata = []

        for (var i = 0; i < values.length; i++) {
            xdata.push(values[i]["Everyday_of_Mouths"])
            ydata.push(values[i]["everymoths_of_tooal"])
            zdata.push(((values[i]["everyday_of_avePrice"]) / (values[i]["everymoths_of_tooal"])).toFixed(2))
        }

        console.log(xdata)
        console.log(ydata)

        var option = {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                top: "0%",
                textStyle: {
                    color: "rgba(255,255,255,.5)",
                    fontSize: "12"
                }
            },
            grid: {
                top: '30',
                left: '10',
                right: '30',
                bottom: '10',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                name:"/小时",
                boundaryGap: false,
                // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12
                    }
                },
                // x轴线的颜色为   rgba(255,255,255,.2)
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.2)"
                    }
                },
                // data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "28", "29", "30"]
                data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
            }],
            yAxis: [{
                type: 'value',
                name:"航空数-价格(元)",
                axisTick: {
                    // 不显示刻度线
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12
                    }
                },
                // 修改分割线的颜色
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                }
            }],
            series: [{
                name: '航空数',
                type: 'line',
                smooth: true, // 圆滑的线
                // 单独修改当前线条的样式
                lineStyle: {
                    color: "#0184d5",
                    width: 2
                },
                // 填充区域渐变透明颜色
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [{
                            offset: 0,
                            color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
                        },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
                            }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                },
                // 拐点设置为小圆点
                symbol: 'circle',
                // 设置拐点大小
                symbolSize: 5,
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                // data: [30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40]
                data:ydata
            },
                {
                    name: "平均票价",
                    type: "line",
                    smooth: true,
                    lineStyle: {
                        normal: {
                            color: "#00d887",
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [{
                                    offset: 0,
                                    color: "rgba(0, 216, 135, 0.4)"
                                },
                                    {
                                        offset: 0.8,
                                        color: "rgba(0, 216, 135, 0.1)"
                                    }
                                ],
                                false
                            ),
                            shadowColor: "rgba(0, 0, 0, 0.1)"
                        }
                    },
                    // 设置拐点 小圆点
                    symbol: "circle",
                    // 拐点大小
                    symbolSize: 5,
                    // 设置拐点颜色以及边框
                    itemStyle: {
                        color: "#00d887",
                        borderColor: "rgba(221, 220, 107, .1)",
                        borderWidth: 12
                    },
                    // 开始不显示拐点， 鼠标经过显示
                    showSymbol: false,
                    // data: [130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40, 130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20]
                    data:zdata
                }
            ]
        };

        myChart.setOption(option);

        window.addEventListener('resize', function () {
            myChart.resize();
        })
    })
})();

// 饼形图1
(function () {
    var myChart = echarts.init(document.querySelector(".pie .chart"));
    $.getJSON("/weekwork", function (values) {
        console.log(values)
        var weekday = 0;
        var weekavgprice = 0;
        var workavgprice = 0;
        var workday = 0;
        var xdata = []
        var ydata = []
        // var zdata = []//记录平局价格

        for (var i = 0; i < values.length; i++) {
            if (values[i]["day_type"] < 6) {
                workday = workday + parseInt(values[i]["total_of_day"])
                workavgprice = workavgprice + parseInt(values[i]["day_of_total_Price"])
            } else {
                weekday = weekday + parseInt(values[i]["total_of_day"])
                weekavgprice = weekavgprice + parseInt(values[i]["day_of_total_Price"])
            }
        }
        var option = {
            color: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                // 垂直居中,默认水平居中
                // orient: 'vertical',

                bottom: 0,
                left: 10,
                // 小图标的宽度和高度
                itemWidth: 10,
                itemHeight: 10,
                // 修改图例组件的文字为 12px
                textStyle: {
                    color: "rgba(255,255,255,.5)",
                    fontSize: "10"
                }
            },
            series: [{
                name: '航班数',
                type: 'pie',
                // 设置饼形图在容器中的位置
                center: ["50%", "42%"],
                // 修改饼形图大小，第一个为内圆半径，第二个为外圆半径
                radius: ['40%', '60%'],
                avoidLabelOverlap: false,
                // 图形上的文字
                label: {
                    show: false,
                    position: 'center'
                },
                // 链接文字和图形的线
                labelLine: {
                    show: false
                },
                data:[ {
                    value: weekday,
                    name:  "周末"
                },
                    {
                        value: workday,
                        name:   "工作日"
                    }]
                /*data: [{
                    value: 1,
                    name: "0岁以上"
                },
                    {
                        value: 4,
                        name: "20-29岁"
                    },
                    {
                        value: 2,
                        name: "30-39岁"
                    },
                    {
                        value: 2,
                        name: "40-49岁"
                    },
                    {
                        value: 1,
                        name: "50岁以上"
                    }
                ]*/
            }]
        };

        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    })
})();

// 饼形图2
(function () {
    var myChart = echarts.init(document.querySelector('.pie2 .chart'));
    $.getJSON("/weekwork", function (values) {
        console.log(values)
        var xdata = []
        var ydata = []
        // var zdata = []//记录平局价格

        for (var i = 0; i < values.length; i++) {
            ydata.push(parseInt(values[i]["total_of_day"]))
        }
        var option = {
            color: ['#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                bottom: 0,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: "rgba(255,255,255,.5)",
                    fontSize: 10
                }
            },
            series: [{
                name: '星期分布',
                type: 'pie',
                radius: ["10%", "60%"],
                center: ['50%', '40%'],
                // 半径模式  area面积模式
                roseType: 'radius',
                // 图形的文字标签
                label: {
                    fontsize: 10
                },
                // 引导线调整
                labelLine: {
                    // 连接扇形图线长(斜线)
                    length: 6,
                    // 连接文字线长(横线)
                    length2: 8
                },

                data: [{
                    value: ydata[0],
                    name: '星期一'
                },
                    {
                        value: ydata[1],
                        name: '星期二'
                    },
                    {
                        value: ydata[2],
                        name: '星期三'
                    },
                    {
                        value: ydata[3],
                        name: '星期四'
                    },
                    {
                        value: ydata[4],
                        name: '星期五'
                    },
                    {
                        value: ydata[5],
                        name: '星期六'
                    },
                    {
                        value: ydata[6],
                        name: '星期天'
                    }
                ]
            }]
        };

        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    })
})();


(function () {
    // var chartDom = document.getElementById('main');
    var myChart = echarts.init(document.querySelector(".map .chart"));
    $.getJSON("/SourcetoDestinations", function (values) {

        var xdata = []
        var zhongjian = []//用作来存所有的出发地
        var data = []
        var data1 = []

        var ydata = []
        var zdata = []
        var tdtd = {}
        var count = values.length
        //用作记录实时的出发地航线
        for (var i = 0; i < count; i++) {
            if (zhongjian.indexOf(values[i]["Source_to_Destination"]) == -1) {
                zhongjian.push(values[i]["Source_to_Destination"])
                for (var j = 0; j < values.length; j++) {
                    //如果不在出发地里面
                    if (values[i]["Source_to_Destination"] == values[j]["Source_to_Destination"]) {
                        tdtd.name = values[i]["Source_to_Destination"];
                        // xdata.push({name: tdtd.name})
                        xdata.push({name: tdtd.name})
                        tdtd.name = values[i]["Destination_of_Journey"];
                        tdtd.value = parseInt(values[i]["Source_to_Destination_of_mile"])
                        xdata.push({
                            name: tdtd.name,
                            value: tdtd.value
                        });
                        data1.push(xdata)
                        xdata = []
                    }
                }
                data.push(data1)
                ydata.push(values[i]["Source_to_Destination"])
                ydata.push(data1)
                zdata.push(ydata)
                ydata = []
                data1 = []
                //重新重置
            }else {
                count--;
            }

        }
        console.log(data)
        console.log(zdata)
        var geoCoordMap = {
            'Mumbai': [72.828353, 18.972804],
            'Kolkata': [88.360532, 22.548426],
            'Delhi': [88.364373, 22.544559],
            'Chennai': [80.267664, 13.075767],
            'Banglore': [80.273765, 13.066681],
            'Cochin': [76.267304, 9.931233],
            'New Delhi': [77.118351, 28.649029],
            'Hyderabad': [76.255318, 9.940206],
        };
        var Mudata = [
            [{
                name: 'Mumbai'
            }, {
                name: 'Hyderabad',
                value: 100
            }],
        ];
        var KoData = [
            [{
                name: 'Kolkata'
            }, {
                name: 'Banglore',
                value: 100
            }],

        ];
        var BaData = [
            [{
                name: 'Banglore'
            }, {
                name: 'Delhi',
                value: 100
            }],
            [{
                name: 'Banglore'
            }, {
                name: 'NewDelhi',
                value: 100
            }],

        ];
        var ChData = [
            [{
                name: 'Chennai'
            }, {
                name: 'Kolkata',
                value: 100
            }],

        ];
        var DeData = [
            [{
                name: 'Delhi'
            }, {
                name: 'Cochin',
                value: 100
            }],
        ];

        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
        //var planePath = 'arrow';
        /*var convertData = function (data) {

            var res = [];
            for (var i = 0; i < data.length; i++) {

                var dataItem = data[i];

                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord],
                        value: dataItem[1].value
                    });
                }
            }
            return res;

        };*/

        function convertData(data1) {
            var res = [];
            for (var i = 0; i < data1.length; i++) {
                var dataItem = data1[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord],
                        value: dataItem[1].value
                    });
                }
            }
            return res;
        };
        var color = ['#a6c84c', '#22ff6c', '#e9e146', '#22FF6CFF', '#E9E146FF']; //航线的颜色
        var series = [];
        var x = [
            ['Mumbai', Mudata],
            ['Kolkata', KoData],
            ['Banglore', BaData],
            ['Chennai', ChData],
            ['Banglore', DeData]];

        zdata.forEach(function (item, i) {
            series.push({
                name: item[0],
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: 'red', //arrow箭头的颜色
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            }, {
                name: item[0],
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            }, {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 100;
                },
                itemStyle: {
                    normal: {
                        color: color[i],
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
        });
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: function (params, ticket, callback) {
                    if (params.seriesType == "effectScatter") {
                        return "线路：" + params.data.name + "" + params.data.value[2];
                    } else if (params.seriesType == "lines") {
                        return params.data.fromName + ">" + params.data.toName + "<br />" + params.data.value;
                    } else {
                        return params.name;
                    }
                }
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                data: ['Mumbai', 'Kolkata', 'Banglore', 'Chennai', 'Banglore'],
                textStyle: {
                    color: '#803535'
                },
                selectedMode: 'multiple'
            },
            geo: {
                map: 'world',
                // 把地图放大1.2倍
                zoom: 10,
                center: [80.267664, 13.075767],
                label: {
                    // 鼠标移动显示区域名称
                    emphasis: {
                        show: true,
                        color: '#fff'
                    }
                },
                roam: true,
                // 地图样式修改
                itemStyle: {
                    normal: {
                        areaColor: 'rgba(34, 70, 168, 0.7)',
                        borderColor: '#0692a4'
                    },
                    emphasis: {
                        areaColor: 'rgba(119, 139, 224, 0.548)'
                    }
                }
            },
            series: series
        };

        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    })
})();