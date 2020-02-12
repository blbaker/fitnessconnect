import React from 'react';
import { render } from '@testing-library/react';

import i18n from '../../core/i18n';
import Classes from './Classes';
import { I18nextProvider } from 'react-i18next';

jest.mock('../../core/stores/RootStore');

describe(' Classes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <React.Suspense fallback={<></>}>
        <I18nextProvider i18n={i18n}>
          <Classes />
        </I18nextProvider>
      </React.Suspense>,
    );
    expect(baseElement).toBeTruthy();
  });
});
