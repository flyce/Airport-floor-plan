import { Meteor } from 'meteor/meteor';
import { Users } from '../imports/api/users.js';
import bcrypt from 'bcrypt';


Meteor.methods({
    userLogin: (username, password) => {
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
        } else {
            info = {
                status: 0,
                data: "username or password invalid"
            };
        }
        return info;
    },

    addUser: (uid, username, password, group) => {
        return Users.insert({
            uid: uid,
            username: username,
            password: bcrypt.hashSync(password, 10),
            group: group,
            regTime: new Date()
        });
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
    }
});