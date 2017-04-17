import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import ContentAdd from 'material-ui/svg-icons/content/add';

import NavigateNext from 'material-ui/svg-icons/image/navigate-next';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import Looks1 from 'material-ui/svg-icons/image/looks-one';
import Looks2 from 'material-ui/svg-icons/image/looks-two';
import Looks3 from 'material-ui/svg-icons/image/looks-3';
import Looks4 from 'material-ui/svg-icons/image/looks-4';
import Looks5 from 'material-ui/svg-icons/image/looks-5';
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";

import { Users } from '../api/users.js';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userId: null,
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
        this.handleAddUser =this.handleAddUser.bind(this);
    }

    handleOpen(row, event) {
        this.setState({
            open: true,
            userId: row._id,
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
        console.log(this.state.uid, this.state.username, this.state.password, this.state.group);
        var doc = Users.find().fetch();
        console.log(doc);
        if (Users.update(
            {
                _id: this.state.userId,
            },
            {
                $set:{
                    username: this.state.username,
                    password: this.state.password,
                    group: this.state.group,
                }
            }
            )) {
            this.handleSnackBarOpen("保存成功");
        } else {
            this.handleSnackBarOpen("保存失败");
        }
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

    handleAddUser() {
        this.handleSnackBarOpen("开发中...");
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

                        {this.props.users.map((data, index) => (
                        <TableRow key={index} selected={data.selected}>
                            <TableRowColumn>{index + 1}</TableRowColumn>
                            <TableRowColumn>{data.uid}</TableRowColumn>
                            <TableRowColumn>{data.username}</TableRowColumn>
                            <TableRowColumn>{data.group}</TableRowColumn>
                            <TableRowColumn>{data.regTime.toLocaleString('chinese', {hour12:false})}</TableRowColumn>
                            <TableRowColumn>
                                <IconButton onTouchTap={this.handleOpen.bind(this, data)}>
                                    <ModeEdit color="#00bcd4"/>
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableRowColumn/>
                            <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                                <IconButton><NavigateBefore color="#757575" hoverColor="#00bcd4"/></IconButton>
                                <IconButton><Looks1 color="#00bcd4" hoverColor="#00bcd4"/></IconButton>
                                <IconButton><Looks2 color="#757575" hoverColor="#00bcd4"/></IconButton>
                                <IconButton><Looks3 color="#757575" hoverColor="#00bcd4"/></IconButton>
                                <IconButton><Looks4 color="#757575" hoverColor="#00bcd4"/></IconButton>
                                <IconButton><Looks5 color="#757575" hoverColor="#00bcd4"/></IconButton>
                                <IconButton><NavigateNext color="#00bcd4" hoverColor="#00bcd4"/></IconButton>
                            </TableRowColumn>
                            <TableRowColumn>
                                <IconButton onTouchTap={this.handleAddUser}><ContentAdd color="#ff4081"/></IconButton>
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

User.propTypes = {
    users: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        users: Users.find().fetch(),
    };
}, User);