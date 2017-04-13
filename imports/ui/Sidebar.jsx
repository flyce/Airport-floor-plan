import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

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

// for test
import RaisedButton from 'material-ui/RaisedButton';
// import List from "./List";

import {List, ListItem} from 'material-ui/List';


export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            logged: true,
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    render() {
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
                                <MenuItem primaryText="个人中心" />
                                <MenuItem primaryText="修改密码" />
                                <MenuItem primaryText="注销" />
                            </IconMenu>
                        }


                        iconElementLeft={
                            <IconButton tooltip="打开菜单" onTouchTap={this.handleToggle}>
                                <NavigationMenu />
                            </IconButton>
                        }
                />
                {/* 用于测试 Drawer 的 Button */}
                {/*<RaisedButton*/}
                    {/*label="Toggle Drawer"*/}
                    {/*onTouchTap={this.handleToggle}*/}
                    {/*fullWidth*/}
                {/*/>*/}
                <Drawer open={this.state.open}>
                    <AppBar title="Echo's Panel"
                            iconElementLeft={
                                <IconButton tooltip="关闭菜单" onTouchTap={this.handleToggle}>
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
                    <MenuItem
                        primaryText="用户管理"
                        leftIcon={<People />}
                        containerElement={<Link to="/draw"/>}
                    />
                    <MenuItem
                        primaryText="注销"
                        leftIcon={<ExitToApp />}
                        containerElement={<Link to="/login"/>}
                    />
                </Drawer>
            </div>
        );
    }
}


PropTypes = {
    title: PropTypes.string.isRequired,
};