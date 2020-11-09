import React, { Component } from "react";
import { View } from "@tarojs/components";
import { EChart } from "echarts-taro3-react";
import "./index.scss";

export default class Bar extends Component {
    componentDidMount() {
        const defautOption = {
            color: "#fff",   
            label:false,
            xAxis: {
                type: 'category',
                data: ['周三', '周四', '周五', '周六'],
               
                show:false
            },
            yAxis: {
                type: '',
                show:false
            },
            series: [
                {
                    data: [820, 932, 901, 934,],
                    type: 'line',
                    splitLine:false
                }],

        };
        this.barChart.refresh(defautOption);
    }

    barChart: any;

    refBarChart = (node) => (this.barChart = node);

    render() {
        return (
            <View className='bar-chart'>
                <EChart ref={this.refBarChart} canvasId='bar-canvas' />
            </View>
        );
    }
}