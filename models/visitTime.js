
var moment = require('moment');
var VisitTime = function (startTime, endTime) {
	var k = {};
	k.startTime = new Date(moment(startTime));
	k.endTime = new Date(moment(endTime));


	return k;
};

module.exports = VisitTime;