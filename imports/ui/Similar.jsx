import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

// Array 格式 x坐标,y坐标,10位标准时间戳
const user1 = ['1,1,1492499030', '2,2,1492499030', '3,2,1492499020' , '4,2,1492499030' ,'4,3,1492499030' ,'4,4,1492499030', '5,6,1492499030', '6,6,1492499030']; // 按时间排序后的 Array
const user2 = ['1,1,1492499030', '2,1,1492499030', '3,2,1492499030' , '4,2,1492499030' ,'4,4,1492499030' ,'4,4,1492499030', '6,6,1492499030']; // 按时间排序后的 Array


class Similar extends Component {
    constructor(props) {
        super(props);
        this.state=({
            similarAtoB: 0,
            similarBtoA: 0,
            similarPonintNumber: 0,
        });
    }

    handleClick() {
        const data = this.checkSimilar(user1, user2, 5, 30)[0];
        console.log(data);
        this.setState({
            similarAtoB: data["SimilarityAtoB"],
            similarBtoA: data["SimilarityBtoA"],
            similarPonintNumber: data["similarPonintNumber"],
        });

    }

    /***
     * 检查相似度
     * 逻辑 经过同一个区域的时间如果相差较小，且相同点达到一定数量时，认为两民旅客同行
     * @param data 用于比较的第一个数据 格式 坐标x,坐标y,时间戳
     * @param anotherData 用于比较的第二个数据 格式 坐标x,坐标y,时间戳
     * @param minSimilarPonitNum 根据经验得出的两名旅客同行时最小相似点数
     * @param time 允许误差时间，单位s
     * @returns {[*]}
     *
     * status为状态标识，0代表失败1代表成功
     * info 失败输出失败原因，成功则返回相似点的所有信息 Array
     * 如果 status 为1 ，还返回1用户相对于2的相似度，2用户相对于1用户的相似度，以及相似点的数量
     */
    checkSimilar(data, anotherData, minSimilarPonitNum, time) {
        let result = [];
        let similarPointCount = 0;
        for (var j = 0; j < data.length; ++j) {
            let dataPoint = data[j].split(',');
            for (var i = 0; i < anotherData.length; ++i) {
                let anotherDataPoint = anotherData[i].split(',');
                if (dataPoint[0] === anotherDataPoint[0] && dataPoint[1] === anotherDataPoint[1]
                    && ( Math.abs(parseInt(dataPoint[2]) - parseInt(anotherDataPoint[2])) < time )
                ) {
                    similarPointCount++;
                    result.push({
                        ponit: dataPoint[0] +','+ dataPoint[1],
                        time: dataPoint[2],
                        anotherTime: anotherDataPoint[2],
                        timeDifference: Math.abs(parseInt(dataPoint[2]) - parseInt(anotherDataPoint[2])),
                    });
                }
            }
        }

        if (similarPointCount <=  minSimilarPonitNum) {
            return [{
                status: 0,
                info: "不满足最小限制条件"
            }];
        }


        // parseFloat(((similarPointCount/data.length) * 100).toString().match(/^\d+(?:\.\d{0,2})?/)[0])
        // 把 0-1 的小数转换成 0-100 的数，保留小数点后两位
        return [{
            status: 1,
            similarPonintNumber: similarPointCount,
            SimilarityBtoA: similarPointCount/data.length,
            SimilarityAtoB: similarPointCount/anotherData.length,
            info: result
        }];
    }

    render() {
        return (
            <MuiThemeProvider>
                <Card>
                    <CardTitle title="旅客同行概率计算" />
                    <CardText>
                        旅客1数据：<br />
                        {
                            user1.map((value, key) => (
                                <li key={key}>{"x: " + value.split(',')[0] + ", y: " + value.split(',')[1] +
                                    ', 时间:' + new Date(parseInt(value.split(',')[2]) *1000 )
                                    .toLocaleString('chinese', {hour12:false}).replace('-', '.').replace('-', '.')}</li>
                            ))
                        }
                        <br />
                        旅客2数据：{
                            user2.map((value, key) => (
                                <li key={key}>{"x: " + value.split(',')[0] + ", y: " + value.split(',')[1] +
                                ', 时间:' + new Date(parseInt(value.split(',')[2]) *1000 )
                                    .toLocaleString('chinese', {hour12:false}).replace('-', '.').replace('-', '.')}</li>
                            ))
                        }
                        <br />
                        <FlatButton
                            label="计算相似度"
                            onTouchTap={this.handleClick.bind(this)}
                        />
                        <br /><br/>
                        相似度1和2: {this.state.similarAtoB}<br/>
                        相似度2和1: {this.state.similarBtoA}<br/>
                        相似点数量：{this.state.similarPonintNumber}
                    </CardText>
                </Card>
            </MuiThemeProvider>
        );
    }
}

export default Similar;
