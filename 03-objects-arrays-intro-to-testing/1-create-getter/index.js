/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  let pathSpec = path.split('.');
  return (obj) => {
    for(let i=0; i<pathSpec.length; i++){
      if(!obj.hasOwnProperty(pathSpec[i])) return undefined;
      obj = obj[pathSpec[i]];
    }
    return obj;
  };
}
