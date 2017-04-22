db.users.insert({uid: "10007", username: "Echo", password: "$2a$10$G/M6faO1h1FNLE84IHQMm.FWsOBT13vUwuNzlovvQpDdU4fW41Y8a", group: "Admin", regTime: new Date() });
db.users.update({username: "Echo"}, {$set: { password: "$2a$10$G/M6faO1h1FNLE84IHQMm.FWsOBT13vUwuNzlovvQpDdU4fW41Y8a" },});

db.tracks.insert({macAddress: "ec:db:5f:f9:2f:d1",point: '1,2',timeStamp: Math.round(new Date().getTime()/1000) });

db.tracks.aggregate([{$group : { num : {$sum : 1}}}])
db.tracks.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])

db.tracks.mapReduce( function() { emit(this._id,1); }, function(key, values) {return Array.sum(values)}, {  query:{},out:"post_total" }).find()




得到不重复的mac地址
将每一个mac取出，放到 peoples
db.tracks.mapReduce(function() {emit(this.macAddress,1);},function(key,values) {return values},{out: 'peoples'} ).find()
