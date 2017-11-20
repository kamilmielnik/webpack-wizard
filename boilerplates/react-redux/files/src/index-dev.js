import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from 'store';
import App from 'modules/app/components';
import './styles.scss';

const rootElement = document.getElementById('app');
const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    rootElement
  );
};

if (module.hot) {
  module.hot.accept('modules/app/components', () => {
    const NextApp = require('modules/app/components').default;
    render(NextApp);
  });
}

render(App);
