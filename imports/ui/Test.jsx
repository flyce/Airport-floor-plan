import React, { Component, PropTypes } from 'react';
import {  Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

export default class Test extends Component {
    test() {
        console.log(Meteor.call("getUserId", (err, result) => {
            console.log(result);
        }));
    }
    render() {
        return (
            <div style={{textAlign: 'center', color: "rgb(0, 188, 212)"}}>
                {this.test()}
                本页面用于测试数据库的 CURD<br />
                <Link  to="/" style={{color: "#ffffff"}}>回到主页</Link>
            </div>
        );
    }
}

