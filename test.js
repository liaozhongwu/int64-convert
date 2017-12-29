'use strict'

var assert = require('assert');
var convert = require('./index');

describe('hex2decimal', function() {
	it('should work from hex to decimal', function(done) {
		assert.equal(convert('ffffffff', 16, 10), '4294967295');
		assert.equal(convert('7fffffffffffffff', 16, 10), '9223372036854775807');
		assert.equal(convert('ffffffffffffffff', 16, 10), '18446744073709551615');
		assert.equal(convert.signedHexToDec('ffffffff'), '4294967295');
		assert.equal(convert.signedHexToDec('7fffffffffffffff'), '9223372036854775807');
		assert.equal(convert.signedHexToDec('ffffffffffffffff'), '-1');
		done();
	});
	it('shold work from decimal to hex', function (done) {
		assert.equal(convert('4294967295', 10, 16), 'ffffffff');
		assert.equal(convert('9223372036854775807', 10, 16), '7fffffffffffffff');
		assert.equal(convert('18446744073709551615', 10, 16), 'ffffffffffffffff');
		assert.equal(convert.signedDecToHex('4294967295'), 'ffffffff');
		assert.equal(convert.signedDecToHex('9223372036854775807'), '7fffffffffffffff');
		assert.equal(convert.signedDecToHex('-1'), 'ffffffffffffffff');
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
	it('shold throw error with invalid char', function (done) {
		try {
			convert('9223372z368547758z7', 10, 16);
		} catch (err) {
			assert.equal(err.message, "parse char 'z' to number(10) failed");
		}
		done();
	});
});
