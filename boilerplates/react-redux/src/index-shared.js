import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import configureStore from 'store/configure';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from 'modules/app';

export default (Wrapper) => {
  const history = createHistory();
  const store = configureStore(history);
  const rootElement = document.getElementById('app');

  const render = (Component) => {
    const rendered = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    );
    const wrapped = Wrapper ? <Wrapper>{rendered}</Wrapper> : rendered;
    ReactDOM.render(wrapped, rootElement);
  };

  if (module.hot) {
    module.hot.accept('modules/app', () => {
      const NextApp = require('modules/app').default;
      render(NextApp);
    });
  }

  render(App);
};
