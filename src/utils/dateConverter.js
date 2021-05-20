import { format } from 'date-fns';

// returns MMMM dd, yyyy ex: June 12, 2020
export const convertDateTimeToSimpleDate = dateTime => {
  return format(new Date(dateTime), 'MMMM dd, yyyy');
};

export const convertDateTimeToLastUpdateFormat = dateTime => {
  return format(new Date(dateTime), 'hh:mm a MMMM dd, yyyy');
};

export const convertDateTimeToVersionFormat = dateTime => {
  return format(new Date(dateTime), 'yyyy-MM-dd');
};
