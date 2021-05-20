import React, {/* lazy */ } from 'react';
import { Provider } from 'react-redux';

import ThemeRoot from './rootViews/ThemeRoot';
import AppRoot from './rootViews/AppRoot';

import store from '../reduxModules/configureStore';

const App = () => (
  <Provider store={store}>
    <ThemeRoot>
      <AppRoot />
    </ThemeRoot>
  </Provider>
);

export default App;
