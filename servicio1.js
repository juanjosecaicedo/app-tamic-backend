const EventEmmiter = require('events');
const Util = require('util');

var ConnectedPeople = function () {
    this.data = [];
}

ConnectedPeople.prototype.AddConnection = function (obj) {
    
    this.data.push(obj);
    this.emit('AddConnection', this.data);
}

Util.inherits(ConnectedPeople, EventEmmiter);

var arr1 = new ConnectedPeople();


arr1.on('AddConnection',function (data) {
    console.log(`Data: ${data}`);
});

arr1.AddConnection({email:"e13954c1d1ba13657ceffca1584b86123b90a010c16abc2f9190602c7bee3e4e", users_quantity:0});