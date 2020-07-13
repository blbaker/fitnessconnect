import React from 'react';
import { render } from '@testing-library/react';
import { setupRootStore } from '../../core/setup-mobx';
import { Provider } from '../../stores';
import PublicLayout from './PublicLayout';
import { Router } from 'react-router';

const { rootStore, history } = setupRootStore();

describe(' PublicLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider value={rootStore}>
        <Router history={history}>
          <PublicLayout />
        </Router>
      </Provider>,
    );
    expect(baseElement).toBeTruthy();
  });
});
