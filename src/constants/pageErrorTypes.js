import IconError400 from '../assets/images/img_400.svg';
import IconError403 from '../assets/images/img_403.svg';
import IconError404 from '../assets/images/img_404.svg';
import IconError500 from '../assets/images/img_500.svg';
import IconError502 from '../assets/images/img_502.svg';
import IconError503 from '../assets/images/img_503.svg';

export const error400 = {
  errorIcon: IconError400,
  errorIconHeight: 140,
  errorIconWidth: 272,
  errorId: 'error_400',
  errorAltText: 'Error 400',
  errorTitle: '400: Pardon?',
  errorMessage: 'We didn\'t understand your request. <br>It was just bad overall.',
  errorButtonTitle: 'Try again'
};

export const error403 = {
  errorIcon: IconError403,
  errorIconHeight: 159,
  errorIconWidth: 274,
  errorId: 'error_403',
  errorAltText: 'Error 403',
  errorTitle: '403: Stay out',
  errorMessage: 'You don\'t have permission to view that page.',
  errorButtonTitle: 'Go to home page'
};

export const error404 = {
  errorIcon: IconError404,
  errorIconHeight: 122,
  errorIconWidth: 123,
  errorId: 'error_404',
  errorAltText: 'Error 404',
  errorTitle: '404: Page not found',
  errorMessage: 'The page went for a walk and never returned.<br>Turn back now while you still can.',
  errorButtonTitle: 'Go to home page'
};

export const error500 = {
  errorIcon: IconError500,
  errorIconHeight: 125,
  errorIconWidth: 444,
  errorId: 'error_500',
  errorAltText: 'Error 500',
  errorTitle: '500: Something went wrong',
  errorMessage: 'We\'re working hard to fix the problem, so try again later.',
  errorButtonTitle: 'Try again'
};

export const error502 = {
  errorIcon: IconError502,
  errorIconHeight: 140,
  errorIconWidth: 122,
  errorId: 'error_502',
  errorAltText: 'Error 502',
  errorTitle: '502: Bad gateway',
  errorMessage: 'Sorry, there is a server issue. Please come back later',
  errorButtonTitle: 'Try again'
};

export const error503 = {
  errorIcon: IconError503,
  errorIconHeight: 146,
  errorIconWidth: 128,
  errorId: 'error_503',
  errorAltText: 'Error 503',
  errorTitle: '503: We\'re being overrun',
  errorMessage: 'It seems we\'re too popular for our own good.<br>Try checking later.',
  errorButtonTitle: 'Try again'
};
