'use strict';

(function () {
  /*
   * @desc add two number string
   * @params {String} first number string
   * @params {String} second number string
   * @params {Number} scale
   * @return {String} added number string
   */
  function add(firstr, secstr, scale) {
    var result = '';
    var firlen = firstr.length;
    var seclen = secstr.length;
    var n;
    var carry = 0;
    var remainder;
    var i = 0;
    while(i < firlen && i < seclen) {
      i++;
      n = parseInt(firstr[firlen - i], scale) + parseInt(secstr[seclen - i], scale) + carry;
      carry = Math.floor(n / scale);
      remainder = n % scale;
      result = remainder.toString(scale) + result;
    }
    while(i < firlen) {
      i++;
      n = parseInt(firstr[firlen - i], scale) + carry;
      carry = Math.floor(n / scale);
      remainder = n % scale;
      result = remainder.toString(scale) + result;
    }
    while(i < seclen) {
      i++;
      n = parseInt(secstr[seclen - i], scale) + carry;
      carry = Math.floor(n / scale);
      remainder = n % scale;
      result = remainder.toString(scale) + result;
    }
    while(carry > 0) {
      remainder = carry % scale;
      result = remainder.toString(scale) + result;
      carry = Math.floor(carry / scale);
    }
    return result;
  }
  /*
   * @desc multiply number string
   * @params {String} number string multiplicand
   * @params {Number} multiplier
   * @params {Number} scale
   * @return {String} multiplied number string
   */
  function multiply(str, multiplier, scale) {
    var result = '';
    var n;
    var carry = 0;
    var remainder;
    var i = str.length;
    while(--i >= 0) {
      n = parseInt(str[i], scale) * multiplier + carry;
      carry = Math.floor(n / scale);
      remainder = n % scale;
      result = remainder.toString(scale) + result;
    }
    while(carry > 0) {
      remainder = carry % scale;
      result = remainder.toString(scale) + result;
      carry = Math.floor(carry / scale);
    }
    return result;
  }

  /*
   * @desc convert number string from scale to scale
   * @params {String} number string
   * @params {Number} from scale
   * @params {Number} to scale
   * @params {Boolean} fullfill int64 value
   * @return {String} converted number string
   */
  function convert(src, fromScale, toScale, fullfill) {
    fromScale = fromScale || 10;
    toScale = toScale || 16;
    var result = fullfill ? '0000000000000000' : '';
    var n;
    var rate = '1';
    var i = 0;
    while(i++ < src.length) {
      n = multiply(rate, parseInt(src[src.length - i], fromScale), toScale);
      result = add(result, n, toScale);
      rate = multiply(rate, fromScale, toScale);
    }
    return result;
  }
  /*
   * @export
   */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = convert;
  } else if ( typeof define === "function" && define.amd ) {
    define("convert", [], function () { return convert; })
  } else {
    window.convert = convert;
  }
})();