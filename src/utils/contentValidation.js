import isEmpty from './isEmpty';

export const isContentEmpty = text => {
  return isEmpty(removeTags(text));
};

export const removeTags = text => {
  return text.replace(/<(.|\n)*?>|&nbsp;/g, '');
};
