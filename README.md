# int64-convert

## Description

convert int64 number (display as string) between two scales

## Installation

```	
npm install int64-convert
```

## Examples

```js	
var convert = require("int64-convert");
convert('7fffffffffffffff', 16, 10); // '9223372036854775807'
convert('9223372036854775807', 10, 16); // '7fffffffffffffff'
convert('7fffffffffffffff', 16, 2); // '111111111111111111111111111111111111111111111111111111111111111'
convert('9223372036854775807', 10, 2); // '111111111111111111111111111111111111111111111111111111111111111'

// fullfill int64 value
convert('12345', 10, 16); // '3039'
convert('12345', 10, 16, true); // '0000000000003039'
```

## Tests

```
npm install
npm test
```
