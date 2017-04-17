db.users.insert({uid: "10004", username: "测试账号", password: "123456", group: "Admin", regTime: new Date() });
db.users.update({uid: "10001"}, {$set: { group: "Admin" },});