import { combineReducers } from 'redux';

import scroll from './common/scroll';
import auth from './common/auth';
import sidebar from './common/sidebar';
import user from './common/user';
import dialog from './common/dialog';
import privacypolicy from './appPrivacyPolicy';
import toast from './common/toast';
import gpp from './appGpp';
import settings from './appSettings';

const reducers = {
  common: combineReducers({
    scroll,
    auth,
    sidebar,
    toast,
    dialog,
    user
  }),
  privacypolicy,
  gpp,
  settings
};

export default reducers;
