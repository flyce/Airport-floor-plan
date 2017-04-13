import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';


import { Card, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        minWidth: 300,
    },
    avatar: {
        margin: '1em',
        textAlign: 'center ',
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        display: 'flex',
    },
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            toggle: false,
            open: false,
            warning: '',
            usernameWarning: '',
            passwordWarning:'',
            submitButton: true,
            isLogin: false,
            loginCount: 0,
            // isLogin: Session.get('currentUserId') ? true : false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

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
                this.setState({usernameWarning: '用户不能少于四位'});
                this.setState({submitButton: true});
            } else {
                this.setState({usernameWarning: ''});
            }
        } else {
            if (value.length < 6) {
                this.setState({passwordWarning: '密码不能少于六位'});
                this.setState({submitButton: true});
            } else {
                this.setState({passwordWarning: ''});
            }
        }

        if (name === 'password' && value.length >= 6 && this.state.username.length >= 4) {
            this.setState({submitButton: false});
        }

    }


    handleSubmit(event) {
        event.preventDefault();

        // 用户名密码验证逻辑
        // 测试账号 Echo
        // 测试密码 123456

        if (this.state.username.length < 4) {
            this.setState({warning: '用户名不能少于四位'});
            this.handleTouchTap();
        } else {
            if (this.state.password.length < 6) {
                this.setState({warning: '密码不能小于六位'});
                this.handleTouchTap();
            } else {
                this.setState({warning: '忘记密码？请与管理员联系'});
                this.handleTouchTap();
                // 登陆
                // Meteor.loginWithPassword(this.state.username, this.state.password, function(error) {
                //     if (error) {
                //         this.setState({warning: '用户名或密码不正确'});
                //         this.handleTouchTap();
                //     } else {
                //         Session.set({
                //             'currentUserId': Meteor.user()._id,
                //             'currentUsername': Meteor.user().username,
                //         });
                //         // location.href = 'http://localhost:3000/';
                //         this.setState({isLogin: true});
                //     }
                // }.bind(this));
            }
        }
        // console.log(Session.get('currentUsername'));

        // 创建用户
        // Accounts.createUser({
        //         username: this.state.username,
        //         password: this.state.password
        //     },
        //     function(error) {
        //         if (error) {
        //             console.log("there was an error: " + error.reason);
        //         } else {
        //            alert("注册成功，即将跳转到主页");
        //         }
        //     }
        // );
    }

    handleTouchTap() {
        this.setState({
            open: true,
        });
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    handleClick() {
        Meteor.logout();
        Session.set({
            'currentUsername': '',
            'currentUserId': '',
        })
        this.setState({isLogin: false});
    }

    render() {
        if (this.state.isLogin) {
            return (
                <div>
                    <h1>{Session.get('currentUsername')} 你好, <a onClick={this.handleClick}>注销</a></h1>
                </div>
            );
        }
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()} >
                <div style={{ ...styles.main, backgroundColor: cyan500 }}>
                    <Card style={styles.card}>
                        <div style={styles.avatar}>
                            <Avatar backgroundColor={pinkA200} icon={<LockIcon />} size={60} />
                        </div>

                        <div style={styles.form}>
                            <div style={styles.input} >
                                <TextField
                                    name="username"
                                    hintText="username"
                                    floatingLabelText="username"
                                    errorText={this.state.usernameWarning}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div style={styles.input}>
                                <TextField
                                    name="password"
                                    hintText="password"
                                    floatingLabelText="password"
                                    type="password"
                                    errorText={this.state.passwordWarning}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <CardActions>
                            <RaisedButton
                                type="submit"
                                primary
                                disabled={this.state.submitButton}
                                // icon={<CircularProgress size={25} thickness={2} />}
                                label="submit"
                                fullWidth
                                onTouchTap={this.handleSubmit}
                            />

                        </CardActions>

                        <Snackbar
                            open={this.state.open}
                            message={this.state.warning}
                            autoHideDuration={4000}
                            onRequestClose={this.handleRequestClose}
                        />

                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Login;
