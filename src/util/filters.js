
/**
 * 过滤字典值
 *
 * @param {object} data.list 字典数据
 * @param {Object} data.key
 * @return {Promise}
 */
export function filterDictionary (data, key) {
  return data.filter(i=>{
    return i.code_ === key;
  })[0].desc_
}

