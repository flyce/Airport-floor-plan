import React, { Component, PropTypes } from "react";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import NavigateNext from 'material-ui/svg-icons/image/navigate-next';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import Looks1 from 'material-ui/svg-icons/image/looks-one';
import Looks2 from 'material-ui/svg-icons/image/looks-two';
import Looks3 from 'material-ui/svg-icons/image/looks-3';
import Looks4 from 'material-ui/svg-icons/image/looks-4';
import Looks5 from 'material-ui/svg-icons/image/looks-5';
import Avatar from 'material-ui/Avatar';
import { Peoples } from '../api/peoples.js';
import { Tracks } from '../api/tracks.js';
import { Guests } from '../api/guests.js'
import { createContainer } from 'meteor/react-meteor-data';

import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import Clear from "material-ui/svg-icons/content/clear";

class PeopleTest extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            skipPageNum: 0,
            currentPage: 0,
            beforeButton: true,
            nextButton: false,
            activeNum: 1,
        });
    }

    handlePageBefore() {
        if(this.state.skipPageNum > 0) {
            this.setState({
                skipPageNum: this.state.skipPageNum - 1,
                activeNum: this.state.activeNum - 1,
                beforeButton: true,
                nextButton: false,
            });
        } else {
            this.setState({
                beforeButton: true
            });
        }
    }

    handlePageNext() {
        if(parseInt(this.getDbCount()/10) > this.state.skipPageNum) {
            this.setState({
                skipPageNum: this.state.skipPageNum + 1,
                activeNum: this.state.activeNum + 1,
                beforeButton: false,
                nextButton: true,
            });
        } else {
            this.setState({
                nextButton: false
            });
        }
    }

    handlePageNumClicked(page, event) {
        this.setState({
            skipPageNum: page - 1,
            activeNum: page,
        });

        if (page === 1) {
            this.setState({
                beforeButton: true,
            });
        } else {
            this.setState({
                beforeButton: false,
            });
        }

        if (page === parseInt(this.getDbCount()/10 + 1)) {
            this.setState({
                nextButton: true,
            });
        } else {
            this.setState({
                nextButton: false,
            });
        }
    }

    handleTestButton() {
        Peoples.find().map((value, key) => {
                console.log(value._id);
                console.log(key);
            }
        );
    }

    // 异步，不能直接给赋值
    getDbData() {
        // Meteor.call("getNoRepeatMacAddress");
        console.log(Guests.find().fetch());
        let result = Peoples.find({},{skip:this.state.skipPageNum * 10, limit: 10});
        //Tracks.mapReduce(function() {emit(this.macAddress,1);},function(key,values) {return Array.sum(values)},{out: 'peoples'} ).find()
        //
        // console.log(result.fetch());
        return result;
    }

    getDbCount() {
        return Peoples.find().count();
    }

    getEnterTime(macAddress) {
        return new Date(Tracks.find({macAddress: macAddress}, {timeStamp:1}).fetch()[0].timeStamp * 1000).toLocaleString('chinese', {hour12:false}) ;
    }

    getExitTime(macAddress) {
        return new Date(Tracks.find({macAddress: macAddress}, {timeStamp:1, sort: { timeStamp: -1 } }).fetch()[0].timeStamp * 1000).toLocaleString('chinese', {hour12:false});
    }

    render() {
        return (
            <MuiThemeProvider>
                <Table
                    selectable={false} // 可选
                    fixedHeader={false}
                    multiSelectable={false}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>编号</TableHeaderColumn>
                            <TableHeaderColumn>Mac</TableHeaderColumn>
                            <TableHeaderColumn>首次出现时间</TableHeaderColumn>
                            <TableHeaderColumn>最后出现时间</TableHeaderColumn>
                            <TableHeaderColumn>绘制</TableHeaderColumn>
                            <TableHeaderColumn>取消绘制</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        stripedRows={false} // 隔行高亮
                        showRowHover={true}
                        displayRowCheckbox={false}
                    >
                        {this.getDbData().map((data, index) => (
                            <TableRow key={index} selected={data.selected}>
                                <TableRowColumn>{this.state.skipPageNum * 10 + index + 1}</TableRowColumn>
                                <TableRowColumn>{data._id}</TableRowColumn>
                                <TableRowColumn>{this.getEnterTime(data._id)}</TableRowColumn>
                                <TableRowColumn>{this.getExitTime(data._id)}</TableRowColumn>
                                <TableRowColumn>
                                    <IconButton>
                                        <ModeEdit color="#00bcd4"/>
                                    </IconButton>
                                </TableRowColumn>
                                <TableRowColumn>
                                    <IconButton>
                                        <Clear color="#00bcd4"/>
                                    </IconButton>
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    {/* 分页 */}
                    <TableFooter
                        // adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableRowColumn/>
                            <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                                <IconButton
                                    onTouchTap={this.handlePageBefore.bind(this)}
                                    disabled={this.state.beforeButton}
                                >
                                    <NavigateBefore color="#757575" hoverColor="#00bcd4"/>
                                </IconButton>
                                <IconButton
                                    onTouchTap={this.handlePageNumClicked.bind(this,1)}
                                >
                                    <Looks1 color={this.state.activeNum === 1? "#00bcd4" : "#757575" } hoverColor="#00bcd4"/>
                                </IconButton>
                                <IconButton
                                    onTouchTap={this.getEnterTime.bind(this,2)}
                                >
                                    <Looks2 color={this.state.activeNum === 2? "#00bcd4" : "#757575" } hoverColor="#00bcd4"/>
                                </IconButton>
                                {/*<IconButton><Looks3 color="#757575" hoverColor="#00bcd4"/></IconButton>*/}
                                {/*<IconButton><Looks4 color="#757575" hoverColor="#00bcd4"/></IconButton>*/}
                                {/*<IconButton><Looks5 color="#757575" hoverColor="#00bcd4"/></IconButton>*/}
                                <IconButton
                                    onTouchTap={this.handlePageNext.bind(this)}
                                    disabled={this.state.nextButton}
                                >
                                    <NavigateNext color="#757575" hoverColor="#00bcd4"/>
                                </IconButton>
                            </TableRowColumn>
                            <TableRowColumn>
                                <IconButton onTouchTap={this.handleTestButton.bind(this)}><ContentAdd color="#ff4081"/></IconButton>
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
            </MuiThemeProvider>
        );
    }
}

Peoples.propTypes = {
    users: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        peoples: Peoples.find().fetch(),
    };
}, PeopleTest);