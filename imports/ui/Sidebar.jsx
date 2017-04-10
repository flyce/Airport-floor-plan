import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// icon
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import FlatButton from 'material-ui/FlatButton';

// for test
import RaisedButton from 'material-ui/RaisedButton';


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
                                    <IconButton><MoreVertIcon /></IconButton>
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
                        primaryText="标题一"
                        leftIcon={<LockIcon />}
                    />
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        );
    }
}


PropTypes = {
    title: PropTypes.string.isRequired,
};