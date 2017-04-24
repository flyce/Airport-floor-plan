db.users.insert({uid: "10007", username: "Echo", password: "$2a$10$G/M6faO1h1FNLE84IHQMm.FWsOBT13vUwuNzlovvQpDdU4fW41Y8a", group: "Admin", regTime: new Date() });
db.users.update({username: "Echo"}, {$set: { password: "$2a$10$G/M6faO1h1FNLE84IHQMm.FWsOBT13vUwuNzlovvQpDdU4fW41Y8a" },});

db.tracks.insert({macAddress: "3d:3c:5f:f9:2f:23",point: '1,2',timeStamp: Math.round(new Date().getTime()/1000) });

得到不重复的mac地址
将每一个mac取出，放到 peoples value 字段保存mac的出现次数
db.tracks.mapReduce(function() {emit(this.macAddress,1);},function(key,values) {return Array.sum(values)},{out: 'peoples'} ).find()


users
{ "_id" : ObjectId("58f5b36576bbb3ef8c790a28"), "uid" : "10001", "username" : "Echo", "password" : "$2a$10$tzdWu2HQeY5TTNHDdjEmOOpOf0WEPr5coPRWZmASwlGaAhpwO1bs2", "group" : "Admin", "regTime" : ISODate("2017-04-18T06:34:13.016Z") }
{ "_id" : ObjectId("58f5f12576bbb3ef8c790a2a"), "uid" : "10002", "username" : "Hahaha", "password" : "$2a$10$G/M6faO1h1FNLE84IHQMm.FWsOBT13vUwuNzlovvQpDdU4fW41Y8a", "group" : "User", "regTime" : ISODate("2017-04-18T10:57:41.285Z") }
{ "_id" : ObjectId("58f5f1c476bbb3ef8c790a2b"), "uid" : "10003", "username" : "10003", "password" : "$2a$10$G/M6faO1h1FNLE84IHQMm.FWsOBT13vUwuNzlovvQpDdU4fW41Y8a", "group" : "User", "regTime" : ISODate("2017-04-18T11:00:20.232Z") }
{ "_id" : "PhYcavpg9NJsXW3Jn", "uid" : 10004, "username" : "test", "password" : "$2a$10$BUGzbgq4Td6mQSAGEb.cK.AoBqGlwoo21LKa/bJqLKQZqoyw657IO", "group" : "Admin", "regTime" : ISODate("2017-04-20T06:01:14.442Z") }
{ "_id" : "8BjNpLWpzTkBGHqPQ", "uid" : 10005, "username" : "test1", "password" : "$2a$10$Sk/Kk0CW1HvguG3UZ1Tf1.QrsjSpxctTyczq/9H1RjaxsxTzKt3WS", "group" : "User", "regTime" : ISODate("2017-04-22T11:42:05.252Z") }
{ "_id" : "ma2SskByjm3oQDGqc", "uid" : 10006, "username" : "test2", "password" : "$2a$10$LPMt8uCGSvCDBEzVWI.5LOLKM5WLfke8mvjk7s6dxRJWPaQTDG/.e", "group" : "User", "regTime" : ISODate("2017-04-22T11:42:14.535Z") }
{ "_id" : "4YnWcNu9HuAv5zJRr", "uid" : 10007, "username" : "test3", "password" : "$2a$10$blF43jxjAuvZ87YCI1MQHuNPk8FagMPc1cRycxaoxhSe6U5vgpVta", "group" : "User", "regTime" : ISODate("2017-04-22T11:42:35.195Z") }
{ "_id" : "4Se68x2DdCy87DrEt", "uid" : 10008, "username" : "test4", "password" : "$2a$10$NFqEl5Dr.ghhzKwffBv41eHG8GJ0DYMZLOY77ICFJxixmfQ4QbVN.", "group" : "User", "regTime" : ISODate("2017-04-22T11:42:53.275Z") }
{ "_id" : "urk2gmuWcLxM3ojeX", "uid" : 10009, "username" : "test5", "password" : "$2a$10$FX/zKsRTI03dAZ.8B6fj0ufxNk2QPDnV/lShQk4sQZ8kggU0uhC.G", "group" : "User", "regTime" : ISODate("2017-04-22T11:43:02.902Z") }
{ "_id" : "TdMGY2ePzHTrX37ZN", "uid" : 10010, "username" : "test6", "password" : "$2a$10$dWtVb069FVcP2H7ffDEAkeIp90ar1UalK7vroHrn3pyIexrxFMJSy", "group" : "User", "regTime" : ISODate("2017-04-22T11:43:20.210Z") }
{ "_id" : "8piNzD658Bs8GBwkY", "uid" : 10011, "username" : "test7", "password" : "$2a$10$sz5.Lttq6HWBdqVNv.OMduXJK/.4tyEDDfjR8jZkFptgLfYHuoDJi", "group" : "User", "regTime" : ISODate("2017-04-22T11:43:32.789Z") }
{ "_id" : "w9qKby3QZJu4kT4o6", "uid" : 10012, "username" : "test8", "password" : "$2a$10$pyA6JS/umMcHzP.GcrZWwOxbSnt.9uqyny46QX/qw/vmVcxgJhFJi", "group" : "User", "regTime" : ISODate("2017-04-22T11:43:51.966Z") }
{ "_id" : "QT3LXQLMwTkdD5AXf", "uid" : 10013, "username" : "test9", "password" : "$2a$10$LSRm3mNLOmU5dI1o.lOnk.YmcVFN1tq3n2TIA3P4b7M.70OQo3vYe", "group" : "User", "regTime" : ISODate("2017-04-22T11:44:02.494Z") }
{ "_id" : "GYG55M9Mvuzn9sctT", "uid" : 10014, "username" : "test10", "password" : "$2a$10$EMQ7jFllMnW4.5IP5pvklezNNJIOp5mu3ZmPPpSz6G1ab2N58Rnh6", "group" : "User", "regTime" : ISODate("2017-04-22T11:44:11.554Z") }


tracks
 "_id" : ObjectId("58fb3b59cd32dfa563ddd065"), "macAddress" : "ec:db:5f:f9:2f:d1", "point" : "1,2", "timeStamp" : 1492859737 }
{ "_id" : ObjectId("58fb3ddccd32dfa563ddd066"), "macAddress" : "eb:dc:45:f9:2f:d1", "point" : "1,2", "timeStamp" : 1492860381 }
{ "_id" : ObjectId("58fb3eadcd32dfa563ddd067"), "macAddress" : "eb:dc:45:f9:2f:d3", "point" : "1,2", "timeStamp" : 1492860589 }
{ "_id" : ObjectId("58fb3eb6cd32dfa563ddd068"), "macAddress" : "eb:dc:45:f9:1f:d3", "point" : "1,2", "timeStamp" : 1492860599 }
{ "_id" : ObjectId("58fb3f9ccd32dfa563ddd069"), "macAddress" : "ec:db:5f:f9:2f:d1", "point" : "1,2", "timeStamp" : 1492860829 }
{ "_id" : ObjectId("58fb3f9ecd32dfa563ddd06a"), "macAddress" : "ec:db:5f:f9:2f:d1", "point" : "1,2", "timeStamp" : 1492860831 }
{ "_id" : ObjectId("58fb3f9fcd32dfa563ddd06b"), "macAddress" : "ec:db:5f:f9:2f:d1", "point" : "1,2", "timeStamp" : 1492860831 }
{ "_id" : ObjectId("58fb3f9fcd32dfa563ddd06c"), "macAddress" : "ec:db:5f:f9:2f:d1", "point" : "1,2", "timeStamp" : 1492860832 }
{ "_id" : ObjectId("58fb3fa1cd32dfa563ddd06d"), "macAddress" : "ec:db:5f:f9:2f:d1", "point" : "1,2", "timeStamp" : 1492860834 }


db.tracks.insert({ "macAddress" : "ec:db:5f:f9:2f:d1", "point" : "1,2", "timeStamp" : 1492860834 })