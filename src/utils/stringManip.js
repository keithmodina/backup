/*
* remove whitespaces from a string
*/
export const removeWhiteSpace = str => {
  try {
    return str.replace(/\s/g, '');
  } catch (error) {
    return error;
  }
};

/*
* check if string has number
*/
export const hasNumber = str => {
  return /\d/.test(str);
};
