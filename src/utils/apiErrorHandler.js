import { clearStorage } from './storage';

export const errorHandler = async e => {
  /** No need to check in home page and no need to redirect to error page */
  if (e.response) {
    if (e.response.status === 401) {
      clearStorage();
      window.location.replace('');
    } else if (e.response.status === 400) {
      if (e.response.data && e.response.data.status.responseCode === 'CMSBE_11000') {
        return;
      }
      window.location.href = '#/error400';
    } else if (e.response.status === 403) {
      window.location.href = '#/error403';
    } else if (e.response.status === 404) {
      window.location.href = '#/error404';
    } else if (e.response.status === 500) {
      window.location.href = '#/error500';
    } else if (e.response.status === 502) {
      window.location.href = '#/error502';
    } else if (e.response.status === 503) {
      window.location.href = '#/error503';
    }
  }
};
