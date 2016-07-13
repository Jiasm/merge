'use strict'
/**
 * 合并两个数据集
 * @param reference {Object|String} Object的话 会循环取值 作为参照合并的key名 String则会直接作为key名来匹配
 * @param dataList  {Array}         数据的集合 应该为两个以上的数据集
 */

module.exports = (reference, dataList) => {

  // 如果只传了一个 直接返回
  if (dataList.length < 2) return dataList
  // 如果reference是一个字符串 套成array
  if (typeof reference === 'string') reference = [reference]

  let map = new Map()
  let getKey = buildKey(reference)
  let adduct = buildAdd(reference)

  // 循环所有的数据集
  dataList.map(dataItem => {

    for (let item of dataItem) {

      // 生成key标识
      let key = getKey(item)
      let data
      // 如果map中已经存了相同的key 则获取到对应的item
      if (map.has(key)) {
        data = map.get(key)
        // 执行合并操作
        data = adduct(data, item)
      } else {
        data = item
      }
      // 重新塞到map中去
      map.set(key, data)
    }
  })

  return Array.from(map.values())
}

/**
 * 生成唯一key
 * @param  {Array} keys  一些用于标识的key的集合
 * @return {Function}    调用传入数据 即可生成key
 */
function buildKey (keys) {
  /**
   * 从data中将所需的key拼接生成字符串 标识唯一性
   * @param  {Object} data 数据
   * @return {String}      拼好的key
   */
  return function (data) {

    let arr = []

    for (let key of keys) {
      arr.push(data[key])
    }

    return arr.join('')
  }
}

/**
 * 合并两个数值
 * @param  {Array} keys  一些用于标识的key的集合
 * @return {Function}    调用传入数据 即可生成合并后的数据
 */
function buildAdd (keys) {
  /**
   * 将cursor的数据合并至pre
   * @param  {Object} pre    原始数据
   * @param  {Object} cursor 要合并的数据
   * @return {Object}        合并后的数据
   */
  return function (pre, cursor) {

    let obj = Object.assign({}, pre)

    for (let key in cursor) {
      if (!keys.includes(key))
        obj[key] = (obj[key] || 0) + cursor[key] || 0
    }

    return obj
  }
}
