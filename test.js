'use strict'

var assert = require('assert');
var convert = require('./index');

describe('hex2decimal', function() {
	it('should work from hex to decimal', function(done) {
		var res = convert('7fffffffffffffff', 16, 10);
		assert.equal(res, '9223372036854775807');
		done();
	});
	it('shold work from decimal to hex', function (done) {
		var res = convert('9223372036854775807', 10, 16);
		assert.equal(res, '7fffffffffffffff');
		done();
	});
	it('should work from hex to binary', function(done) {
		var res = convert('7fffffffffffffff', 16, 2);
		assert.equal(res, '111111111111111111111111111111111111111111111111111111111111111');
		done();
	});
	it('should work from hex to binary', function(done) {
		var res = convert('9223372036854775807', 10, 2);
		assert.equal(res, '111111111111111111111111111111111111111111111111111111111111111');
		done();
	});
	it('shold work from binary to hex', function (done) {
		var res = convert('111111111111111111111111111111111111111111111111111111111111111', 2, 16);
		assert.equal(res, '7fffffffffffffff');
		done();
	});
	it('shold work from binary to decimal', function (done) {
		var res = convert('111111111111111111111111111111111111111111111111111111111111111', 2, 10);
		assert.equal(res, '9223372036854775807');
		done();
	});
	it('shold work with unused zero', function (done) {
		var res = convert('0000000012345678', 16, 10);
		assert.equal(res, '305419896');
		res = convert('0000000305419896', 10, 16);
		assert.equal(res, '12345678');
		done();
	});
	it('shold work with polish length', function (done) {
		var res = convert('12345678', 16, 10, 16);
		assert.equal(res, '0000000305419896');
		res = convert('305419896', 10, 16, 16);
		assert.equal(res, '0000000012345678');
		done();
	});
	it('shold work with invalid char', function (done) {
		var res = convert('9223372z368547758z7', 10, 16);
		assert.equal(res, '7fffffffffffffff');
		done();
	});
});
