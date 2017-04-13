import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';


import NavigateNext from 'material-ui/svg-icons/image/navigate-next';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import Looks1 from 'material-ui/svg-icons/image/looks-one';
import Looks2 from 'material-ui/svg-icons/image/looks-two';
import Looks3 from 'material-ui/svg-icons/image/looks-3';
import Looks4 from 'material-ui/svg-icons/image/looks-4';
import Looks5 from 'material-ui/svg-icons/image/looks-5';

import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';


const tableData = [
    {
        uid: '10001',
        username: 'John Smith',
        group: 'Admin',
        regTime: '1492066702',
    },
    {
        uid: '10002',
        username: 'Randal White',
        group: 'User',
        regTime: '1492066702',
    },
    {
        uid: '10003',
        username: 'Stephanie Sanders',
        group: 'User',
        regTime: '1492066702',
    },
    {
        uid: '10004',
        username: 'Steve Brown',
        group: 'User',
        regTime: '1492066702',
    },
    {
        uid: '10005',
        username: 'John Smith',
        group: 'Admin',
        regTime: '1492066702',
    },
    {
        uid: '10006',
        username: 'Randal White',
        group: 'User',
        regTime: '1492066702',
    },
    {
        uid: '10007',
        username: 'Stephanie Sanders',
        group: 'User',
        regTime: '1492066702',
    },
    {
        uid: '10008',
        username: 'Steve Brown',
        group: 'Admin',
        regTime: '1492066702',
    },
];

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            uid: null,
            password: null,
            username: null,
            originalUsername: null,
            group: null,
            usernameWarning: null,
            passwordWarning: null,
            confirmButton: true,
            snackBarOpen: false,
            snackBarInfo: '保存成功',
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSnackBarOpen = this.handleSnackBarOpen.bind(this);
        this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    }

    handleOpen(row, event) {
        this.setState({
            open: true,
            uid: row.uid,
            username: row.username,
            originalUsername: row.username,
            group: row.group,
        });
    };

    handleClose() {
        this.setState({open: false});
    };

    handleConfirm() {
        this.setState({open: false});
        this.handleSnackBarOpen("保存成功");
        console.log(this.state.uid, this.state.username, this.state.password, this.state.group);
    };

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });

        // 判断用户的输入内容是否满足最小限制，如满足则让登陆按钮可以点击
        if (name === 'username') {
            if (value.length < 4) {
                this.setState({
                    usernameWarning: '用户不能少于四位',
                    confirmButton: true,
                });
            } else {
                this.setState({usernameWarning: ''});
            }
        } else {
            if (value.length >= 6 || value.length === 0) {
                this.setState({passwordWarning: ''});
            } else {
                this.setState({
                    passwordWarning: '密码不能少于六位',
                    confirmButton: true,
                });
            }
        }

        // 满足如下条件任何一条 保存 可以被点击
        // 1. 当前用户名被修改过且长度大于 4
        // 2. 密码被更改且长度大于 6

        if(name === 'username') {
            if (value !== this.state.originalUsername && value.length >= 4) {
                this.setState({confirmButton: false});
            } else {
                this.setState({confirmButton: true});
            }
        } else {
            if ((value.length >=6 || value.length === 0) &&
                (this.state.username !== this.state.originalUsername && this.state.username.length >= 4)) {
                this.setState({confirmButton: false});
            } else {
                this.setState({confirmButton: true});
            }
        }
    }

    handleChoose(event, value) {
        if (value === 1) {
            this.setState({group: "User"});
        } else {
            this.setState({group: "Admin"});
        }
    }

    handleSnackBarOpen(info) {
        this.setState({
            snackBarInfo: info,
            snackBarOpen: true,
        });
    }

    handleSnackBarClose() {
        this.setState({
            snackBarOpen: false,
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="保存"
                primary={true}
                disabled={this.state.confirmButton}
                onTouchTap={this.handleConfirm}
            />,
        ];

        return (
            <div>
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
                            <TableHeaderColumn>用户 ID</TableHeaderColumn>
                            <TableHeaderColumn>用户名</TableHeaderColumn>
                            <TableHeaderColumn>群组</TableHeaderColumn>
                            <TableHeaderColumn>注册时间</TableHeaderColumn>
                            <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        stripedRows={false} // 隔行高亮
                        showRowHover={true}
                        displayRowCheckbox={false}
                    >
                        {tableData.map((row, index) => (
                            <TableRow key={index} selected={row.selected}>
                                <TableRowColumn>{index + 1}</TableRowColumn>
                                <TableRowColumn>{row.uid}</TableRowColumn>
                                <TableRowColumn>{row.username}</TableRowColumn>
                                <TableRowColumn>{row.group}</TableRowColumn>
                                <TableRowColumn>{row.regTime}</TableRowColumn>
                                <TableRowColumn><IconButton onTouchTap={this.handleOpen.bind(this, row)}><ModeEdit color="#00bcd4"/></IconButton></TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableRowColumn colSpan="6" style={{textAlign: 'center'}}>
                                <IconButton><NavigateBefore color="#757575" hoverColor="#00bcd4"/></IconButton>
                                <IconButton><Looks1 color="#00bcd4" hoverColor="#00bcd4"/></IconButton>
                                <IconButton><Looks2 color="#757575" hoverColor="#00bcd4"/></IconButton>
                                <IconButton><Looks3 color="#757575" hoverColor="#00bcd4"/></IconButton>
                                <IconButton><Looks4 color="#757575" hoverColor="#00bcd4"/></IconButton>
                                <IconButton><Looks5 color="#757575" hoverColor="#00bcd4"/></IconButton>
                                <IconButton><NavigateNext color="#00bcd4" hoverColor="#00bcd4"/></IconButton>
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
                <Dialog
                    title="修改用户信息"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        disabled={true}
                        defaultValue={this.state.uid}
                        floatingLabelText="用户 ID (系统自动生成，不可修改)"
                        fullWidth
                    /><br />
                    <TextField
                        name="username"
                        defaultValue={this.state.username}
                        floatingLabelText="用户名"
                        onChange={this.handleChange}
                        errorText={this.state.usernameWarning}
                        fullWidth
                    /><br />
                    <SelectField
                        floatingLabelText="群组"
                        value={this.state.group}
                        onChange={this.handleChoose}
                        fullWidth
                    >
                        <MenuItem value="Admin" primaryText="Admin" />
                        <MenuItem value="User" primaryText="User" />
                    </SelectField><br />
                    <TextField
                        name="password"
                        floatingLabelText="修改密码 (留空为不修改密码)"
                        onChange={this.handleChange}
                        errorText={this.state.passwordWarning}
                        fullWidth
                    /><br />
                </Dialog>
                <Snackbar
                    open={this.state.snackBarOpen}
                    message={this.state.snackBarInfo}
                    autoHideDuration={2000}
                    onRequestClose={this.handleSnackBarClose}
                />
            </div>
        );

    }
}