db.users.insert({uid: "10001", username: "Echo", password: "123456", group: "Admin", regTime: new Date() });
db.users.update({uid: "10003"}, {$set: { password: "$2a$10$G/M6faO1h1FNLE84IHQMm.FWsOBT13vUwuNzlovvQpDdU4fW41Y8a" },});