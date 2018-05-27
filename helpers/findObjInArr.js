/**
 * 以一个对象里面的key在Array里面查找对应的数值并返回index值
 * @param {Array} arr Array序列
 * @param {any} key Key键
 * @param {any} val 需要的数值
 * @returns {number} 查找到的Index位置，未找到将返回-1
 */
module.exports = (arr, key, val) => {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] == val) {
            return i
        }
    }
    return -1;
}