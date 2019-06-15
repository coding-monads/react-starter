export const isString = (obj: any): obj is string =>
  Object.prototype.toString.call(obj) === "[object String]";

export const isObject = (obj: any): obj is Object =>
  obj !== null && typeof obj === "object";