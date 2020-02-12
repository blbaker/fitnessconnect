import React from 'react';
import { render } from '@testing-library/react';
import { setupRootStore } from '../../core/setup-mobx';
import { Provider } from '../../core/stores';
import Root from './Root';
import { Router } from 'react-router';

const { rootStore, history } = setupRootStore();

describe(' Root', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider value={rootStore}>
        <Router history={history}>
          <Root />
        </Router>
      </Provider>,
    );
    expect(baseElement).toBeTruthy();
  });
});
