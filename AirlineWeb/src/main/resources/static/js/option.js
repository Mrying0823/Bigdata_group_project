let demo1 = echarts.init(document.getElementById("demo1"));
let demo2 = echarts.init(document.getElementById("demo2"));
let demo3 = echarts.init(document.getElementById("demo3"));
let demo4 = echarts.init(document.getElementById("demo4"));
let demo5 = echarts.init(document.getElementById("demo5"));
let demo6 = echarts.init(document.getElementById("demo6"));
let demo7 = echarts.init(document.getElementById("demo7"));


let option1 = {
    //标题
    title: {
        text: "柱状图"
    },
    //鼠标悬停的提示
    tooltip: {},
    //图例
    legend: {
        data: ["销量"]
    },
    //x轴
    xAxis: {
        data: ["苹果", "梨", "香蕉", "葡萄", "草莓", "荔枝"]
    },
    //y轴
    yAxis: {},
    //图表组件
    series: [{
        //名称
        name: "销量",
        //类型
        type: "bar",
        //数据
        data: [5, 20, 36, 10, 15, 25]
    }]
};

let option2 = {
    title: {
        text: "饼状图"
    },
    tooltip: {},
    legend: {
        data: ["销量"]
    },
    series: [{
        type: "pie",
        data: [
            {name: "苹果", value: 5},
            {name: "梨", value: 20},
            {name: "香蕉", value: 36},
            {name: "葡萄", value: 10},
            {name: "草莓", value: 15},
            {name: "荔枝", value: 25}
        ]
    }]
};

let option3 = {
    title: {
        text: "折线图"
    },
    tooltip: {},
    legend: {
        data: ["销量"]
    },
    xAxis: {
        data: ["苹果", "梨", "香蕉", "葡萄", "草莓", "荔枝"]
    },
    yAxis: {},
    series: [{
        name: "销量",
        type: "line",
        data: [5, 20, 36, 10, 15, 25]
    }]
};

let option4 = {
    title: {
        text: "散点图"
    },
    tooltip: {},
    legend: {
        data: ["销量"]
    },
    xAxis: {
        data: ["苹果", "梨", "香蕉", "葡萄", "草莓", "荔枝"]
    },
    yAxis: {},
    series: [{
        name: "销量",
        type: "scatter",
        data: [5, 20, 36, 10, 15, 25]
    }]
};

let option5 = {
    title: {
        text: "雷达图"
    },
    tooltip: {},
    legend: {
        data: ["销量", "进货量"]
    },
    //雷达图配置
    radar: {
        indicator: [{
            name: "苹果",
            max: 50
        },{
            name: "梨",
            max: 50
        },{
            name: "香蕉",
            max: 50
        },{
            name: "葡萄",
            max: 50
        },{
            name: "草莓",
            max: 50
        },{
            name: "荔枝",
            max: 50
        }]
    },
    series: [{
        name: "销量与进货量的对比",
        type: "radar",
        data: [{
            value: [5, 20, 36, 10, 15, 25],
            name: "销量"
        },{
            value: [20, 30, 40, 15, 15, 35],
            name: "进货量"
        }]
    }]
};

let option6 = {
    title: {
        text: "旭日图"
    },
    tooltip: {},
    legend: {
        data: ["销量"]
    },
    series: [{
        type: "sunburst",
        data: [{
            value: 6,
            name: "水果",
            //该类下的子类型
            children: [{
                value: 1,
                name: "苹果"
            },{
                value: 2,
                name: "香蕉"
            },{
                value: 3,
                name: "葡萄"
            }]
        },{
            value: 9,
            name: "蔬菜",
            children: [{
                value: 2,
                name: "芹菜"
            },{
                value: 7,
                name: "上海青"
            }]
        },{
            name: "肉类",
            children: [{
                value: 2,
                name: "牛肉"
            },{
                value: 3,
                name: "羊肉"
            },{
                value: 4,
                name: "鸡肉"
            }]
        }]
    }]
};

// 模拟数据
function getVirtulData(year) {
    year = year || '2021';
    let date = +echarts.number.parseDate(year + '-01-01');
    let end = +echarts.number.parseDate(year + '-12-31');
    let dayTime = 3600 * 24 * 1000;
    let data = [];
    for (let time = date; time <= end; time += dayTime) {
        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Number.parseInt(Math.random() * 10)
        ]);
    }
    return data;
}
let option7 = {
    title: {
        text: "日历热力图"
    },
    //下方那个过滤器
    visualMap: {
        //最小值
        min: 0,
        //是否显示范围最大最小值
        calculable: true,
        //垂直还是水平
        orient: 'horizontal',
        //定位相关
        left: 'center',
        bottom: '15%',
        //最大值
        max: 10
    },
    //日历图范围
    calendar: {
        range: '2021'
    },
    series: {
        type: 'heatmap',
        //使用的坐标系
        coordinateSystem: 'calendar',
        data: getVirtulData(2021)
    }
};

demo1.setOption(option1);
demo2.setOption(option2);
demo3.setOption(option3);
demo4.setOption(option4);
demo5.setOption(option5);
demo6.setOption(option6);
demo7.setOption(option7);
