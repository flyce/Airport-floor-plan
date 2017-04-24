import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Users } from '../imports/api/users.js';
import {Tracks} from '../imports/api/tracks.js';
import bcrypt from 'bcrypt';

const Login = new Mongo.Collection('login');

// 数据二次验证，数据库操作
Meteor.methods({
    userLogin: (username, password) => {
        if (username, password) {
            let user = Users.find({username: username}).fetch()[0];
            let info;

            if (bcrypt.compareSync(password, user.password)) {
                info = {
                    status: 1,
                    data: [{
                        _id: user._id._str,
                        uid: user.uid,
                        username: user.username,
                        group: user.group
                    }]
                };
                Login.insert({id: user.uid,
                    loginTime: Math.round(new Date().getTime()/1000)
                })
            } else {
                info = {
                    status: 0,
                    data: "username or password invalid"
                };
            }
            return info;
        }
        return false;
    },

    addUser: (uid, username, password, group) => {
        if(uid && username && password, group) {
            return Users.insert({
                uid: uid,
                username: username,
                password: bcrypt.hashSync(password, 10),
                group: group,
                regTime: new Date()
            });
        }

        return false;
    },

    updateUser: (uid, username, password, group) => {
        let u,p,g;
        if (username) {
            u = Users.update({uid:uid}, {$set: {username: username}});
        }
        if (password) {
            p = Users.update({uid:uid},  {$set: {password: bcrypt.hashSync(password, 10)}});
        }
        if (group) {
            g = Users.update({uid:uid},  {$set: {group: group}});
        }
        return (u || p || g);
    },

    deleteUser: (uid) => {
        if (uid) {
            return Users.remove({uid: uid});
        }
        return false;
    },

    selfUpdatePassword(username, oldPassword, newPassword) {
        if(username && oldPassword && newPassword) {
            let user = Users.find({username: username}).fetch()[0];
            let info;

            if (bcrypt.compareSync(oldPassword, user.password)) {
                if (Users.update({username: username},  {$set: {password: bcrypt.hashSync(newPassword, 10)}})) {
                    info = [{
                        status: 1,
                        info: "update password success"
                    }];
                } else {
                    info = [{
                        status: 0,
                        info: "database update failed"
                    }];
                }
            } else {
                info = {
                    status: 0,
                    data: "password invalid"
                };
            }
            return info;
        }
        return false;
    },

    getLimitData(skipPageNum) {
        return Users.find().limit(10).skip(skipPageNum);
    },

    getNoRepeatMacAddress() {
        Tracks.mapReduce(function() {emit(this.macAddress,1);},function(key,values) {return Array.sum(values)},{out: 'peoples'} ).find()
    }
});