import React from 'react';
import { render } from '@testing-library/react';
import { setupRootStore } from '../../core/setup-mobx';
import { Provider } from '../../stores';
import PrivateLayout from './PrivateLayout';
import { Router } from 'react-router';

const { rootStore, history } = setupRootStore();

describe(' SignedInRoot', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider value={rootStore}>
        <Router history={history}>
          <PrivateLayout />
        </Router>
      </Provider>,
    );
    expect(baseElement).toBeTruthy();
  });
});
