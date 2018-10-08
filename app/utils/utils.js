/**
 * 一些常用函数
 */

/**
 * 数组去重
 * @param arr
 */
export const uniqueArray = (arr) => {

};

/**
 *
 * @param object
 * @param path
 * @param defaultValue
 */
export const objectGetProperty = (object, path, defaultValue) => {
    return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce(function (obj, key) {
        // 先判断对象内有没有这个属性变量，如果没有则再判断有没变量，再否则就返回undefined
        if (typeof((obj || {})[key]) !== 'undefined') {
            key = key;
        } else if (eval("typeof("+key+")") !== 'undefined') { // 判断变量存不存在,如果存在就把Key换成对应变量的值
            key = eval(key);
        }
        return (obj || {})[key];
    }, object) || defaultValue;
};

/**
 *
 * @param objectArray
 * @param keyPath
 * @param value
 */
export const objectIndexOf = (objectArray, keyPath, value) => {
    if ((Array.isArray(objectArray) || (objectArray instanceof Array)) && (typeof(objectArray[0]) === 'object')) {
        for (let i = 0, len = objectArray.length; i < len; i++) {
            if (typeof(objectGetProperty(objectArray[i], keyPath, '')) === 'undefined') {
                // throw new Error("Property is not exist in object")
                console.warn('Property is not exist in object', objectArray[i], keyPath);
            } else {
                if (objectGetProperty(objectArray[i], keyPath, '') === value) {
                    return i;
                }
                if (objectGetProperty(objectArray[i], keyPath, '') !== value && i === len - 1) {
                    return -1;
                }
            }
        }
    } else {
        if (objectArray && objectArray.hasOwnProperty('length') && objectArray.length === 0) {
            return -1;
        } else {
            console.warn('param 1 is not object array');
        }
    }
};

export const copyPropertiesTo = (source, dest, destProp) => {
    if(!source) {
        throw new Error('source properties is not exist!');
    }

    if(destProp) {
        if (!objectGetProperty(dest, destProp)) {
            dest[destProp] = {};
        }
    }
    if(typeof(source)==='object') {
        let keys = Object.keys(source);
        for (let key of keys) {
            if(destProp) {
                dest[destProp][key] = source[key];
            } else {
                dest[key] = source[key];
            }
        }
    } else {
        throw new Error('source is not an object!');
    }
};