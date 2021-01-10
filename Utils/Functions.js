/**
 * 
 * @param {String} string 
 * @param {Array} array
 * @returns {String}
 * @example
 * replace('tokenn', ['token']) //[PRIVATE]n
 */
module.exports.replace = function (string, array) {

    let res = string;

    for (let i of array) {
        res = res.split(i).join('[PRIVATE]')
    }

    return res;

}