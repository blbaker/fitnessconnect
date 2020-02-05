import React from 'react';
import { render } from '@testing-library/react';

import Root from './Root';

describe(' Root', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Root />);
    expect(baseElement).toBeTruthy();
  });
});
