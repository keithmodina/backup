import isEmpty from './isEmpty';

const convertTwoDigits = number => {
  if (number < 10) return `0${number}`;
  return number;
};

export const getYYYYMMDD = date => {
  if (isEmpty(date)) date = new Date();
  const mm = date.getMonth() + 1; // getMonth() is zero-based
  const dd = date.getDate();

  return [
    date.getFullYear(),
    convertTwoDigits(mm),
    convertTwoDigits(dd)
  ].join('');
};

export const convertYYYYMMDDtoReadable = param => {
  if (param < 0) return '';

  const yyyymmdd = param.toString();
  const mmddyyyy = `${yyyymmdd.substr(0, 4)}/${yyyymmdd.substr(4, 2)}/${yyyymmdd.substr(6, 2)}`;

  const _ = new Date(mmddyyyy);
  const year = _.getFullYear();
  let month = '';

  switch (_.getMonth() + 1) {
    case 1: month = 'Jan'; break;
    case 2: month = 'Feb'; break;
    case 3: month = 'Mar'; break;
    case 4: month = 'Apr'; break;
    case 5: month = 'May'; break;
    case 6: month = 'Jun'; break;
    case 7: month = 'Jul'; break;
    case 8: month = 'Aug'; break;
    case 9: month = 'Sep'; break;
    case 10: month = 'Oct'; break;
    case 11: month = 'Nov'; break;
    case 12: month = 'Dec'; break;
    default: break;
  }

  const day = convertTwoDigits(_.getDate());

  /* const hour = convertTwoDigits(_.getHours());
  const minute = convertTwoDigits(_.getMinutes());
  const second = convertTwoDigits(_.getSeconds()); */ // uncomment if time is needed
  const utcDate = `${year} ${month} ${day}`; // ${hour}:${minute}:${second}`; // uncomment if time is needed
  return utcDate;
};

export const getDate = date => isEmpty(date) ? '' : new Date(convertYYYYMMDDtoReadable(date));
