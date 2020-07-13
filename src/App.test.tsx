import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { setupRootStore } from './core/setup-mobx';
import { Provider } from './stores';
import { Router } from 'react-router';

const { rootStore, history } = setupRootStore();

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider value={rootStore}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  );
  const linkElement = getByText(/@Cycle/i);
  expect(linkElement).toBeInTheDocument();
});
