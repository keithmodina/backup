import cookie from 'js-cookie';

import {
  ID_TOKEN,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USERNAME,
  EMAIL,
  FULL_NAME,
  COUNTRY,
  LANGUAGE,
  GPP_ID
} from '../constants/storage';

export const clearStorage = () => {
  cookie.remove(ID_TOKEN);
  cookie.remove(REFRESH_TOKEN);
  cookie.remove(ACCESS_TOKEN);
  cookie.remove(USERNAME);
  cookie.remove(EMAIL);
  cookie.remove(FULL_NAME);
  cookie.remove(COUNTRY);
  cookie.remove(LANGUAGE);
  cookie.remove(GPP_ID);
  localStorage.clear();
};
