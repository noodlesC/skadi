import { parse } from 'querystring';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

const loop = (target = [], result = []) => {
  if (Array.isArray(target)) {
    target.forEach(({ description, value, details: children }) => {
      const dValue = {};
      dValue.Description = description;
      dValue.Value = value;
      result.push(dValue);
      loop(children, result);
    });
  }
};

const flat = (details = []) => {
  const result = [];
  loop(details, result);
  return result;
};

export const wrap = (details = []) => {
  const flatResult = flat(details);
  const result = {};
  flatResult.forEach(({ Description, Value }, index) => {
    result[`Description${index}`] = Description;
    result[`Value${index}`] = Value;
  });
  return { data: result, length: flatResult.length };
};
