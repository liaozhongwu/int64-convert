'use strict';

(function () {
  /*
   * @desc trim number string, remove front zero
   * @params {String} number string
   * @return {String} trimed number string
   */
  function trim(str) {
    while(str[0] === '0') {
      str = str.slice(1);
    }
    return str;
  }
  /*
   * @desc polish number string, add front zero
   * @params {String} number string
   * @params {Number} target length
   * @return {String} polished number string
   */
  function polish(str, len) {
    while(str.length < len) {
      str = '0' + str;
    }
    return str;
  }
  /*
   * @desc convert char to number
   * @params {String} number char
   * @params {Number} scale
   * @return {Number} polished number string
   */
  function toNumber(char, scale) {
    var num = parseInt(char, scale);
    return isNaN(num) ? 0 : num;
  }
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
      n = toNumber(firstr[firlen - i], scale) + toNumber(secstr[seclen - i], scale) + carry;
      carry = Math.floor(n / scale);
      remainder = n % scale;
      result = remainder.toString(scale) + result;
    }
    while(i < firlen) {
      i++;
      n = toNumber(firstr[firlen - i], scale) + carry;
      carry = Math.floor(n / scale);
      remainder = n % scale;
      result = remainder.toString(scale) + result;
    }
    while(i < seclen) {
      i++;
      n = toNumber(secstr[seclen - i], scale) + carry;
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
      n = toNumber(str[i], scale) * multiplier + carry;
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
  function convert(src, fromScale, toScale, polishLen) {
    src = trim(src);
    fromScale = fromScale || 10;
    toScale = toScale || 16;
    var result = '0';
    var n;
    var rate = '1';
    var i = 0;
    while(i++ < src.length) {
      n = multiply(rate, toNumber(src[src.length - i], fromScale), toScale);
      result = add(result, n, toScale);
      rate = multiply(rate, fromScale, toScale);
    }
    if (polishLen) {
      return polish(result, polishLen);
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