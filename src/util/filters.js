
/**
 * 过滤字典值
 *
 * @param {object} data.list 字典数据
 * @param {Object} data.key
 * @param {Object} data.val
 * @return {Promise}
 */
export function filterDictionary (data) {
  return Promise.resolve(data.list.filter((item)=>{
    return item[data.key] === data.val;
  }));
}


