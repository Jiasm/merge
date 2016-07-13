### 根据特定规则合并多个数据集

```javascript
var merge = require('.')

var keys = ['name', 'sex']
var data1 = [
  {
    name: 'niko',
    sex: 'man',
    assets: 20
  },
  {
    name: 'bellic',
    sex: 'man',
    assets: 100
  }
]

var data2 = [
  {
    name: 'niko',
    sex: 'man',
    assets: 25,
    salary: 1000
  },
  {
    name: 'bellic',
    sex: 'fman',
    assets: 200
  }
]

console.log(merge(keys, [data1, data2]))
/**
 * [
 * 	{ name: 'niko', sex: 'man', assets: 45, salary: 1000 },
 * 	{ name: 'bellic', sex: 'man', assets: 100 },
 * 	{ name: 'bellic', sex: 'fman', assets: 200 }
 * ]
 */

```
