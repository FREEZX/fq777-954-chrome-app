var Broadway = require('broadway-player');
//var Player = Broadway.Player;

var concatUint8 = function(parAr) {
	if (!parAr || !parAr.length){
	  return new Uint8Array(0);
	};
	var completeLength = 0;
	var i = 0;
	var l = parAr.length;
	for (i; i < l; ++i){
	  completeLength += parAr[i].byteLength;
	};

	var res = new Uint8Array(completeLength);
	var filledLength = 0;

	for (i = 0; i < l; ++i){
	  res.set(new Uint8Array(parAr[i]), filledLength);
	  filledLength += parAr[i].byteLength;
	};

	return res;

};

var self;
Player = function() {
	self = this;

	this.bufferAr = [];

	this.player = new Broadway.Player({});
};

Player.prototype.decodeRaw = function(data){
	if (!(data && data.length)){
		return;
	};
	var self = this;
	var foundHit = false;
	var hit = function(offset){
		foundHit = true;
		self.bufferAr.push(data.subarray(0, offset));
		self.player.decode( concatUint8(self.bufferAr) );
		self.bufferAr = [];
		self.bufferAr.push(data.subarray(offset));
	};

	var b = 0;
	var l = data.length;
	var zeroCnt = 0;
	for (b; b < l; ++b){
		if (data[b] === 0){
			zeroCnt++;
		} else {
			if (data[b] == 1){
				if (zeroCnt >= 3){
					console.log('hit');
					hit(b - 3);
					break;
				};
			};
			zeroCnt = 0;
		};
	};
	if (!foundHit){
		console.log('nohit');
		this.bufferAr.push(data);
	};
};

module.exports = Player;