'use strict';

(function () {
  /*
   * @desc trim number string, remove front zero
   * @params {String} number string
   * @return {String} trimed number string
   */
  function trim(str) {
    while(str[0] === '0' && str.length > 1) {
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
    if (!char) {
      return 0;
    }
    var num = parseInt(char, scale);
    if (isNaN(num)) {
      throw new Error("parse char '" + char + "' to number(" + scale + ") failed");
    }
    return num;
  }
  /*
   * @desc compare two number string
   * @params {String} first number string
   * @params {String} second number string
   * @params {Number} scale
   * @return {Number} 1 0 -1
   */
  function compare(firstr, secstr, scale) {
    if (firstr.length > secstr.length) {
      return 1;
    } else if (firstr.length < secstr.length) {
      return -1;
    } else {
      var i = 0;
      while(i < firstr.length) {
        var fn = toNumber(firstr[i], scale);
        var sn = toNumber(secstr[i], scale)
        if (fn > sn) {
          return 1;
        } else if (fn < sn) {
          return -1;
        }
        i++;
      }
    }
    return 0;
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
    while(i < firlen || i < seclen) {
      i++;
      n = toNumber(firstr[firlen - i], scale) + toNumber(secstr[seclen - i], scale) + carry;
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
   * @desc sub two number string
   * @params {String} first number string
   * @params {String} second number string
   * @params {Number} scale
   * @return {String} subed number string
   */
  function sub(firstr, secstr, scale) {
    if (compare(firstr, secstr, scale) < 0) {
      return sub(secstr, firstr, scale);
    }
    var result = '';
    var firlen = firstr.length;
    var seclen = secstr.length;
    var n;
    var carry = 0;
    var i = 0;
    while(i < firlen) {
      i++;
      n = toNumber(firstr[firlen - i], scale) - toNumber(secstr[seclen - i], scale) + carry;
      if (n < 0) {
        carry = -1;
        n = n + scale;
      }
      result = n.toString(scale) + result;
    }
    return trim(result);
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

  convert.signedHexToDec = function (src) {
    var negate = src.length > 15 && toNumber(src[0], 16) >= 8;
    var result = convert(negate ? sub('10000000000000000', src, 16) : src, 16, 10);
    return negate ? '-' + result : result;
  }

  convert.signedDecToHex = function (src, polishLen) {
    var negate = src[0] === '-';
    var result = convert(negate ? src.slice(1) : src, 10, 16, polishLen)
    return negate ? sub('10000000000000000', result, 16) : result;
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