import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Session } from 'meteor/session';
import { Redirect} from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

// icon
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Place from 'material-ui/svg-icons/maps/place';
import Home from 'material-ui/svg-icons/action/home';
import People from 'material-ui/svg-icons/social/people';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import FlatButton from 'material-ui/FlatButton';


export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            dialogOpen: false,
            snackBarOpen: false,
            snackBarInfo: '',
            username: Session.get("username"),
            oldPassword: '',
            newPassword: '',
            confirmPassword:'',
            oldPasswordWarning: '',
            newPasswordWarning: '',
            confirmPasswordWarning: '',
            confirmButton: true,
            isLogin: Session.get("username") ? Session.get("username") : false
        };

        this.handleDrawer = this.handleDrawer.bind(this);

    }

    handleDrawer() {
        this.setState({drawerOpen: !this.state.drawerOpen});
    }

    handleLogout() {
        Session.set({
            _id: null,
            uid: null,
            username: null,
            group: null
        });
        this.setState({
            isLogin: false
        });
    }

    handleModifyPassword() {
        this.setState({
            dialogOpen: true,
        })
    }

    // Dialog
    handleDialogClose() {
        this.setState({
            dialogOpen: false,
        });
    }

    handleDialogConfirm() {
        this.setState({
            dialogOpen: false,
        });
        Meteor.call("selfUpdatePassword", this.state.username, this.state.oldPassword, this.state.newPassword,
            function (err, result) {
                if (result) {
                    this.handleSnackBarOpen("修改成功！");
                } else {
                    this.handleSnackBarOpen("修改失败！请重试");
                }
            }.bind(this)
        );

    }

    /*** 密码验证逻辑
     * 1. 旧密码不能与新密码相同
     * 2. 确认密码与新密码必须相同
     * 3. 密码长度大于 6
     ***/

    handleTextFieldChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });

        // 保证 旧密码新密码的长度超过六位
        if(value.length < 6) {
            if (name === "oldPassword") {
                this.setState({
                    oldPasswordWarning: '密码不能少于六位',
                    confirmButton: true
                });
            }
            if(name === "newPassword") {
                this.setState({
                    newPasswordWarning: '密码不能少于六位',
                    confirmButton: true
                });
            }
        } else {
            if (name === "oldPassword") {
                this.setState({
                    oldPasswordWarning: '',
                });
            }
            if(name === "newPassword") {
                this.setState({
                    newPasswordWarning: '',
                });
            }
        }

        // 满足长度条件打开 确认 按钮
        // 不直接使用 this.state.*** 是因为异步，赋值会有延迟
        if (name === 'oldPassword') {
            if(value.length >= 6 && this.state.newPassword.length >= 6 && this.state.confirmPassword.length >= 6) {
                this.setState({
                    confirmButton: false,
                });
            }
        }

        if (name === 'newPassword') {
            if(value.length >= 6 && this.state.oldPassword.length >= 6 && this.state.confirmPassword.length >= 6) {
                this.setState({
                    confirmButton: false,
                });
            }
        }

        if(name === 'confirmPassword') {
            if(value.length >= 6 && this.state.oldPassword.length >= 6 && this.state.newPassword.length >= 6) {
                this.setState({
                    confirmButton: false,
                });
            }
        }

        // 限制条件 密码必须相同与密码必须不同
        if(name === 'oldPassword') {
            if (value === this.state.newPassword ) {
                this.setState({
                    newPasswordWarning: '不能与旧密码相同',
                    confirmButton: true
                });
            } else {
                this.setState({
                    newPasswordWarning: '',
                });
            }
        }

        if (name === 'newPassword') {
            if (value !== this.state.confirmPassword) {
                if(this.state.confirmPassword.length >= 6) {
                    this.setState({
                        confirmPasswordWarning: '两次密码不一致',
                        confirmButton: true
                    });
                }
            } else {
                this.setState({
                    confirmPasswordWarning: '',
                });
            }

            if (value === this.state.oldPassword ) {
                this.setState({
                    newPasswordWarning: '不能与旧密码相同',
                    confirmButton: true
                });
            } else {
                this.setState({
                    newPasswordWarning: '',
                });
            }
        }

        if (name === 'confirmPassword') {
            if (value !== this.state.newPassword) {
                this.setState({
                    confirmPasswordWarning: '两次密码不一致',
                    confirmButton: true
                });
            } else {
                this.setState({
                    confirmPasswordWarning: '',
                });
            }
        }

    }

    // SnackBar
    handleSnackBarOpen(info) {
        setTimeout(function() {
            this.setState({
                snackBarInfo: info,
                snackBarOpen: true,
            });
        }.bind(this), 500);
    }

    handleSnackBarClose() {
        this.setState({
            snackBarOpen: false,
        });
    }

    render() {
        if (!this.state.isLogin) {
            return (<Redirect to="/login"/>);
        }
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleDialogClose.bind(this)}
            />,
            <FlatButton
                label="保存"
                primary={true}
                disabled={this.state.confirmButton}
                onTouchTap={this.handleDialogConfirm.bind(this)}
            />,
        ];
        return (
            <div>
                <AppBar title={this.props.title}
                        style={{position: 'fixed'}}
                        iconElementRight={
                            <IconMenu
                                iconButtonElement={
                                    <IconButton><PermIdentity /></IconButton>
                                }
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem primaryText={Session.get("username") + "您好！" } />
                                {/*<MenuItem primaryText="个人中心" />*/}
                                <MenuItem primaryText="修改密码" onTouchTap={this.handleModifyPassword.bind(this)}/>
                                <MenuItem primaryText="注销" onTouchTap={this.handleLogout.bind(this)} />
                            </IconMenu>
                        }

                        iconElementLeft={
                            <IconButton tooltip="打开菜单" onTouchTap={this.handleDrawer}>
                                <NavigationMenu />
                            </IconButton>
                        }
                />

                <Drawer open={this.state.drawerOpen}>
                    <AppBar title="Echo's Panel"
                            iconElementLeft={
                                <IconButton tooltip="关闭菜单" onTouchTap={this.handleDrawer}>
                                    <NavigationClose />
                                </IconButton>
                            }
                    />
                    <MenuItem
                        primaryText="主页"
                        leftIcon={<Home />}
                        containerElement={<Link to="/"/>}
                    />
                    <MenuItem
                        primaryText="活动轨迹监测"
                        leftIcon={<Place />}
                        containerElement={<Link to="/draw"/>}
                    />
                    {Session.get("group") === "Admin" ? <MenuItem
                        primaryText="用户管理"
                        leftIcon={<People />}
                        containerElement={<Link to="/user"/>}
                    /> : null}
                    <MenuItem
                        primaryText="注销"
                        leftIcon={<ExitToApp />}
                        onTouchTap={this.handleLogout.bind(this)}
                        // containerElement={<Link to="/login"/>}
                    />
                </Drawer>
                <Dialog
                    title="修改密码"
                    actions={actions}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        name="oldPassword"
                        type="password"
                        floatingLabelText="原密码"
                        onChange={this.handleTextFieldChange.bind(this)}
                        errorText={this.state.oldPasswordWarning}
                        fullWidth
                    /><br />
                    <TextField
                        name="newPassword"
                        type="password"
                        floatingLabelText="新密码"
                        onChange={this.handleTextFieldChange.bind(this)}
                        errorText={this.state.newPasswordWarning}
                        fullWidth
                    /><br />
                    <TextField
                        name="confirmPassword"
                        type="password"
                        floatingLabelText="再次确认新密码"
                        onChange={this.handleTextFieldChange.bind(this)}
                        errorText={this.state.confirmPasswordWarning}
                        fullWidth
                    />
                </Dialog>
                <Snackbar
                    open={this.state.snackBarOpen}
                    message={this.state.snackBarInfo}
                    autoHideDuration={2000}
                    onRequestClose={this.handleSnackBarClose.bind(this)}
                />
            </div>
        );
    }
}


PropTypes = {
    title: PropTypes.string.isRequired,
};