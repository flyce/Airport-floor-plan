import React, { Component, PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {  Link } from 'react-router-dom';

export default class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
           height: "100%",
        };
    }

    // 让 404 Card 垂直居中, 和有从下向上浮出的效果
    componentDidMount() {
        this.setState({
            height: ((document.documentElement.clientHeight - document.getElementById('error').offsetHeight) / 2),
        })
    }


    render() {
        return (
            <MuiThemeProvider>
                <div id="error">
                    <Card style={{width: "45%" ,marginRight: 'auto', marginLeft: "auto", marginTop: this.state.height}}>
                        <CardTitle title="404" subtitle="Page Not Found"/>
                        <CardText>
                            错误原因: 找不到路由 <strong style={{color: "rgb(0, 188, 212)"}}>{this.props.path}</strong>
                            <br />
                            如果你曾访问过本页面，请联系管理员！
                        </CardText>
                        <List>
                            <ListItem
                                primaryText="Admin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                                leftAvatar={<Avatar>A</Avatar>}
                                rightIcon={<CommunicationChatBubble />}
                            />
                            <ListItem
                                insetChildren={true}
                                primaryText="Someone@example.com"
                            />
                        </List>
                        <CardText style={{textAlign: "center"}}>
                            <Link to={"/"} style={{clolr: 'rgb(0, 188, 212)'}}>返回主页</Link>
                        </CardText>
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}


PropTypes = {
    path: PropTypes.string.isRequired,
};