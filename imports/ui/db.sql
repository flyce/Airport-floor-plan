db.users.insert({uid: "10001", username: "Echo", password: "123456", group: "Admin", regTime: new Date() });
db.users.update({uid: "10001"}, {$set: { group: "Admin" },});