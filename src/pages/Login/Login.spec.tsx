import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../core/i18n';
import Login from './Login';

describe(' Login', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <React.Suspense fallback={<></>}>
        <I18nextProvider i18n={i18n}>
          <Login />
        </I18nextProvider>
      </React.Suspense>,
    );
    expect(baseElement).toBeTruthy();
  });
});
