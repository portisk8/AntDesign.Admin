/* eslint no-useless-escape:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export const searchTree = (element, matchProperty, matchingTitle) => {
  var result;
  element.some((e) => {
    if (e[matchProperty] == matchingTitle) {
      result = e;
      return result;
    }
    if (e.children)
      result = searchTree(e.children, matchProperty, matchingTitle);
  });
  return result;
};

export const formatNumber = (number) => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const formatted = Number(number).toLocaleString("es", options);
  return formatted;
};

export const setKeyTable = (dataArray, prefix = null) => {
  const clonedObj = JSON.parse(JSON.stringify(dataArray));
  if (clonedObj)
    clonedObj.forEach((data, index) => {
      if (!data.key) data.key = prefix + index;
    });
  return clonedObj;
};
